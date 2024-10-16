import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSneakers } from '../utils/api';
import SneakerCard from '../components/SneakerCard';
import { useAuth } from '../contexts/AuthContext';

function Store() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const data = await getAllSneakers();
        setSneakers(data);
      } catch (err) {
        setError('Failed to fetch sneakers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSneakers();
  }, []);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Sneaker Store</h1>
      {!currentUser && (
        <div className="text-center mb-4 sm:mb-8">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Log in to purchase sneakers
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {sneakers.map((sneaker) => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} canPurchase={!!currentUser} />
        ))}
      </div>
    </div>
  );
}

export default Store;
