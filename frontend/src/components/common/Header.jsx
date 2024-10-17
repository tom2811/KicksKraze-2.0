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
      <div className="container mx-auto px-6 py-3 sm:px-4 sm:py-2 md:px-3 md:py-3">
        <Flex justify="between" align="center">
          <Logo className="text-base sm:text-lg md:text-xl font-doodle cursor-default">KicksKraze</Logo>

          {/* Search Bar (visible only on desktop) */}
          <Flex align="center" className="flex-grow mx-4 md:mx-6 max-w-2xl hidden md:flex">
            <SearchBar 
              inputClassName="text-[10px] sm:text-xs md:text-xs lg:text-sm" 
              placeholderClassName="text-[10px] sm:text-xs md:text-xs lg:text-sm"
            />
          </Flex>

          {/* Navigation and User Actions (desktop) */}
          <Flex align="center" gap="3" className="hidden md:flex">
            <AnimatedLink to="/" dimColor={DIM_COLOR} isActive={location.pathname === '/'} className="text-xs sm:text-sm md:text-sm lg:text-base lg:mr-4">Home</AnimatedLink>
            <AnimatedLink to="/store" dimColor={DIM_COLOR} isActive={location.pathname === '/store'} className="text-xs sm:text-sm md:text-sm lg:text-base lg:mr-4">Store</AnimatedLink>
            {currentUser ? (
              <>
                <Link to="/cart" style={{ color: DIM_COLOR }} className="lg:mr-4">
                  <FaShoppingCart size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </Link>
                <Button 
                  onClick={logout} 
                  size="1" 
                  style={dimButtonStyle}
                  className="text-xs sm:text-sm md:text-sm lg:text-base px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button 
                  size="1" 
                  style={dimButtonStyle}
                  className="text-xs sm:text-sm md:text-sm lg:text-base px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2"
                >
                  Login
                </Button>
              </Link>
            )}
          </Flex>

          {/* Mobile actions */}
          <Flex align="center" gap="4" className="md:hidden">
            {currentUser ? (
              <Link to="/cart" style={{ color: DIM_COLOR }}>
                <FaShoppingCart size={20} />
              </Link>
            ) : (
              <Link to="/login">
                <Button size="1" style={mobileLoginButtonStyle} className="text-xs sm:text-sm px-3 py-1">
                  Login
                </Button>
              </Link>
            )}
            <Button onClick={toggleMenu} variant="ghost" style={{ color: DIM_COLOR }} className="p-1">
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </Button>
          </Flex>
        </Flex>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMenuOpen} className="md:hidden bg-white">
        <Flex direction="column" align="center" gap="2" className="px-4 py-2">
          <SearchBar 
            className="mb-2" 
            inputClassName="text-[10px] sm:text-xs" 
            placeholderClassName="text-[10px] sm:text-xs"
          />
          <MobileMenuLink to="/" dimColor={DIM_COLOR} isActive={location.pathname === '/'} className="text-xs sm:text-sm">Home</MobileMenuLink>
          <MobileMenuLink to="/store" dimColor={DIM_COLOR} isActive={location.pathname === '/store'} className="text-xs sm:text-sm">Store</MobileMenuLink>
          {currentUser && (
            <Button 
              onClick={logout} 
              size="1" 
              style={mobileLogoutButtonStyle}
              className="text-xs sm:text-sm font-normal px-3 py-1"
            >
              Logout
            </Button>
          )}
        </Flex>
      </MobileMenu>
    </header>
  );
}

export default Header;
