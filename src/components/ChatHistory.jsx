import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed

export default function ChatHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const q = query(collection(db, 'chatHistory'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const chats = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistory(chats);
      } catch (err) {
        console.error('Error fetching chat history:', err);
      }
    };

    fetchChatHistory();
  }, []);

  if (history.length === 0) {
    return <p className="text-gray-500">No previous chats found.</p>;
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">🕘 Chat History</h2>
      <ul className="space-y-4">
        {history.map(chat => (
          <li key={chat.id} className="border border-gray-200 p-3 rounded-md">
            <p><strong>🧑‍💼 You:</strong> {chat.question}</p>
            <p className="text-green-700"><strong>🤖 AI:</strong> {chat.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
