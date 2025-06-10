import { useState, useEffect } from 'react';

const RestockHistory = () => {
  const [history, setHistory] = useState([
    { date: '2025-06-01', item: 'Sugar', quantity: 30 },
    { date: '2025-06-08', item: 'Milk Powder', quantity: 15 },
  ]);

  useEffect(() => {
    // Example effect: log restock count
    console.log(`Total restock events: ${history.length}`);
  }, [history]);

  return (
    <div style={{ border: '2px dashed #888', padding: '1rem', margin: '1rem' }}>
      <h2>📜 Restock History</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i}>
              <td>{h.date}</td>
              <td>{h.item}</td>
              <td>{h.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestockHistory;
