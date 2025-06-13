import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export default function RestockHistory() {
  const [date, setDate] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const querySnapshot = await getDocs(collection(db, "restockHistory"));
    const records = [];
    querySnapshot.forEach((doc) => {
      records.push(doc.data());
    });
    setHistory(records);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAddEntry = async () => {
    if (!date || !item || !quantity) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "restockHistory"), {
        date,
        item,
        quantity: Number(quantity),
      });
      setDate('');
      setItem('');
      setQuantity('');
      fetchHistory(); // Refresh
    } catch (error) {
      console.error("Error adding restock entry:", error);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>📜 Restock History</h2>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="📅 Date"
          style={{ margin: '5px', padding: '5px' }}
        />
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="📦 Item"
          style={{ margin: '5px', padding: '5px' }}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="🔢 Quantity"
          style={{ margin: '5px', padding: '5px' }}
        />
        <button onClick={handleAddEntry} style={{ padding: '6px 12px', margin: '5px' }}>
          ➕ Add Entry
        </button>
      </div>

      <table style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.item}</td>
              <td>{entry.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
