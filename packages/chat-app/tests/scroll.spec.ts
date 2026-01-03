import { test, expect, Page } from '@playwright/test';

// Helper to add a message directly to the DOM (bypassing WebSocket)
async function addUserMessage(page: Page, text: string) {
  await page.evaluate((content) => {
    const messages = document.getElementById('messages');
    const message = document.createElement('mcp-message');
    message.setAttribute('align', 'end');
    message.setAttribute('variant', 'bubble');
    message.textContent = content;
    messages?.appendChild(message);

    // Hide welcome screen
    const welcome = document.getElementById('welcomeScreen');
    if (welcome) welcome.style.display = 'none';
  }, text);
}

async function addAssistantMessage(page: Page, text: string) {
  await page.evaluate((content) => {
    const messages = document.getElementById('messages');
    const message = document.createElement('mcp-message');
    message.setAttribute('align', 'start');
    message.setAttribute('variant', 'ghost');
    message.textContent = content;
    messages?.appendChild(message);
  }, text);
}

// Helper to add many messages to create scrollable content
async function addManyMessages(page: Page, count: number) {
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      await addUserMessage(page, `User message ${i + 1}: ${'Lorem ipsum '.repeat(5)}`);
    } else {
      await addAssistantMessage(page, `Assistant response ${i + 1}: ${'Dolor sit amet '.repeat(10)}`);
    }
  }
}

async function getScrollState(page: Page) {
  return page.evaluate(() => {
    const container = document.getElementById('chatContainer');
    const app = (window as any).chatApp;
    return {
      scrollTop: container?.scrollTop ?? 0,
      scrollHeight: container?.scrollHeight ?? 0,
      clientHeight: container?.clientHeight ?? 0,
      isUserScrolledUp: app?.isUserScrolledUp ?? false,
      isAtBottom: (container?.scrollHeight ?? 0) - (container?.scrollTop ?? 0) - (container?.clientHeight ?? 0) < 100,
    };
  });
}

async function scrollToTop(page: Page) {
  await page.evaluate(() => {
    const container = document.getElementById('chatContainer');
    if (container) container.scrollTop = 0;
  });
  // Wait for scroll event to process
  await page.waitForTimeout(100);
}

async function scrollToBottom(page: Page) {
  await page.evaluate(() => {
    const container = document.getElementById('chatContainer');
    if (container) container.scrollTop = container.scrollHeight;
  });
  await page.waitForTimeout(100);
}

test.describe('Chat Scroll Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app to initialize
    await page.waitForFunction(() => (window as any).chatApp !== undefined);
  });

  test('scroll-to-bottom button is hidden initially', async ({ page }) => {
    const scrollBtn = page.locator('#scrollToBottom');
    await expect(scrollBtn).not.toHaveClass(/visible/);
  });

  test('scroll-to-bottom button appears when scrolled up', async ({ page }) => {
    // Add enough messages to make content scrollable
    await addManyMessages(page, 20);

    // Trigger scroll to bottom first (like app does)
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    // Scroll to top
    await scrollToTop(page);

    // Button should now be visible
    const scrollBtn = page.locator('#scrollToBottom');
    await expect(scrollBtn).toHaveClass(/visible/);
  });

  test('clicking scroll-to-bottom button scrolls to bottom and hides button', async ({ page }) => {
    await addManyMessages(page, 20);
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    // Scroll up to show button
    await scrollToTop(page);

    const scrollBtn = page.locator('#scrollToBottom');
    await expect(scrollBtn).toHaveClass(/visible/);

    // Click the button
    await scrollBtn.click();
    await page.waitForTimeout(200);

    // Should be at bottom now
    const state = await getScrollState(page);
    expect(state.isAtBottom).toBe(true);

    // Button should be hidden
    await expect(scrollBtn).not.toHaveClass(/visible/);
  });

  test('isUserScrolledUp is false when at bottom', async ({ page }) => {
    await addManyMessages(page, 20);
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    const state = await getScrollState(page);
    expect(state.isUserScrolledUp).toBe(false);
  });

  test('isUserScrolledUp is true when scrolled up', async ({ page }) => {
    await addManyMessages(page, 20);
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    // Scroll to top
    await scrollToTop(page);

    const state = await getScrollState(page);
    expect(state.isUserScrolledUp).toBe(true);
  });

  test('auto-scroll is disabled when user is scrolled up', async ({ page }) => {
    await addManyMessages(page, 20);
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    // Scroll to top
    await scrollToTop(page);
    const initialScroll = await page.evaluate(() =>
      document.getElementById('chatContainer')?.scrollTop ?? 0
    );

    // Add a new message (which would normally trigger scrollToBottom)
    await addAssistantMessage(page, 'New message that should not cause scroll');
    await page.evaluate(() => (window as any).chatApp.scrollToBottom());
    await page.waitForTimeout(100);

    // Should still be at top (not auto-scrolled)
    const afterScroll = await page.evaluate(() =>
      document.getElementById('chatContainer')?.scrollTop ?? 0
    );

    expect(afterScroll).toBe(initialScroll);
  });

  test('force scroll works even when user is scrolled up', async ({ page }) => {
    await addManyMessages(page, 20);
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    // Scroll to top
    await scrollToTop(page);

    // Force scroll
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    const state = await getScrollState(page);
    expect(state.isAtBottom).toBe(true);
    expect(state.isUserScrolledUp).toBe(false);
  });

  test('scroll-state-change event fires when scroll state changes', async ({ page }) => {
    await addManyMessages(page, 20);
    await page.evaluate(() => (window as any).chatApp.scrollToBottom(true));
    await page.waitForTimeout(100);

    // Set up event listener
    const eventFired = await page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        const container = document.getElementById('chatContainer');
        container?.addEventListener('scroll-state-change', (e: any) => {
          resolve(e.detail.isScrolledUp);
        }, { once: true });

        // Scroll to top to trigger the event
        if (container) container.scrollTop = 0;
      });
    });

    expect(eventFired).toBe(true);
  });

  test('messages container does not clip overflow', async ({ page }) => {
    // Add a very long message
    await page.evaluate(() => {
      const messages = document.getElementById('messages');
      const message = document.createElement('mcp-message');
      message.setAttribute('align', 'start');
      message.setAttribute('variant', 'ghost');
      message.textContent = 'A'.repeat(5000); // Very long text
      messages?.appendChild(message);
    });

    // Check that overflow is not hidden
    const overflow = await page.evaluate(() => {
      const messages = document.getElementById('messages');
      return window.getComputedStyle(messages!).overflow;
    });

    expect(overflow).not.toBe('hidden');
  });

  test('chat container uses flex-end for alignment', async ({ page }) => {
    const justifyContent = await page.evaluate(() => {
      const container = document.getElementById('chatContainer');
      return window.getComputedStyle(container!).justifyContent;
    });

    expect(justifyContent).toBe('flex-end');
  });

  test('typing indicator has sticky positioning', async ({ page }) => {
    const position = await page.evaluate(() => {
      const typing = document.querySelector('.typing-wrapper');
      return window.getComputedStyle(typing!).position;
    });

    expect(position).toBe('sticky');
  });
});

test.describe('Mobile Viewport', () => {
  test.use({
    viewport: { width: 375, height: 667 }, // iPhone SE size
  });

  test('body height uses dvh units', async ({ page }) => {
    await page.goto('/');

    // Check that body doesn't have inline height style (JS override removed)
    const inlineHeight = await page.evaluate(() => {
      return document.body.style.height;
    });

    // Should be empty (no JS override) or match viewport
    expect(inlineHeight === '' || inlineHeight === '667px').toBe(true);
  });
});
