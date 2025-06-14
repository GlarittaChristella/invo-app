import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <h2>📦 Invo-App</h2>
        <p style={styles.tagline}>Smart Inventory for SMEs</p>
      </div>
      <div style={styles.links}>
        <Link href="/"><button style={styles.button}>🏠 Home</button></Link>
        <Link href="/AddProduct"><button style={styles.button}>➕ Add Product</button></Link>
        <Link href="/StockTracker"><button style={styles.button}>📊 Stock Tracker</button></Link>
        <Link href="/RestockHistory"><button style={styles.button}>📜 Restock History</button></Link>
        <Link href="/ProductList"><button style={styles.button}>📋 Product List</button></Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1e293b',
    color: 'white',
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '1.2rem',
  },
  tagline: {
    fontSize: '0.8rem',
    marginTop: '-0.5rem',
    color: '#cbd5e1',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
};

export default Navbar;
