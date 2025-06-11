import { useState, useEffect } from 'react';

const RestockHistory = () => {
  const [history, setHistory] = useState([
    { date: '2025-06-01', item: 'Sugar', quantity: 30 },
    { date: '2025-06-08', item: 'Milk Powder', quantity: 15 },
  ]);

  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    console.log(`📝 Total restock events: ${history.length}`);
  }, [history]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem && newQuantity && newDate) {
      const newEntry = {
        date: newDate,
        item: newItem,
        quantity: parseInt(newQuantity),
      };
      setHistory([...history, newEntry]);
      setNewItem('');
      setNewQuantity('');
      setNewDate('');
    }
  };

  return (
    <div style={{ border: '2px dashed #888', padding: '1rem', margin: '1rem' }}>
      <h2>📜 Restock History</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: '1rem' }}>
        <label>
          📅 Date:{' '}
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </label>{' '}
        <label>
          📦 Item:{' '}
          <input
            type="text"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            required
          />
        </label>{' '}
        <label>
          🔢 Quantity:{' '}
          <input
            type="number"
            placeholder="Enter quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            required
          />
        </label>{' '}
        <button type="submit">➕ Add Entry</button>
      </form>

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
