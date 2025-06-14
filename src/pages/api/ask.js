import axios from 'axios';
import { db } from '../../firebase'; // ✅ Firestore DB
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  const { question } = req.body;

  console.log("📥 Question:", question);
  console.log("🔑 Gemini Key:", process.env.GEMINI_API_KEY);

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  // 🧠 Step 1: Sample Inventory (you can fetch this from Firestore in future)
  const inventory = [
    { name: "Rice Bag", quantity: 5, price: 44 },
    { name: "Milk Powder", quantity: 56, price: null },
    { name: "Wheat Flour", quantity: 10, price: 52 },
    { name: "Oil Tin", quantity: 20, price: 120 },
  ];

  // 💡 Step 2: Generate contextual suggestions
  let suggestions = [];

  inventory.forEach(item => {
    if (item.quantity < 10) {
      suggestions.push(`⚠️ ${item.name} is low on stock. Consider reordering.`);
    }
    if (!item.price) {
      suggestions.push(`💡 Please add price info for ${item.name}.`);
    }
  });

  // 📝 Step 3: Merge suggestion with user question
  const enhancedPrompt = suggestions.length > 0
    ? `Before answering, consider these inventory notes:\n${suggestions.join('\n')}\n\nNow answer this:\n${question}`
    : question;

  // 🚀 Step 4: Call Gemini API
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: enhancedPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512
        }
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("📤 Gemini Response:", text);

    // 💾 Step 5: Save to Firestore
    await addDoc(collection(db, 'aiChats'), {
      question,
      answer: text || "No response from Gemini",
      createdAt: serverTimestamp()
    });

    res.status(200).json({ answer: text || "No response from Gemini" });
  } catch (error) {
    console.error("🔥 Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API call failed" });
  }
}
