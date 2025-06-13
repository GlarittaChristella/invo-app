import Link from 'next/link';
import { useEffect } from 'react';
import { app, analytics } from '../firebase';

import ProductList from '../ProductList';
import AddProductForm from '../AddProductForm'; // Make sure you created this component
import StockTracker from '../StockTracker';
import RestockHistory from '../RestockHistory';

export default function Home() {
  useEffect(() => {
    console.log('Firebase Initialized:', app);
    if (analytics) {
      console.log('Analytics active');
    }
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#2c3e50' }}>Welcome to Invo-App</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>
        Your smart inventory management solution for small and medium businesses.
      </p>

      <div style={{ marginTop: '30px' }}>
        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.1rem' }}>
          <li>✅ Live Inventory Updates</li>
          <li>📉 Low-stock Warnings</li>
          <li>📊 Intuitive Dashboards</li>
          <li>🔄 Easy Product Management</li>
        </ul>
      </div>

      <hr style={{ margin: '40px 0', borderColor: '#ccc' }} />

      <StockTracker />

      <h2>📦 Product List</h2>
      <ProductList />
      <AddProductForm />

      <RestockHistory />

      {/* Buttons */}
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/chat">
          <button
            style={{
              backgroundColor: '#27ae60',
              color: 'white',
              padding: '12px 24px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            🤖 AI Assistant Chat
          </button>
        </Link>

        <Link href="/analytics">
          <button
            style={{
              backgroundColor: '#2980b9',
              color: 'white',
              padding: '12px 24px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            📊 View Analytics
          </button>
        </Link>
      </div>

      <footer style={{ fontSize: '1rem', color: '#888', marginTop: '40px' }}>
        <p>Crafted with ❤️ by Glaritta Christella</p>
      </footer>
    </div>
  );
}

