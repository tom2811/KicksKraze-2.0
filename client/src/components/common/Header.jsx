import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Button, Box } from '@radix-ui/themes';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from './SearchBar';
import { FancyButton, Logo, AnimatedLink, DIM_COLOR } from '../StyledComponents';

function Header() {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle store navigation and close mobile menu
  const handleStoreClick = (e) => {
    e.preventDefault();
    navigate('/store', { replace: true });
    setIsMenuOpen(false);
  };

  // Render desktop navigation links and buttons
  const renderDesktopNavigation = () => (
    <Flex align="center" gap="3" className="hidden md:flex">
      <AnimatedLink to="/" $isActive={location.pathname === '/'} $dimColor={DIM_COLOR}>Home</AnimatedLink>
      <AnimatedLink as="button" onClick={handleStoreClick} $isActive={location.pathname === '/store'} $dimColor={DIM_COLOR}>Store</AnimatedLink>
      {currentUser ? (
        <>
          <Link to="/cart" className="text-gray-600 lg:mr-4">
            <FaShoppingCart size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Link>
          <FancyButton onClick={logout}>Logout</FancyButton>
        </>
      ) : (
        <Link to="/login">
          <FancyButton>Login</FancyButton>
        </Link>
      )}
    </Flex>
  );

  // Render mobile action buttons (cart/login and menu toggle)
  const renderMobileActions = () => (
    <Flex align="center" gap="2" className="md:hidden">
      {currentUser ? (
        <Link to="/cart" className="pr-2 text-gray-600">
          <FaShoppingCart size={20} />
        </Link>
      ) : (
        <Link to="/login">
          <FancyButton>Login</FancyButton>
        </Link>
      )}
      <Button variant="ghost" onClick={toggleMenu} className="p-1 text-gray-600">
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </Button>
    </Flex>
  );

  // Render mobile menu content
  const renderMobileMenu = () => (
    <Box className={`md:hidden bg-white transition-all duration-300 ${isMenuOpen ? 'max-h-[300px]' : 'max-h-0'} overflow-hidden`}>
      <Flex direction="column" align="center" gap="2" className="px-4 py-2">
        <SearchBar 
          className="mb-2" 
          inputClassName="text-[10px] sm:text-xs" 
          placeholderClassName="text-[10px] sm:text-xs"
        />
        <NavLink to="/" isActive={location.pathname === '/'} className="w-full">Home</NavLink>
        <NavLink as="button" onClick={handleStoreClick} isActive={location.pathname === '/store'} className="w-full">Store</NavLink>
        {currentUser && (
          <FancyButton onClick={logout} className="w-full mb-2">
            Logout
          </FancyButton>
        )}
      </Flex>
    </Box>
  );

  return (
    <header className="bg-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-6 py-3 sm:px-4 sm:py-2 md:px-3 md:py-3">
        <Flex justify="between" align="center">
          {/* Logo */}
          <Logo className="text-base sm:text-lg md:text-xl cursor-default">KicksKraze</Logo>

          <Flex align="center" className="flex-grow mx-4 md:mx-6 max-w-2xl hidden md:flex">
            {/* Search Bar */}
            <SearchBar 
              className="w-full"
              inputClassName="text-[10px] sm:text-xs md:text-xs lg:text-sm" 
              placeholderClassName="text-[10px] sm:text-xs md:text-xs lg:text-sm"
            />
          </Flex>

          {/* Desktop Navigation */}
          {renderDesktopNavigation()}

          {/* Mobile Actions */}
          {renderMobileActions()}
        </Flex>
      </div>

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </header>
  );
}

function NavLink({ children, isActive, ...props }) {
  return (
    <Box
      as={props.as || Link}
      {...props}
      className={`text-gray-600 hover:text-cyan-500 transition-colors duration-200 ${
        isActive ? 'text-cyan-500' : ''
      } ${props.className || ''}`}
    >
      {children}
    </Box>
  );
}

export default Header;
