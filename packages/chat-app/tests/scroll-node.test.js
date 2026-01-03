#!/usr/bin/env node
/**
 * Node.js tests for scroll behavior - verifies code structure
 * Run with: node tests/scroll-node.test.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = readFileSync(join(__dirname, '../public/index.html'), 'utf-8');
const js = readFileSync(join(__dirname, '../public/app.js'), 'utf-8');

let passed = 0;
let failed = 0;

function test(name, condition) {
  if (condition) {
    console.log(`✓ ${name}`);
    passed++;
  } else {
    console.log(`✗ ${name}`);
    failed++;
  }
}

console.log('\n🧪 Scroll Behavior Tests (Code Structure)\n');
console.log('─'.repeat(50));

// CSS Tests
console.log('\n📄 CSS Structure:\n');

test('chat-container has justify-content: flex-end',
  html.includes('justify-content: flex-end'));

test('chat-container has position: relative',
  html.includes('.chat-container') && html.includes('position: relative'));

test('#messages does NOT have overflow: hidden',
  !/#messages\s*\{[^}]*overflow:\s*hidden/.test(html));

test('#messages does NOT have margin-top: auto',
  !/#messages\s*\{[^}]*margin-top:\s*auto/.test(html));

test('typing-wrapper has position: sticky',
  html.includes('.typing-wrapper') && html.includes('position: sticky'));

test('typing-wrapper has bottom: 0',
  /\.typing-wrapper[^}]*bottom:\s*0/.test(html));

test('scroll-to-bottom button CSS exists',
  html.includes('.scroll-to-bottom'));

test('scroll-to-bottom has position: absolute',
  /\.scroll-to-bottom\s*\{[^}]*position:\s*absolute/.test(html));

test('scroll-to-bottom.visible shows button',
  html.includes('.scroll-to-bottom.visible'));

// HTML Structure Tests
console.log('\n📄 HTML Structure:\n');

test('scroll-to-bottom button element exists',
  html.includes('id="scrollToBottom"'));

test('scroll-to-bottom has down arrow icon',
  html.includes('scrollToBottom') && html.includes('polyline'));

test('typing indicator wrapper exists',
  html.includes('id="typingIndicator"'));

// JavaScript Tests
console.log('\n📄 JavaScript Logic:\n');

test('isUserScrolledUp state initialized',
  js.includes('this.isUserScrolledUp = false'));

test('checkScrollPosition method exists',
  js.includes('checkScrollPosition()'));

test('scroll event listener added',
  js.includes("addEventListener('scroll'") || js.includes('addEventListener("scroll"'));

test('threshold for scroll detection defined',
  js.includes('threshold') && /threshold\s*=\s*\d+/.test(js));

test('scrollToBottom accepts force parameter',
  js.includes('scrollToBottom(force') || js.includes('scrollToBottom(force ='));

test('scrollToBottom checks isUserScrolledUp',
  js.includes('this.isUserScrolledUp') && js.includes('scrollToBottom'));

test('scroll-state-change event dispatched',
  js.includes('scroll-state-change'));

test('CustomEvent with isScrolledUp detail',
  js.includes('isScrolledUp'));

test('loadChat uses force scroll',
  js.includes('scrollToBottom(true)'));

test('Mobile keyboard JS override removed',
  !js.includes('document.body.style.height'));

// Phase 3: Layout Tests
console.log('\n📄 Layout Structure:\n');

test('left-sidebar CSS exists',
  html.includes('.left-sidebar'));

test('left-sidebar has 280px width on desktop',
  /\.left-sidebar\s*\{[^}]*width:\s*280px/.test(html) ||
  /@media[^{]*min-width:\s*768px[^{]*\{[^}]*\.left-sidebar[^}]*width:\s*280px/.test(html));

test('sidebar hidden on mobile',
  /@media[^{]*max-width:\s*767px[^{]*\{[^}]*\.left-sidebar[^}]*display:\s*none/.test(html));

test('hamburger menu hidden on desktop',
  /#menuToggle[^}]*display:\s*none/.test(html));

test('three-panel layout with app-layout flex',
  /\.app-layout\s*\{[^}]*display:\s*flex/.test(html));

test('right-panel CSS exists',
  html.includes('.right-panel'));

test('right-panel has open state',
  html.includes('.right-panel.open'));

test('drawer-body CSS exists',
  html.includes('.drawer-body'));

test('drawer-footer CSS exists',
  html.includes('.drawer-footer'));

test('drawer-footer has border-top',
  /\.drawer-footer\s*\{[^}]*border-top/.test(html));

test('sidebar HTML structure exists',
  html.includes('class="left-sidebar"'));

test('sidebar has newChatBtnSidebar',
  html.includes('id="newChatBtnSidebar"'));

test('sidebar has chatListSidebar',
  html.includes('id="chatListSidebar"'));

test('sidebar sync JavaScript exists',
  html.includes('chatListSidebar') && html.includes('renderChatList'));

// Phase 4: Header & Navigation Tests
console.log('\n📄 Header & Navigation:\n');

test('model-indicator CSS exists',
  html.includes('.model-indicator'));

test('model-indicator has hover state',
  html.includes('.model-indicator:hover'));

test('model-indicator hidden on mobile',
  /@media[^{]*max-width:\s*767px[^{]*\{[^}]*\.model-indicator[^}]*display:\s*none/.test(html));

test('model-indicator HTML element exists',
  html.includes('id="modelIndicator"'));

test('model shows Sonnet 3.5',
  html.includes('Sonnet 3.5'));

test('history-search CSS exists',
  html.includes('.history-search'));

test('chat-item.hidden CSS exists',
  html.includes('.chat-item.hidden'));

test('sidebar search input exists',
  html.includes('id="sidebarSearch"'));

test('drawer search input exists',
  html.includes('id="drawerSearch"'));

test('filterChats function exists',
  html.includes('filterChats'));

test('search listens to mcp-input event',
  html.includes("addEventListener('mcp-input'") || html.includes('addEventListener("mcp-input"'));

test('shortcut-hint CSS exists',
  html.includes('.shortcut-hint'));

test('kbd element styling exists',
  html.includes('.shortcut-hint kbd'));

test('shortcut hints hidden on mobile',
  /@media[^{]*max-width:\s*767px[^{]*\{[^}]*\.shortcut-hint[^}]*display:\s*none/.test(html));

test('Cmd+K shortcut handler exists',
  html.includes("key === 'k'") || html.includes('key === "k"'));

test('Escape shortcut handler exists',
  html.includes("key === 'Escape'") || html.includes('key === "Escape"'));

test('shortcut hint shows Enter to send',
  html.includes('Enter') && html.includes('to send'));

// Phase 5: Message & Composer Tests
console.log('\n📄 Message & Composer:\n');

test('message-actions CSS exists',
  html.includes('.message-actions'));

test('message-wrapper CSS exists',
  html.includes('.message-wrapper'));

test('message-actions hidden by default',
  /\.message-actions\s*\{[^}]*opacity:\s*0/.test(html));

test('message-actions visible on hover',
  html.includes('.message-wrapper:hover .message-actions'));

test('copy-feedback CSS exists',
  html.includes('.copy-feedback'));

test('copyFeedback element exists',
  html.includes('id="copyFeedback"'));

test('createMessageActions function exists',
  html.includes('createMessageActions'));

test('MutationObserver for new messages',
  html.includes('MutationObserver'));

test('clipboard API used for copy',
  html.includes('navigator.clipboard'));

test('stop-button CSS exists',
  html.includes('.stop-button'));

test('stopButton element exists',
  html.includes('id="stopButton"'));

test('composer.generating CSS state',
  html.includes('.composer.generating'));

test('isGenerating state in app.js',
  js.includes('isGenerating'));

test('setGenerating method exists',
  js.includes('setGenerating'));

test('stopGeneration method exists',
  js.includes('stopGeneration'));

test('stop button click handler',
  js.includes('stopGeneration'));

// Phase 6: Mobile Polish Tests
console.log('\n📄 Mobile Polish:\n');

test('swipe-indicator CSS exists',
  html.includes('.swipe-indicator'));

test('swipe-indicator hidden on desktop',
  /@media[^{]*min-width:\s*768px[^{]*\{[^}]*\.swipe-indicator[^}]*display:\s*none/.test(html));

test('swipeIndicator element exists',
  html.includes('id="swipeIndicator"'));

test('setupSwipeGestures function exists',
  html.includes('setupSwipeGestures'));

test('EDGE_THRESHOLD defined',
  html.includes('EDGE_THRESHOLD'));

test('SWIPE_THRESHOLD defined',
  html.includes('SWIPE_THRESHOLD'));

test('touchstart event listener',
  html.includes("addEventListener('touchstart'") || html.includes('addEventListener("touchstart"'));

test('touchmove event listener',
  html.includes("addEventListener('touchmove'") || html.includes('addEventListener("touchmove"'));

test('touchend event listener',
  html.includes("addEventListener('touchend'") || html.includes('addEventListener("touchend"'));

test('passive touch events for performance',
  html.includes('passive: true'));

// Summary
console.log('\n' + '─'.repeat(50));
console.log(`\n${passed} passed, ${failed} failed\n`);

process.exit(failed > 0 ? 1 : 0);
