#!/usr/bin/env node

import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths - from dist/ folder
const MCP_SERVER_PATH = join(__dirname, "../../mcp-server/dist/index.js");
const PUBLIC_PATH = join(__dirname, "../public");
const BROWSER_BUNDLE_PATH = join(__dirname, "../../../dist-browser");  // mcp-components browser bundle
const STYLES_PATH = join(__dirname, "../../../src/styles"); // mcp-components/src/styles

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Create Express app
const app = express();
const server = createServer(app);

// Debug: log paths on startup
console.log("Serving paths:");
console.log("  Public:", PUBLIC_PATH);
console.log("  Bundle:", BROWSER_BUNDLE_PATH);
console.log("  Styles:", STYLES_PATH);

// Serve static files
app.use(express.static(PUBLIC_PATH));
app.use("/bundle", express.static(BROWSER_BUNDLE_PATH));  // Browser-ready bundle
app.use("/styles", express.static(STYLES_PATH));

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Store conversation history per connection
interface Message {
  role: "user" | "assistant";
  content: string;
}

const conversationHistories = new WeakMap<WebSocket, Message[]>();

// Store session IDs per connection (for conversation resumption)
const sessionIds = new WeakMap<WebSocket, string | null>();

// Store pending tool approvals per connection
interface PendingApproval {
  resolve: (approved: boolean) => void;
  toolName: string;
}
const pendingApprovals = new WeakMap<WebSocket, Map<string, PendingApproval>>();

