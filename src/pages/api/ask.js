import axios from 'axios';

export default async function handler(req, res) {
  const { question } = req.body;

  console.log("📥 Question:", question);
  console.log("🔑 Gemini Key:", process.env.GEMINI_API_KEY);

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: question
              }
            ]
          }
        ]
      }
    );

    const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
    console.log("📤 Gemini Response:", geminiText);
    res.status(200).json({ answer: geminiText });
    
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    console.error("🔥 Gemini API Error:", message);
    res.status(status).json({ error: `Gemini Error: ${message}` });
  }
}



