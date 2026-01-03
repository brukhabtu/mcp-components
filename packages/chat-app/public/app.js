// MCP Chat App - Client-side WebSocket and DOM rendering

class ChatApp {
  constructor() {
    // DOM elements
    this.chatContainer = document.getElementById('chatContainer');
    this.messages = document.getElementById('messages');
    this.welcomeScreen = document.getElementById('welcomeScreen');
    this.typingIndicator = document.getElementById('typingIndicator');
    this.messageInput = document.getElementById('messageInput');
    this.sendButton = document.getElementById('sendButton');
    this.newChatBtn = document.getElementById('newChatBtn');
    this.connectionBadge = document.getElementById('connectionBadge');
    this.rawSidebar = document.getElementById('rawSidebar');
    this.closeRaw = document.getElementById('closeRaw');
    this.rawMessages = document.getElementById('rawMessages');

    // Drawer and toggle elements
    this.mainDrawer = document.getElementById('mainDrawer');
    this.menuToggle = document.getElementById('menuToggle');
    this.detailsToggle = document.getElementById('detailsToggle');
    this.themeToggle = document.getElementById('themeToggle');
    this.rawToggle = document.getElementById('rawToggle');
    this.stopButton = document.getElementById('stopButton');

    // State
    this.ws = null;
    this.isConnected = false;
    this.isGenerating = false;
    this.currentAssistantMessage = null;
    this.currentToolCalls = new Map();
    this.isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    this.alwaysAllowedTools = new Set(JSON.parse(localStorage.getItem('alwaysAllowedTools') || '[]'));

    // Chat persistence
    this.currentChatId = null;
    this.currentSessionId = null;
    this.chatHistory = [];
    this.currentAssistantText = '';
    this.currentRenderedComponents = [];
    this.allChats = JSON.parse(localStorage.getItem('chatHistory') || '[]');

    // Scroll state
    this.isUserScrolledUp = false;

    // Bind methods
    this.connect = this.connect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Initialize
    this.init();
  }

