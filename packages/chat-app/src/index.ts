#!/usr/bin/env node

import { query } from "@anthropic-ai/claude-agent-sdk";
import * as readline from "readline";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to our MCP UI server
const MCP_SERVER_PATH = join(__dirname, "../../mcp-server/dist/index.js");

// ANSI colors
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
};

function print(text: string, color = colors.reset) {
  console.log(`${color}${text}${colors.reset}`);
}

function printHeader() {
  console.clear();
  print("╔════════════════════════════════════════════╗", colors.cyan);
  print("║     MCP UI Chat - Claude Agent SDK Demo    ║", colors.cyan);
  print("╚════════════════════════════════════════════╝", colors.cyan);
  print("");
  print("This chat uses the MCP UI server to generate", colors.dim);
  print("UI components. Try asking to:", colors.dim);
  print("  • Generate a chat interface", colors.dim);
  print("  • Create a form with inputs", colors.dim);
  print("  • Build a notification system", colors.dim);
  print("  • Design a card layout", colors.dim);
  print("");
  print("Type 'exit' or 'quit' to end the session.", colors.dim);
  print("Type 'clear' to clear the screen.", colors.dim);
  print("─".repeat(46), colors.dim);
  print("");
}

async function chat(userMessage: string): Promise<void> {
  print(`\n${colors.bold}You:${colors.reset} ${userMessage}\n`);
  print(`${colors.magenta}${colors.bold}Claude:${colors.reset}`, colors.magenta);

  try {
    for await (const message of query({
      prompt: userMessage,
      options: {
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
          "mcp__mcp-ui__render_page",
          "mcp__mcp-ui__render_chat",
        ],
        // System prompt to guide the agent
        systemPrompt: `You are a UI designer assistant that helps users create interfaces using the MCP UI component library.

You have access to tools from the mcp-ui server:
- render_component: Generate a single UI component
- render_page: Generate a complete HTML page
- render_chat: Generate a chat interface

When users ask to create UI, use these tools to generate the HTML.
Always explain what you're creating and provide the generated code.

Available components: button, icon-button, input, textarea, select, checkbox, switch, badge, tag, avatar, card, alert, toast, message, message-input, message-typing

Available themes: light, dark, anthropic, claude, claude-dark`,
      },
    })) {
      // Handle different message types
      if (message.type === "assistant" && message.message?.content) {
        for (const block of message.message.content) {
          if ("text" in block) {
            // Print assistant text
            process.stdout.write(block.text);
          } else if ("name" in block) {
            // Tool use - show what tool is being called
            print(`\n${colors.yellow}[Using tool: ${block.name}]${colors.reset}`, colors.yellow);
          }
        }
      } else if (message.type === "result") {
        // Query complete
        if (message.subtype.startsWith("error")) {
          print(`\n${colors.yellow}Error: ${message.subtype}${colors.reset}`, colors.yellow);
        }
      }
    }
    print("\n");
  } catch (error) {
    print(`\nError: ${error instanceof Error ? error.message : String(error)}`, colors.yellow);
  }
}

async function main() {
  printHeader();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = () => {
    rl.question(`${colors.green}> ${colors.reset}`, async (input) => {
      const trimmed = input.trim();

      if (!trimmed) {
        prompt();
        return;
      }

      if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "quit") {
        print("\nGoodbye! 👋", colors.cyan);
        rl.close();
        process.exit(0);
      }

      if (trimmed.toLowerCase() === "clear") {
        printHeader();
        prompt();
        return;
      }

      await chat(trimmed);
      prompt();
    });
  };

  prompt();
}

main().catch(console.error);
