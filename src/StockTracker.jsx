import { useState, useEffect } from 'react';

const StockTracker = () => {
  const [stock, setStock] = useState([
    { item: 'Rice Bag', quantity: 45 },
    { item: 'Oil Tin', quantity: 20 },
    { item: 'Wheat Flour', quantity: 10 },
  ]);

  useEffect(() => {
    stock.forEach((s) => {
      if (s.quantity < 15) {
        console.log(`⚠️ ${s.item} is low in stock!`);
      }
    });
  }, [stock]);

  const updateStock = (index, change) => {
    setStock((prevStock) =>
      prevStock.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  return (
    <div style={{ border: '2px solid #444', padding: '1rem', margin: '1rem' }}>
      <h2>📦 Stock Tracker</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {stock.map((s, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <strong>{s.item}</strong>: {s.quantity} units{' '}
            {s.quantity < 15 && <span style={{ color: 'red' }}> (Low!)</span>}
            <br />
            <button onClick={() => updateStock(i, -1)}>➖ Decrease</button>{' '}
            <button onClick={() => updateStock(i, 1)}>➕ Increase</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockTracker;