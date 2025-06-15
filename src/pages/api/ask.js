import axios from 'axios';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  const { question } = req.body;

  console.log("📥 Incoming question:", question);

  // 🔐 Validate API Key
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Missing GEMINI_API_KEY");
    return res.status(500).json({ error: "Missing GEMINI_API_KEY in .env.local" });
  }

  // 🧾 Step 1: (Optional) Static inventory data — replace with Firestore later
  const inventory = [
    { name: "Rice Bag", quantity: 5, price: 44 },
    { name: "Milk Powder", quantity: 56, price: null },
    { name: "Wheat Flour", quantity: 10, price: 52 },
    { name: "Oil Tin", quantity: 20, price: 120 },
  ];

  // 💡 Step 2: Generate AI context suggestions
  const suggestions = [];

  inventory.forEach(item => {
    if (item.quantity < 10) {
      suggestions.push(`⚠️ ${item.name} is low on stock. Consider reordering.`);
    }
    if (!item.price) {
      suggestions.push(`💡 Price information is missing for ${item.name}.`);
    }
  });

  // 🧠 Step 3: Create enhanced prompt for Gemini
  const prompt = suggestions.length > 0
    ? `Before answering the following question, consider this inventory context:\n${suggestions.join('\n')}\n\nUser Question:\n${question}`
    : question;

  try {
    // 🚀 Step 4: Call Gemini API
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512
        }
      }
    );

    const answer = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";

    console.log("🤖 Gemini Answer:", answer);

    // 💾 Step 5: Save Q&A to Firestore
    await addDoc(collection(db, 'chatHistory'), {
      question,
      answer,
      createdAt: serverTimestamp()
    });

    // ✅ Step 6: Return to frontend
    res.status(200).json({ answer });

  } catch (error) {
    console.error("🔥 Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API call failed" });
  }
}


  