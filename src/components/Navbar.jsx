import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: '🏠 Home', path: '/' },
    { name: '➕ Add Product', path: '/AddProduct' },
    { name: '📊 Stock Tracker', path: '/StockTracker' },
    { name: '📜 Restock History', path: '/RestockHistory' },
    { name: '📋 Product List', path: '/ProductList' },
  ];

  return (
    <nav style={styles.nav} className="flex flex-wrap items-center justify-between">

      {/* Logo Section */}
      <div style={styles.logo}>
        <h2>📦 Invo-App</h2>
        <p style={styles.tagline}>Smart Inventory for SMEs</p>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden" style={styles.hamburgerIcon}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.iconButton}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex" style={styles.links}>
        {navLinks.map((link) => (
          <Link key={link.path} href={link.path}>
            <button
              style={{
                ...styles.button,
                backgroundColor:
                  router.pathname === link.path ? '#2563eb' : styles.button.backgroundColor,
              }}
            >
              {link.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Mobile Dropdown Links */}
      {menuOpen && (
        <div className=" flex md:hidden flex-col w-full mt-4" style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <button
                style={{
                  ...styles.button,
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor:
                    router.pathname === link.path ? '#2563eb' : styles.button.backgroundColor,
                }}
                onClick={() => setMenuOpen(false)} // Close menu on link click
              >
                {link.name}
              </button>
            </Link>
          ))}
        </div>
      )}
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
  hamburgerIcon: {
    display: 'block',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  mobileMenu: {
    width: '100%',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
};

export default Navbar;
