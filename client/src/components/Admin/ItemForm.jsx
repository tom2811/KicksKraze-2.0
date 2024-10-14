import React, { useState } from 'react';
import api from '../../services/api';

function ItemForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createItem({ name, price, description, image });
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;