// Handle WebSocket connections
wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  // Initialize conversation history, session ID, and pending approvals for this connection
  conversationHistories.set(ws, []);
  sessionIds.set(ws, null);
  pendingApprovals.set(ws, new Map());

  ws.on("message", async (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type === "message") {
        await handleChatMessage(ws, message.content, message.sessionId);
      } else if (message.type === "clear") {
        // Clear conversation history and session
        conversationHistories.set(ws, []);
        sessionIds.set(ws, null);
        sendMessage(ws, { type: "cleared" });
      } else if (message.type === "tool_approval_response") {
        // Handle tool approval response from client
        const approvals = pendingApprovals.get(ws);
        const pending = approvals?.get(message.id);
        if (pending) {
          pending.resolve(message.approved);
          approvals?.delete(message.id);
        }
      } else if (message.type === "restore_history") {
        // Restore conversation history from client
        const history = conversationHistories.get(ws) || [];
        history.length = 0;
        for (const msg of message.messages) {
          history.push({ role: msg.role, content: msg.content });
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
      sendMessage(ws, {
        type: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    conversationHistories.delete(ws);
  });
});

function sendMessage(ws: WebSocket, data: object) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

async function handleChatMessage(ws: WebSocket, content: string, resumeSessionId?: string) {
  const history = conversationHistories.get(ws) || [];

  // Use provided session ID or existing one for this connection
  const currentSessionId = resumeSessionId || sessionIds.get(ws);

  // Add user message to history
  history.push({ role: "user", content });

  // Signal start of response
  sendMessage(ws, { type: "start" });

  let assistantResponse = "";

  try {
    // Track tool calls and their start times
    const toolStartTimes = new Map<string, number>();
    const pendingTools = new Map<string, { name: string; input: unknown }>();

    // If resuming a session, just use the current message (SDK handles history)
    // Otherwise, build prompt with conversation history for new sessions
    const prompt = currentSessionId
      ? content  // SDK has history when resuming
      : (history.length > 1
          ? "Previous conversation:\n" + history.slice(0, -1).map(m =>
              `${m.role === "user" ? "Human" : "Assistant"}: ${m.content}`
            ).join("\n\n") + "\n\nCurrent message: " + content
          : content);

    // Tool approval callback - asks user before running tools
    const canUseTool = async (toolName: string, input: unknown) => {
      const approvalId = `approval-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      // Send approval request to client
      sendMessage(ws, {
        type: "tool_approval_request",
        id: approvalId,
        name: toolName,
        input
      });

      // Wait for client response
      const approved = await new Promise<boolean>((resolve) => {
        const approvals = pendingApprovals.get(ws);
        if (approvals) {
          approvals.set(approvalId, { resolve, toolName });
        }
        // Timeout after 60 seconds - auto-deny
        setTimeout(() => {
          const pending = approvals?.get(approvalId);
          if (pending) {
            pending.resolve(false);
            approvals?.delete(approvalId);
          }
        }, 60000);
      });

      if (approved) {
        return { behavior: "allow" as const, updatedInput: input as Record<string, unknown> };
      } else {
        return { behavior: "deny" as const, message: "User denied permission" };
      }
    };

    // Build query options
    const queryOptions: Record<string, unknown> = {
      // Connect our MCP UI server
      mcpServers: {
        "mcp-ui": {
          type: "stdio",
          command: "node",
          args: [MCP_SERVER_PATH],
        },
      },
      // Allow the agent to use MCP tools
      allowedTools: [
        "mcp__mcp-ui__render_component",
      ],
      // Request user approval for tool usage
      canUseTool,
      // System prompt
      systemPrompt: `You are Claude, a helpful AI assistant with access to a UI component library. Use render_component to make responses more visual when appropriate.

## Available Tool
- render_component: Render a UI component (button, card, alert, badge, tag, avatar, etc.)

## Available Components
button, icon-button, input, textarea, select, checkbox, switch, badge, tag, avatar, card, alert, toast

## Card Slots
Cards have three slots: header, default (main content), footer.

## When to Use Components
- Cards for substantial content with headers
- Alerts for warnings, tips, or notices
- Badges/tags for labels or status
- Buttons for suggested actions

## When to Use Plain Text
- Short responses
- Follow-up questions
- Simple confirmations`,
    };

    // Add resume option if we have a session ID
    if (currentSessionId) {
      queryOptions.resume = currentSessionId;
    }

    for await (const message of query({
      prompt,
      options: queryOptions as any,
    })) {
      // Capture session_id from system init message
      if (message.type === "system" && (message as any).subtype === "init") {
        const newSessionId = (message as any).session_id;
        if (newSessionId) {
          sessionIds.set(ws, newSessionId);
          // Send session_id to client so it can be stored with the chat
          sendMessage(ws, { type: "session_id", sessionId: newSessionId });
        }
      }

      // Handle different message types
      if (message.type === "assistant") {
        if (message.message?.content) {
          for (const block of message.message.content) {
            // Check block type - can be text, tool_use, or tool_result
            const blockAny = block as Record<string, unknown>;

            if (blockAny.type === "text" && typeof blockAny.text === "string") {
              // Text content from assistant
              assistantResponse += blockAny.text;
              sendMessage(ws, { type: "text", content: blockAny.text });

            } else if (blockAny.type === "tool_use" || ("name" in blockAny && "input" in blockAny)) {
              // Tool use block - assistant wants to call a tool
              const id = blockAny.id as string;
              const name = blockAny.name as string;
              const input = blockAny.input;

              toolStartTimes.set(id, Date.now());
              pendingTools.set(id, { name, input });
              sendMessage(ws, {
                type: "tool_start",
                name,
                id,
                input
              });
            }
          }
        }
      } else if (message.type === "user") {
        // User messages in SDK can contain tool_result blocks
        const userMsg = message as { type: "user"; message?: { content?: unknown[] } };
        if (userMsg.message?.content && Array.isArray(userMsg.message.content)) {
          for (const block of userMsg.message.content) {
            const blockAny = block as Record<string, unknown>;

            if (blockAny.type === "tool_result") {
              // Tool result block - contains the output from MCP server
              const toolUseId = blockAny.tool_use_id as string;
              const content = blockAny.content as Array<{ type: string; text?: string }>;

              // Extract the text output from the tool result
              let output: string | unknown = content;
              if (Array.isArray(content)) {
                const textContent = content.find(c => c.type === "text");
                if (textContent?.text) {
                  output = textContent.text;
                }
              }

              const startTime = toolStartTimes.get(toolUseId) || Date.now();
              const duration = Date.now() - startTime;

              sendMessage(ws, {
                type: "tool_end",
                id: toolUseId,
                name: pendingTools.get(toolUseId)?.name || "unknown",
                output,
                duration
              });

              pendingTools.delete(toolUseId);
            }
          }
        }
      } else if (message.type === "result") {
        // Query complete
        if (message.subtype.startsWith("error")) {
          sendMessage(ws, { type: "error", message: message.subtype });
        }
      }
    }

    // Add assistant response to history
    if (assistantResponse) {
      history.push({ role: "assistant", content: assistantResponse });
    }

  } catch (error) {
    console.error("Chat error:", error);
    sendMessage(ws, {
      type: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }

  // Signal end of response
  sendMessage(ws, { type: "done" });
}

// Start server
server.listen(PORT, () => {
  console.log(`\n🚀 MCP Chat App running at http://localhost:${PORT}`);
  console.log(`   WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`\n   Press Ctrl+C to stop\n`);
});