  init() {
    // Menu toggle
    this.menuToggle.addEventListener('click', () => this.mainDrawer.toggle());

    // New chat button
    this.newChatBtn.addEventListener('click', () => {
      this.clearChat();
      this.mainDrawer.hide();
    });

    // Option toggles
    this.detailsToggle.addEventListener('mcp-change', (e) => this.toggleDetails(e.detail.checked));
    this.themeToggle.addEventListener('mcp-change', (e) => this.toggleTheme(e.detail.checked));
    this.rawToggle.addEventListener('mcp-change', (e) => this.toggleRaw(e.detail.checked));

    // Raw sidebar close
    this.closeRaw.addEventListener('click', () => {
      this.rawToggle.checked = false;
      this.toggleRaw(false);
    });

    // Scroll detection for smart auto-scroll
    this.chatContainer.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });

    // Message input events
    this.messageInput.addEventListener('mcp-submit', this.handleSubmit);
    this.messageInput.addEventListener('mcp-input', (e) => this.updateSendButton(e.detail.value));

    // Send button click
    this.sendButton.addEventListener('click', () => this.messageInput.submit());

    // Stop button
    this.stopButton?.addEventListener('click', () => this.stopGeneration());

    // Connect to WebSocket
    this.connect();

    // Render chat history
    this.renderChatList();

    // Restore toggle states
    const showDetails = localStorage.getItem('showDetails') === 'true';
    this.detailsToggle.checked = showDetails;
    document.body.classList.toggle('show-details', showDetails);

    // Apply saved theme
    if (this.isDarkTheme) {
      this.themeToggle.checked = true;
      document.body.setAttribute('data-theme', 'dark');
    }
  }

  connect() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.isConnected = true;
      this.updateConnectionStatus(true);
      this.updateSendButton(this.messageInput.value);
      console.log('Connected to server');
    };

    this.ws.onclose = () => {
      this.isConnected = false;
      this.updateConnectionStatus(false);
      this.updateSendButton('');
      console.log('Disconnected from server');

      // Reconnect after 3 seconds
      setTimeout(this.connect, 3000);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleServerMessage(message);
        this.addRawMessage('server', message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
  }

  updateConnectionStatus(connected) {
    this.connectionBadge.variant = connected ? 'success' : 'error';
    this.connectionBadge.textContent = connected ? 'Connected' : 'Disconnected';
  }

  updateSendButton(value) {
    const hasText = value && value.trim().length > 0;
    this.sendButton.disabled = !hasText || !this.isConnected;
  }

  handleSubmit(e) {
    const content = e.detail.value;
    if (!content || !this.isConnected) return;

    // Start new chat if needed
    if (!this.currentChatId) {
      this.currentChatId = 'chat-' + Date.now();
      this.chatHistory = [];
    }

    // Hide welcome screen
    this.welcomeScreen.style.display = 'none';

    // Add user message to DOM and history
    this.appendUserMessage(content);
    this.chatHistory.push({ role: 'user', content });

    // Add to raw sidebar
    this.addRawMessage('user', { type: 'message', content });

    // Clear input
    this.messageInput.clear();
    this.updateSendButton('');

    // Show typing indicator
    this.showTypingIndicator();

    // Send to server (include sessionId if resuming a conversation)
    const payload = {
      type: 'message',
      content: content
    };
    if (this.currentSessionId) {
      payload.sessionId = this.currentSessionId;
    }
    this.ws.send(JSON.stringify(payload));
  }

  handleServerMessage(message) {
    switch (message.type) {
      case 'start':
        this.currentAssistantMessage = this.createAssistantMessageContainer();
        this.currentAssistantText = '';
        this.currentRenderedComponents = [];
        this.setGenerating(true);
        this.showTypingIndicator();
        break;

      case 'text':
        if (this.currentAssistantMessage) {
          this.appendTextToAssistant(message.content);
          this.currentAssistantText += message.content;
        }
        break;

      case 'tool_start':
        this.showToolCall(message.id, message.name, message.input, 'running');
        break;

      case 'tool_end':
        this.updateToolCall(message.id, message.name, message.output, message.duration);
        break;

      case 'done':
        this.setGenerating(false);
        this.hideTypingIndicator();
        this.currentAssistantMessage = null;
        this.scrollToBottom();

        if (this.currentAssistantText || this.currentRenderedComponents.length > 0) {
          this.chatHistory.push({
            role: 'assistant',
            content: this.currentAssistantText,
            components: this.currentRenderedComponents
          });
          this.saveCurrentChat();
        }
        this.currentAssistantText = '';
        this.currentRenderedComponents = [];
        break;

      case 'error':
        this.setGenerating(false);
        this.hideTypingIndicator();
        this.showError(message.message);
        this.currentAssistantMessage = null;
        this.currentAssistantText = '';
        break;

      case 'tool_approval_request':
        this.showToolApproval(message.id, message.name, message.input);
        break;

      case 'session_id':
        this.currentSessionId = message.sessionId;
        break;
    }
  }

  showToolApproval(id, name, input) {
    // Auto-approve if tool is in always-allowed list
    if (this.alwaysAllowedTools.has(name)) {
      this.sendToolApproval(id, true);
      this.showToolCall(id, name, input, 'running');
      return;
    }

    // Create approval container
    if (!this.currentAssistantMessage) {
      this.currentAssistantMessage = this.createAssistantMessageContainer();
    }

    const card = document.createElement('mcp-card');
    card.className = 'tool-approval';
    card.id = `approval-${id}`;

    // Header
    const header = document.createElement('div');
    header.slot = 'header';
    header.innerHTML = `<mcp-badge variant="warning">Tool Request</mcp-badge> ${this.escapeHtml(name)}`;
    card.appendChild(header);

    // Body - code display
    const code = document.createElement('mcp-code');
    code.language = 'json';
    code.code = JSON.stringify(input, null, 2);
    code.copyable = false;
    card.appendChild(code);

    // Footer - checkbox and buttons
    const footer = document.createElement('div');
    footer.slot = 'footer';
    footer.style.cssText = 'display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--mcp-space-2);';
    footer.innerHTML = `
      <mcp-checkbox id="always-${id}" size="sm" label="Always allow"></mcp-checkbox>
      <div style="display: flex; gap: var(--mcp-space-2);">
        <mcp-button class="approve" variant="primary" size="sm">Allow</mcp-button>
        <mcp-button class="deny" variant="ghost" size="sm">Deny</mcp-button>
      </div>
    `;
    card.appendChild(footer);

    // Add event listeners
    card.querySelector('.approve').addEventListener('click', () => {
      const checkbox = card.querySelector(`#always-${id}`);
      if (checkbox.checked) {
        this.alwaysAllowedTools.add(name);
        localStorage.setItem('alwaysAllowedTools', JSON.stringify([...this.alwaysAllowedTools]));
      }
      this.sendToolApproval(id, true);
      this.updateApprovalUI(id, true);
    });
    card.querySelector('.deny').addEventListener('click', () => {
      this.sendToolApproval(id, false);
      this.updateApprovalUI(id, false);
    });

    this.currentAssistantMessage.appendChild(card);
    this.scrollToBottom();
  }

  sendToolApproval(id, approved) {
    this.ws.send(JSON.stringify({
      type: 'tool_approval_response',
      id: id,
      approved: approved
    }));
  }

  updateApprovalUI(id, approved) {
    const card = document.getElementById(`approval-${id}`);
    if (card) {
      // Update header badge
      const badge = card.querySelector('mcp-badge');
      if (badge) {
        badge.variant = approved ? 'success' : 'error';
        badge.textContent = approved ? 'Allowed' : 'Denied';
      }
      // Replace footer with status
      const footer = card.querySelector('[slot="footer"]');
      if (footer) {
        footer.innerHTML = `<mcp-badge variant="${approved ? 'success' : 'error'}">${approved ? '✓ Allowed' : '✕ Denied'}</mcp-badge>`;
      }
    }
  }

  appendUserMessage(content) {
    const message = document.createElement('mcp-message');
    message.align = 'end';
    message.variant = 'bubble';
    message.textContent = content;
    this.messages.appendChild(message);
    this.scrollToBottom();
  }

  createAssistantMessageContainer() {
    const message = document.createElement('mcp-message');
    message.align = 'start';
    message.variant = 'ghost';

    // Add Claude avatar
    const avatar = document.createElement('mcp-avatar');
    avatar.slot = 'avatar';
    avatar.name = 'Claude';
    avatar.size = 'sm';
    message.appendChild(avatar);

    // Create text container
    const textContainer = document.createElement('span');
    textContainer.className = 'assistant-text';
    message.appendChild(textContainer);

    this.messages.appendChild(message);
    return message;
  }

  appendTextToAssistant(text) {
    if (!this.currentAssistantMessage) return;

    let textContainer = this.currentAssistantMessage.querySelector('.assistant-text');
    if (!textContainer) {
      textContainer = document.createElement('span');
      textContainer.className = 'assistant-text';
      this.currentAssistantMessage.appendChild(textContainer);
    }

    const formattedText = this.formatText(text);
    textContainer.innerHTML += formattedText;
    this.scrollToBottom();
  }

  formatText(text) {
    let html = this.escapeHtml(text);

    // Code blocks
    html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  showToolCall(id, name, input, status) {
    if (!this.currentAssistantMessage) return;

    const toolDiv = document.createElement('div');
    toolDiv.className = 'tool-container';
    toolDiv.id = `tool-${id}`;
    toolDiv.innerHTML = `
      <mcp-tool-call
        name="${this.escapeHtml(name)}"
        status="${status}"
      ></mcp-tool-call>
    `;

    const toolCall = toolDiv.querySelector('mcp-tool-call');
    if (toolCall && input) {
      toolCall.input = input;
    }

    this.currentAssistantMessage.appendChild(toolDiv);
    this.currentToolCalls.set(id, toolDiv);
    this.scrollToBottom();
  }

  updateToolCall(id, name, output, duration) {
    const toolDiv = this.currentToolCalls.get(id);
    if (!toolDiv) return;

    const toolCall = toolDiv.querySelector('mcp-tool-call');
    if (toolCall) {
      toolCall.status = 'success';
      if (output) toolCall.output = output;
      if (duration) toolCall.duration = duration;
    }

    // Render component HTML directly in chat
    let htmlOutput = null;
    if (output && typeof output === 'string' && output.includes('<')) {
      htmlOutput = output;
    } else if (output && Array.isArray(output)) {
      for (const item of output) {
        if (item.type === 'text' && item.text && item.text.includes('<')) {
          htmlOutput = item.text;
          break;
        }
      }
    }

    if (htmlOutput) {
      this.renderComponentInChat(htmlOutput);
    }
  }

  renderComponentInChat(html, container = null) {
    const target = container || this.currentAssistantMessage;
    if (!target) return;

    const div = document.createElement('div');
    div.className = 'rendered-component';
    div.innerHTML = html;
    target.appendChild(div);

    // Track for persistence (only during live chat)
    if (!container) {
      this.currentRenderedComponents.push(html);
    }

    this.scrollToBottom();
  }

  showTypingIndicator() {
    this.typingIndicator.classList.add('visible');
    // Note: scrollToBottom() removed - sticky positioning keeps indicator visible
    // without causing scroll jumps when toggling visibility
  }

  hideTypingIndicator() {
    this.typingIndicator.classList.remove('visible');
  }

  setGenerating(generating) {
    this.isGenerating = generating;
    document.querySelector('.composer')?.classList.toggle('generating', generating);
    this.stopButton?.classList.toggle('visible', generating);
  }

  stopGeneration() {
    if (this.isConnected) {
      this.ws.send(JSON.stringify({ type: 'stop' }));
    }
    this.setGenerating(false);
    this.hideTypingIndicator();
  }

  showError(message) {
    const alert = document.createElement('mcp-alert');
    alert.variant = 'error';
    alert.title = 'Error';
    alert.textContent = message;
    this.messages.appendChild(alert);
    this.scrollToBottom();
  }

  checkScrollPosition() {
    const threshold = 100; // pixels from bottom
    const { scrollTop, scrollHeight, clientHeight } = this.chatContainer;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    const wasScrolledUp = this.isUserScrolledUp;
    this.isUserScrolledUp = distanceFromBottom > threshold;

    // Dispatch event when state changes (for the button to listen)
    if (wasScrolledUp !== this.isUserScrolledUp) {
      this.chatContainer.dispatchEvent(new CustomEvent('scroll-state-change', {
        detail: { isScrolledUp: this.isUserScrolledUp }
      }));
    }
  }

  scrollToBottom(force = false) {
    if (!force && this.isUserScrolledUp) return;

    requestAnimationFrame(() => {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
      this.isUserScrolledUp = false;
    });
  }

  toggleTheme(dark) {
    this.isDarkTheme = dark;
    document.body.setAttribute('data-theme', dark ? 'dark' : 'anthropic');
    localStorage.setItem('darkTheme', dark ? 'true' : 'false');
  }

  toggleRaw(show) {
    this.rawSidebar.classList.toggle('open', show);
  }

  toggleDetails(show) {
    document.body.classList.toggle('show-details', show);
    localStorage.setItem('showDetails', show ? 'true' : 'false');
  }

  clearChat() {
    this.messages.innerHTML = '';
    this.rawMessages.innerHTML = '';
    this.currentAssistantMessage = null;
    this.currentToolCalls.clear();
    this.currentChatId = null;
    this.currentSessionId = null;
    this.chatHistory = [];
    this.welcomeScreen.style.display = '';

    if (this.isConnected) {
      this.ws.send(JSON.stringify({ type: 'clear' }));
    }

    this.renderChatList();
  }

  saveCurrentChat() {
    if (!this.currentChatId || this.chatHistory.length === 0) return;

    const firstUserMsg = this.chatHistory.find(m => m.role === 'user');
    const title = firstUserMsg ? firstUserMsg.content.slice(0, 50) + (firstUserMsg.content.length > 50 ? '...' : '') : 'New Chat';

    const existingIndex = this.allChats.findIndex(c => c.id === this.currentChatId);
    const chatData = {
      id: this.currentChatId,
      title,
      timestamp: Date.now(),
      messages: this.chatHistory,
      sessionId: this.currentSessionId
    };

    if (existingIndex >= 0) {
      this.allChats[existingIndex] = chatData;
    } else {
      this.allChats.unshift(chatData);
    }

    this.allChats = this.allChats.slice(0, 50);
    localStorage.setItem('chatHistory', JSON.stringify(this.allChats));
    this.renderChatList();
  }

  loadChat(chatId) {
    const chat = this.allChats.find(c => c.id === chatId);
    if (!chat) return;

    this.messages.innerHTML = '';
    this.rawMessages.innerHTML = '';
    this.welcomeScreen.style.display = 'none';

    this.currentChatId = chat.id;
    this.currentSessionId = chat.sessionId || null;
    this.chatHistory = [...chat.messages];

    for (const msg of chat.messages) {
      if (msg.role === 'user') {
        this.appendUserMessage(msg.content);
      } else {
        const container = this.createAssistantMessageContainer();
        const textEl = container.querySelector('.assistant-text');
        if (textEl && msg.content) {
          textEl.innerHTML = this.formatText(msg.content);
        }
        // Restore rendered components
        if (msg.components && msg.components.length > 0) {
          for (const html of msg.components) {
            this.renderComponentInChat(html, container);
          }
        }
      }
    }

    this.scrollToBottom(true);
    this.mainDrawer.hide();
  }

  deleteChat(chatId) {
    this.allChats = this.allChats.filter(c => c.id !== chatId);
    localStorage.setItem('chatHistory', JSON.stringify(this.allChats));

    if (this.currentChatId === chatId) {
      this.clearChat();
    }

    this.renderChatList();
  }

  renderChatList() {
    const chatList = document.getElementById('chatList');
    if (!chatList) return;

    if (this.allChats.length === 0) {
      chatList.innerHTML = '<div class="no-chats">No chat history</div>';
      return;
    }

    chatList.innerHTML = this.allChats.map(chat => `
      <div class="chat-item ${chat.id === this.currentChatId ? 'active' : ''}" data-id="${chat.id}">
        <div class="chat-item-title">${this.escapeHtml(chat.title)}</div>
        <div class="chat-item-time">${this.formatTime(chat.timestamp)}</div>
        <button class="chat-item-delete" data-id="${chat.id}" title="Delete">×</button>
      </div>
    `).join('');

    chatList.querySelectorAll('.chat-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (!e.target.classList.contains('chat-item-delete')) {
          this.loadChat(el.dataset.id);
        }
      });
    });

    chatList.querySelectorAll('.chat-item-delete').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteChat(el.dataset.id);
      });
    });
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    return date.toLocaleDateString();
  }

  addRawMessage(type, data) {
    const div = document.createElement('div');
    div.className = `raw-message ${type}`;

    const typeLabel = document.createElement('div');
    typeLabel.className = 'raw-message-type';
    typeLabel.textContent = type;

    const content = document.createElement('pre');
    content.style.margin = '0';
    content.style.whiteSpace = 'pre-wrap';
    content.textContent = JSON.stringify(data, null, 2);

    div.appendChild(typeLabel);
    div.appendChild(content);
    this.rawMessages.appendChild(div);
    this.rawMessages.scrollTop = this.rawMessages.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.chatApp = new ChatApp();

  // Handle mobile keyboard - scroll to bottom when viewport changes
  // Note: CSS uses 100dvh which handles viewport height automatically
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      window.chatApp.scrollToBottom();
    });
  }
});
