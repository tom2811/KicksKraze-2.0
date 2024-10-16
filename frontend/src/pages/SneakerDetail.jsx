import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSneakerById } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

function SneakerDetail() {
  const [sneaker, setSneaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const data = await getSneakerById(id);
        setSneaker(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sneaker details. Please try again later.');
        setLoading(false);
      }
    };
    fetchSneaker();
  }, [id]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-600">{error}</div>;
  if (!sneaker) return <div className="text-center py-16">Sneaker not found</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src={sneaker.imgUrl} alt={sneaker.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{sneaker.name}</h1>
          <p className="text-lg sm:text-xl mb-4">{sneaker.colorway}</p>
          <p className="text-xl sm:text-2xl font-bold mb-6">${sneaker.price}</p>
          {currentUser ? (
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          ) : (
            <p className="text-red-600">Please log in to purchase</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SneakerDetail;
