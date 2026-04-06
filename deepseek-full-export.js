// DeepSeek Full Conversation Exporter – “Big Window” Edition
(async function deepSeekBigWindow() {
  const status = document.createElement('div');
  status.textContent = '🔄 Loading ALL messages (big window mode)...';
  status.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1a1a1a;color:#00d8a0;padding:12px 20px;border-radius:8px;font-family:monospace;z-index:9999;font-size:14px;max-width:450px;';
  document.body.appendChild(status);

  const wait = ms => new Promise(r => setTimeout(r, ms));

  let lastHeight = document.body.scrollHeight;
  let stableCount = 0;
  let maxSteps = 500;        // 🔥 much larger
  let step = 0;

  for (step = 0; step < maxSteps; step++) {
    const target = Math.max(0, window.scrollY - 200);
    window.scrollTo({ top: target, behavior: 'smooth' });
    await wait(1200);        // longer wait for lazy load to trigger

    const newHeight = document.body.scrollHeight;
    const msgCount = document.querySelectorAll('.ds-message').length;

    if (newHeight > lastHeight) {
      status.textContent = `📥 Loaded more – total messages: ${msgCount}`;
      lastHeight = newHeight;
      stableCount = 0;
      await wait(1000);
    } else {
      stableCount++;
      status.textContent = `⏳ Stable (${stableCount}/6) – messages: ${msgCount}`;
      if (stableCount >= 6 && window.scrollY <= 10) break;
    }
  }

  // Final scroll to top + small delay to ensure everything rendered
  window.scrollTo({ top: 0, behavior: 'auto' });
  await wait(1000);

  // Also scroll bottom to top one more time to force any remaining lazy loads
  for (let i = 0; i < 5; i++) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
    await wait(200);
    window.scrollTo({ top: 0, behavior: 'auto' });
    await wait(300);
  }

  const messages = Array.from(document.querySelectorAll('.ds-message'))
    .map(el => (el.querySelector('.ds-markdown') || el).innerText.trim())
    .filter(t => t);

  if (!messages.length) {
    status.textContent = '❌ No messages found.';
    return;
  }

  let markdown = '# DeepSeek Conversation (Full – Big Window)\n\n';
  for (let i = 0; i < messages.length; i++) {
    const role = i % 2 === 0 ? 'User' : 'DeepSeek';
    const emoji = role === 'User' ? '👤' : '🤖';
    markdown += `## ${emoji} ${role}:\n\n${messages[i]}\n\n---\n\n`;
  }

  const filename = `deepseek_full_${Date.now()}.md`;
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(blob);

  status.textContent = `✅ Exported ${messages.length} messages!`;
  status.style.background = '#0a2a1f';
  setTimeout(() => status.remove(), 5000);
})();