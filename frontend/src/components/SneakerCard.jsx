import React from 'react';
import { Link } from 'react-router-dom';

function SneakerCard({ sneaker, canPurchase }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={sneaker.imgUrl} alt={sneaker.name} className="w-full h-48 sm:h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{sneaker.name}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-2">{sneaker.colorway}</p>
        <p className="text-lg sm:text-xl font-bold mb-4">${sneaker.price}</p>
        <Link 
          to={`/sneaker/${sneaker.id}`} 
          className={`block w-full text-center px-4 py-2 rounded ${canPurchase 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'} transition duration-300`}
        >
          {canPurchase ? 'View Details' : 'Log in to View'}
        </Link>
      </div>
    </div>
  );
}

export default SneakerCard;
