require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 프론트엔드 경로 연결
app.use(express.static(path.join(__dirname, 'serious_to_sassy_navigate')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'serious_to_sassy_navigate/index.html'));
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const stylePrompts = {
  emo: "Do not answer or respond to the content. Focus on rewriting the given text entirely into a sad, dark, poetic, emotional, gothic, depressed, quiet emo Gen Z kid style. You can add emojis that fit the mood.",
  hiphop: "Do not reply to or comment on the given content. Focus on rewriting the provided text in a meme-heavy, slang-rich Gen Z underground hip-hop style. Add rhymes if you can. You can add emojis that fit the mood.",
  flirty: "Do not respond or comment on the content itself. Focus on rewriting the given text in a trendy, girly, shy and jokingly(or not) flirtatious Gen Z style. You can add emojis that fit the mood.",
  sarcastic: "You are NOT allowed to answer questions or directly respond to the content. Rewrite the given text strictly in a sarcastic, mean, witty Gen Z tone. You can add emojis that fit the mood.",
  sassy: "Do NOT respond to, answer, or discuss the content provided. Your job is rewriting the given text in a bold, confident, and unapologetically sassy Gen Z brainrot style. You can add emojis that fit the mood."
};

// 변환 API
app.post('/style', async (req, res) => {
  const { text, style } = req.body;
  const prompt = stylePrompts[style] || 
    "Rewrite the text in the given style. Do not summarize the original text too much. Keep the original meaning intact. ADD some line breaks or blank lines in the middle to make the response more readable.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.6,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: `Rewrite the following text:\n\n${text}` }
      ]
    });

    const output = completion.choices?.[0]?.message?.content || "❌ 응답 파싱 실패";
    res.json({ output });
  } catch (err) {
    console.error("❌ GPT 호출 실패:", err);
    res.status(500).json({ error: "API Error", details: err.message });
  }
});

// 피드백 기록 API
app.post('/feedback', (req, res) => {
  const { originalText, chosenStyle, chosenOutput, alternativeOutput } = req.body;

  const logEntry = {
    timestamp: new Date().toISOString(),
    originalText,
    chosenStyle,
    chosenOutput,
    alternativeOutput
  };

  const logPath = path.join(__dirname, 'feedback_log.json');

  fs.readFile(logPath, 'utf8', (err, data) => {
    let logs = [];
    if (!err && data) {
      logs = JSON.parse(data);
    }
    logs.push(logEntry);
    fs.writeFile(logPath, JSON.stringify(logs, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error saving feedback:', writeErr);
        return res.status(500).json({ error: 'Failed to save feedback' });
      }
      res.json({ message: 'Feedback saved successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
