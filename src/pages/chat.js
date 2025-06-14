import { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.answer || 'No answer from AI.');
    } catch (err) {
      console.error('Client error:', err);
      setResponse('⚠️ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-2">🤖 Smart Inventory AI Assistant</h1>
      <p className="text-gray-600 text-center mb-6">
        Ask your inventory questions and get instant AI help!
      </p>

      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg">
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
          Your Question
        </label>
        <textarea
          id="question"
          rows={4}
          className="w-full border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="E.g., How to track low stock items?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleAsk}
          disabled={loading}
        >
          {loading ? 'Asking AI...' : 'Ask'}
        </button>

        {response && (
          <div ref={responseRef} className="mt-6">
            <h2 className="font-semibold text-lg text-gray-700 mb-2">AI Response:</h2>
            <div className="bg-gray-50 border border-gray-300 p-4 rounded-md text-gray-800 whitespace-pre-line">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
