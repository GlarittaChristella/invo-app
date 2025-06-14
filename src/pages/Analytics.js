import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // ✅ Corrected path

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Analytics() {
  const [products, setProducts] = useState([]);

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

  const monthlyUsage = products.map(p => ({
    name: p.name,
    usage: Math.floor(p.quantity * Math.random() * 3) || 1,
  }));

  const topUsed = [...monthlyUsage]
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 5);

  const lowStock = products
    .filter(p => p.quantity < 10)
    .map(p => ({ name: p.name, qty: p.quantity }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        📊 Stock Analytics Dashboard
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <h3>📅 Monthly Usage (Demo)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyUsage}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>🔥 Top Used Products</h3>
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
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <h3>⚠️ Low Stock Items</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={lowStock}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="qty" fill="#e74c3c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}