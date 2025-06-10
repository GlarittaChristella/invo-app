import { useState, useEffect } from 'react';

const StockTracker = () => {
  const [stock, setStock] = useState([
    { item: 'Rice Bag', quantity: 45 },
    { item: 'Oil Tin', quantity: 20 },
    { item: 'Wheat Flour', quantity: 10 },
  ]);

  useEffect(() => {
    // Example: Show low stock alert
    stock.forEach((s) => {
      if (s.quantity < 15) {
        console.log(`${s.item} is low in stock!`);
      }
    });
  }, [stock]);

  return (
    <div style={{ border: '2px solid #444', padding: '1rem', margin: '1rem' }}>
      <h2>📦 Stock Tracker</h2>
      <ul>
        {stock.map((s, i) => (
          <li key={i}>
            {s.item}: {s.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockTracker;
