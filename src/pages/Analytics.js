import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Analytics() {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // 🌙 Toggle state

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
    };

    fetchProducts();
  }, []);

  const monthlyUsage = products.map(p => {
    const qty = parseFloat(p.quantity) || 0;
    const usage = Math.floor(qty * Math.random() * 3) || 1;
    return { name: p.name, usage: usage.toFixed(0) };
  });

  const topUsed = [...monthlyUsage]
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 5);

  const lowStock = products
    .filter(p => parseFloat(p.quantity) < 10)
    .map(p => ({ name: p.name, qty: parseFloat(p.quantity) || 0 }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div style={{
      padding: '30px',
      fontFamily: 'sans-serif',
      backgroundColor: darkMode ? '#0f172a' : '#ffffff',
      color: darkMode ? '#f1f5f9' : '#1e293b',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      
      {/* 🌙 Toggle Button */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            backgroundColor: darkMode ? '#facc15' : '#1e293b',
            color: darkMode ? '#000' : '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        📊 Stock Analytics Dashboard
      </h2>

      {/* Monthly Usage + Top Used Products */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px'
      }}>
        <div>
          <h3>📅 Monthly Usage (Estimates)</h3>
          {monthlyUsage.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyUsage}>
                <XAxis dataKey="name" stroke={darkMode ? '#fff' : '#000'} />
                <YAxis stroke={darkMode ? '#fff' : '#000'} />
                <Tooltip />
                <Bar dataKey="usage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : <p>No usage data available.</p>}
        </div>

        <div>
          <h3>🔥 Top Used Products</h3>
          {topUsed.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topUsed}
                  dataKey="usage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {topUsed.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <p>No data for top-used products.</p>}
        </div>
      </div>

      {/* Low Stock Items */}
      <div style={{ marginTop: '50px' }}>
        <h3>⚠️ Low Stock Items</h3>
        {lowStock.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={lowStock}>
              <XAxis dataKey="name" stroke={darkMode ? '#fff' : '#000'} />
              <YAxis stroke={darkMode ? '#fff' : '#000'} />
              <Tooltip />
              <Bar dataKey="qty" fill="#e74c3c" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>All items are sufficiently stocked.</p>}
      </div>
    </div>
  );
}
