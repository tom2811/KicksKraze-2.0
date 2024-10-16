import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch {
      console.error("Failed to log out");
    }
  }

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Home and Store buttons */}
          <div className="hidden sm:flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/store" className="hover:text-gray-300">Store</Link>
          </div>

          {/* Center - KicksKraze text */}
          <div className="text-xl sm:text-2xl font-bold">KicksKraze</div>

          {/* Right side - Login/Logout button */}
          <div className="hidden sm:block">
            {currentUser ? (
              <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700">Logout</button>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Login</Link>
            )}
          </div>

          {/* Hamburger menu */}
          <button 
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div 
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-60' : 'max-h-0'}`}
        >
          <div className="pt-4 pb-2 space-y-2">
            {currentUser && (
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-sm truncate mr-2">{currentUser.email}</span>
                <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700">Logout</button>
              </div>
            )}
            <Link to="/" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/store" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Store</Link>
            {!currentUser && (
              <Link to="/login" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
