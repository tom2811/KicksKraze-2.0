import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flex, Button } from '@radix-ui/themes';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from './SearchBar';
import {
  DIM_COLOR,
  AnimatedLink,
  MobileMenu,
  MobileMenuLink,
  Logo,
  dimButtonStyle,
  mobileLoginButtonStyle,
  mobileLogoutButtonStyle
} from './HeaderStyles';

function Header() {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 0) {
        header.classList.add('sticky', 'top-0', 'z-50');
      } else {
        header.classList.remove('sticky', 'top-0', 'z-50');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <Flex justify="between" align="center">
          <Logo className="text-2xl font-doodle cursor-default">KicksKraze</Logo>

          {/* Search Bar (visible only on desktop) */}
          <Flex align="center" className="flex-grow mx-8 max-w-2xl hidden md:flex">
            <SearchBar />
          </Flex>

          {/* Navigation and User Actions (desktop) */}
          <Flex align="center" gap="6" className="hidden md:flex">
            <AnimatedLink to="/" dimColor={DIM_COLOR} isActive={location.pathname === '/'}>Home</AnimatedLink>
            <AnimatedLink to="/store" dimColor={DIM_COLOR} isActive={location.pathname === '/store'}>Store</AnimatedLink>
            {currentUser ? (
              <>
                <Link to="/cart" style={{ color: DIM_COLOR }}>
                  <FaShoppingCart size={24} />
                </Link>
                <Button onClick={logout} size="2" style={dimButtonStyle}>Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="2" style={dimButtonStyle}>Login</Button>
              </Link>
            )}
          </Flex>

          {/* Mobile actions */}
          <Flex align="center" gap="4" className="md:hidden">
            {currentUser ? (
              <Link to="/cart" style={{ color: DIM_COLOR }}>
                <FaShoppingCart size={24} />
              </Link>
            ) : (
              <Link to="/login" style={{ width: '100%' }}>
                <Button size="2" style={mobileLoginButtonStyle}>Login</Button>
              </Link>
            )}
            <Button onClick={toggleMenu} variant="ghost" style={{ color: DIM_COLOR }}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </Button>
          </Flex>
        </Flex>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMenuOpen} className="md:hidden bg-white">
        <Flex direction="column" align="center" gap="2" className="px-4 py-4">
          <SearchBar className="mb-2" />
          <MobileMenuLink to="/" dimColor={DIM_COLOR} isActive={location.pathname === '/'}>Home</MobileMenuLink>
          <MobileMenuLink to="/store" dimColor={DIM_COLOR} isActive={location.pathname === '/store'}>Store</MobileMenuLink>
          {currentUser && (
            <Button onClick={logout} style={mobileLogoutButtonStyle}>Logout</Button>
          )}
        </Flex>
      </MobileMenu>
    </header>
  );
}

export default Header;
