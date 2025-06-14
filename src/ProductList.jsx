import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [showExpiringOnly, setShowExpiringOnly] = useState(false);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 5;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const isLowStock = product.quantity < 10;
    const isExpiring = isExpiringSoon(product.expiryDate);

    return matchesSearch &&
      (!showLowStockOnly || isLowStock) &&
      (!showExpiringOnly || isExpiring);
  });

  const expiringCount = products.filter(p => isExpiringSoon(p.expiryDate)).length;
  const lowStockCount = products.filter(p => p.quantity < 10).length;

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        📦 Product List
      </h2>

      {/* Summary */}
      <div style={{
        padding: '10px 15px',
        backgroundColor: '#dff0d8',
        border: '1px solid #b2d8b2',
        borderRadius: '8px',
        marginBottom: '15px'
      }}>
        🧾 <strong>Total Products:</strong> {products.length} | 
        ⚠️ <strong>Expiring Soon:</strong> {expiringCount} | 
        🧨 <strong>Low Stock:</strong> {lowStockCount}
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search product..."
          style={{
            padding: '8px 12px',
            width: '60%',
            marginRight: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={() => setShowLowStockOnly(prev => !prev)}
          /> Only Low Stock
        </label>
        <label>
          <input
            type="checkbox"
            checked={showExpiringOnly}
            onChange={() => setShowExpiringOnly(prev => !prev)}
          /> Only Expiring Soon
        </label>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProducts.map(product => {
          const expiringSoon = isExpiringSoon(product.expiryDate);
          return (
            <li
              key={product.id}
              style={{
                backgroundColor: expiringSoon ? '#fff8e1' : 'white',
                color: '#333',
                marginBottom: '15px',
                padding: '15px',
                borderRadius: '12px',
                border: product.quantity < 10 ? '2px solid #e74c3c' : '1px solid #ccc',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                {product.name || "Unnamed Product"}
              </div>
              <div><strong>Quantity:</strong> {product.quantity ?? "N/A"} {product.unit || ''}</div>
              <div><strong>Price:</strong> ₹{product.price ?? "N/A"} per {product.unit || ''}</div>

              {product.expiryDate && (
                <div style={{ color: expiringSoon ? '#e67e22' : '#666' }}>
                  <strong>Expiry:</strong> {new Date(product.expiryDate).toLocaleDateString()}
                  {expiringSoon && ' ⚠️ Expiring Soon'}
                </div>
              )}

              <button
                onClick={() => handleDelete(product.id)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  float: 'right'
                }}
              >
                🗑️ Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}