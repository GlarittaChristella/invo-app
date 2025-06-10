  import StockTracker from '../StockTracker';
  import RestockHistory from '../RestockHistory';

export default function Home() {
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
            <RestockHistory />





      <footer style={{ fontSize: '1rem', color: '#888' }}>
        <p>Crafted with ❤️ by Glaritta Christella</p>
      </footer>
    </div>
  );
}




 
