import axios from 'axios';

export default async function handler(req, res) {
  const { question } = req.body;
  console.log("📥 Question:", question);
  console.log("🔑 Gemini API KEY (SERVER):", process.env.GEMINI_API_KEY);

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: question }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        },
      }
    );

    console.log("🌐 Gemini Full Response:", JSON.stringify(response.data, null, 2));

    const text = response.data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(' ') || "No AI reply.";
    res.status(200).json({ answer: text });

  } catch (error) {
    console.error("🔥 Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API call failed" });
  }
}




