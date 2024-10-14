import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ItemCard from '../components/Store/ItemCard';

function Store() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await api.getItems();
        setItems(data);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div>Loading items...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="store">
      {items.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}

export default Store;