function goTranslate(style) {
  window.location.href = `translate.html?style=${style}`;
}
async function translateWithStyle(selectedStyle) {
  const originalText = document.getElementById('text-input').value;

  try {
    const response = await fetch('http://localhost:3000/style', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: originalText, style: selectedStyle })
    });

    const data = await response.json();
    document.getElementById('output').innerText = data.output;

  } catch (error) {
    console.error("❌ 요청 실패:", error);
    document.getElementById('output').innerText = "오류가 발생했습니다.";
  }
}
