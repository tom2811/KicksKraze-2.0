import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to KicksKraze</h1>
      <p className="text-xl mb-8">Discover the latest and greatest sneakers in our collection.</p>
      <Link to="/store" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
        Shop Now
      </Link>
    </div>
  );
}

export default Home;
