import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useUserRole } from './hooks/useUserRole'; // ✅ Import hook

export default function AddProduct() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const { role, loading } = useUserRole(); // ✅ Get user role

  if (loading) return <p>Loading role...</p>;
  if (role !== 'admin') return null; // ❌ Don't show form to staff

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);

    const lowerName = inputName.toLowerCase();
    if (
      lowerName.includes('oil') ||
      lowerName.includes('milk') ||
      lowerName.includes('juice') ||
      lowerName.includes('cool') ||
      lowerName.includes('water')
    ) {
      setUnit('litre');
    } else if (
      lowerName.includes('sugar') ||
      lowerName.includes('flour') ||
      lowerName.includes('rice') ||
      lowerName.includes('dal') ||
      lowerName.includes('atta')
    ) {
      setUnit('kg');
    } else {
      setUnit('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !quantity || !price) return;

    try {
      await addDoc(collection(db, 'products'), {
        name: name.trim(),
        quantity: Number(quantity),
        price: Number(price),
        unit: unit,
        expiryDate: expiryDate || null,
      });

      setName('');
      setQuantity('');
      setPrice('');
      setUnit('');
      setExpiryDate('');
      alert('✅ Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={handleNameChange}
        style={{ padding: '10px', width: '200px' }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ padding: '10px', width: '120px' }}
      />
      <input
        type="number"
        placeholder="Price ₹"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: '10px', width: '120px' }}
      />
      <input
        type="text"
        value={unit}
        readOnly
        placeholder="Unit"
        style={{
          padding: '10px',
          width: '100px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc'
        }}
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        style={{ padding: '10px', width: '160px' }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        ➕ Add Product
      </button>
    </form>
  );
}