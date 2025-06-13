import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ ListModels Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to list models" });
  }
}
