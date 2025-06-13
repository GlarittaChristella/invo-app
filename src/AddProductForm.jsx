import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('kg');

  const handleAddProduct = async () => {
    if (!name || !quantity || !price || !unit) {
      alert('Fill all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        name,
        quantity: Number(quantity),
        price: Number(price),
        unit,
      });
      alert('Product added!');
      setName('');
      setQuantity('');
      setPrice('');
      setUnit('kg');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ margin: '5px', padding: '5px' }}
      />
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        style={{ margin: '5px', padding: '5px' }}
      >
        <option value="kg">kg</option>
        <option value="litre">litre</option>
        <option value="packet">packet</option>
        <option value="piece">piece</option>
      </select>
      <input
        type="number"
        placeholder="Price ₹"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ margin: '5px', padding: '5px' }}
      />
      <button onClick={handleAddProduct} style={{ padding: '6px 12px', margin: '5px' }}>
        ➕ Add Product
      </button>
    </div>
  );
}
