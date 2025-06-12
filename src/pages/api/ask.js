import axios from 'axios';

export default async function handler(req, res) {
  const { question } = req.body; // Change 'prompt' to 'question'

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: question }], // Use 'question' here
          },
        ],
      }
    );

    const geminiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
    res.status(200).json({ answer: geminiText }); // Return as 'answer'
  } catch (error) {
    console.error("🔥 ERROR CALLING GEMINI:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API call failed" });
  }
}
