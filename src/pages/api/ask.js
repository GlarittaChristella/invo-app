import axios from 'axios';

export default async function handler(req, res) {
  const { question } = req.body;
  console.log("▶️ Incoming question:", question);

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: question }] }],
        temperature: 0.7,
        candidateCount: 1,
        maxOutputTokens: 256
      }
    );

    const candidates = response.data.candidates || [];
    const geminiText = candidates[0]?.content?.parts?.[0]?.text || "No answer received.";
    res.status(200).json({ answer: geminiText });

  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    console.error("🔥 GEMINI API ERROR:", message);
    res.status(status).json({ error: `Gemini Error: ${message}` });
  }
}
