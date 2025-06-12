import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    // Debug log to confirm env variable is loaded
    console.log("🔑 OPENAI_API_KEY is", process.env.OPENAI_API_KEY ? "SET ✅" : "NOT SET ❌");

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const answer = response.data.choices[0].message.content;
      res.status(200).json({ answer });
    } catch (error) {
      console.error('🔥 ERROR CALLING OPENAI:', {
        message: error.message,
        data: error.response?.data,
        status: error.response?.status,
      });
      res.status(500).json({ answer: 'Something went wrong. Please try again.' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
