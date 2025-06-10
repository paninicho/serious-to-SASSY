let initialStyle = 'sassy';

// URL 파라미터로 초기 스타일 세팅
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const style = urlParams.get('style');
  if (style) {
    initialStyle = style;
  }
});

function genZfy() {
  translateAndOfferChoices(initialStyle);
  document.getElementById('alt-style').style.display = 'block';
}

function showStyleOptions() {
  document.getElementById('style-buttons').style.display = 'flex';
}

// 캐릭터별 피드백 메시지
const feedbackMessages = {
  emo: "Your feedback... it means everything in this cold world 🖤",
  hiphop: "Ayy thanks for droppin' that feedback fam 🔥",
  flirty: "Wow... thank you for the feedback. I know you a bit better now ;)",
  sarcastic: "Oh wow, feedback? That's totally what I live for 😏",
  sassy: "Yasss queen 💅 thanks for your precious feedback. I'm feelin' fabulous!"
};

// 캐릭터별 복사 메시지
const copyMessages = {
  emo: "Copied... into the void of my soul 🖤",
  hiphop: "Boom! It's in your clipboard now, homie 🔥",
  flirty: "Copied, just for you, cutie 💖",
  sarcastic: "Copied. As if you couldn’t do it yourself 🙄",
  sassy: "Copied, honey 💅 Go slay!"
};

async function translateAndOfferChoices(selectedStyle) {
  const originalText = document.getElementById('text-input').value.trim();
  if (!originalText) {
    alert("텍스트를 입력해주세요.");
    return;
  }

  showLoading(true);

  const [resA, resB] = await Promise.all([
    fetchStyle(originalText, selectedStyle),
    fetchStyle(originalText, selectedStyle)
  ]);

  // HTML 안전 escape (백틱 문제 해결)
  const escapeHTML = (unsafe) =>
    unsafe.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

  document.getElementById('output').innerHTML = `
    <div class="option-block">
      <h5>🅰️ (${selectedStyle})</h5>
      <p>${escapeHTML(resA)}</p>
      <button onclick="copyToClipboard(\`${escapeHTML(resA)}\`, '${selectedStyle}')">Copy</button>
      <button onclick="sendFeedback(\`${escapeHTML(resA)}\`, '${selectedStyle}')">I like this one better</button>
    </div>

    <div class="option-block">
      <h5>🅱️ (${selectedStyle})</h5>
      <p>${escapeHTML(resB)}</p>
      <button onclick="copyToClipboard(\`${escapeHTML(resB)}\`, '${selectedStyle}')">Copy</button>
      <button onclick="sendFeedback(\`${escapeHTML(resB)}\`, '${selectedStyle}')">I like this one better</button>
    </div>
  `;

  showLoading(false);
}

async function fetchStyle(text, style) {
  const res = await fetch('http://localhost:3000/style', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, style })
  });
  const data = await res.json();
  return data.output;
}

function copyToClipboard(text, style) {
  navigator.clipboard.writeText(text)
    .then(() => alert(copyMessages[style] || "Copied!"));
}

async function sendFeedback(chosenOutput, chosenStyle) {
  const originalText = document.getElementById('text-input').value.trim();

  await fetch('http://localhost:3000/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      originalText,
      chosenStyle,
      chosenOutput,
      alternativeOutput: null
    })
  });

  alert(feedbackMessages[chosenStyle] || "Feedback saved!");
}

function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function playBGM() {
  const bgm = document.getElementById('bgm');
  if (bgm) bgm.play();
}

function genZfy() {
  playBGM(); // ✅ 음악 시작
  translateAndOfferChoices(initialStyle);
  document.getElementById('alt-style').style.display = 'block';
}
