import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Button, Box, Text } from '@radix-ui/themes';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from './SearchBar';
import { Logo, AnimatedLink, DIM_COLOR, FancyButton } from '../StyledComponents';

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
    <Flex align="center" gap={{ initial: '5', md: '6', lg: '7' }} className="hidden md:flex items-center">
      <AnimatedLink 
        to="/" 
        $isActive={location.pathname === '/'} 
        $dimColor={DIM_COLOR} 
        className="text-sm md:text-xs lg:text-sm xl:text-base"
      >
        Home
      </AnimatedLink>
      <AnimatedLink 
        as="button" 
        onClick={handleStoreClick} 
        $isActive={location.pathname === '/store'} 
        $dimColor={DIM_COLOR} 
        className="text-sm md:text-xs lg:text-sm xl:text-base"
      >
        Store
      </AnimatedLink>
      {currentUser ? (
        <>
          <Link to="/cart" className="text-gray-600 cart-icon-hover transition-colors duration-200">
            <FaShoppingCart size={20} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
          </Link>
          <FancyButton onClick={logout} className="text-xs md-login-btn lg:text-xs lg:px-3 lg:py-[0.3rem]">
            Logout
          </FancyButton>
        </>
      ) : (
        <Link to="/login">
          <FancyButton className="text-xs md-login-btn lg:text-xs lg:px-3 lg:py-[0.3rem]">Login</FancyButton>
        </Link>
      )}
    </Flex>
  );

  // Render mobile action buttons (cart/login and menu toggle)
  const renderMobileActions = () => (
    <Flex align="center" gap="2" className="md:hidden">
      {currentUser ? (
        <Link to="/cart" className="pr-2 text-gray-600 cart-icon-hover">
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
      <Flex direction="column" align="center" gap="4" className="px-4 py-6">
        <SearchBar 
          className="w-full mb-2" 
          inputClassName="text-[10px] sm:text-xs" 
          placeholderClassName="text-[10px] sm:text-xs"
        />
        <Flex direction="column" align="center" gap="6" className="w-full">
          <MobileNavLink to="/" isActive={location.pathname === '/'}>Home</MobileNavLink>
          <MobileNavLink as="button" onClick={handleStoreClick} isActive={location.pathname === '/store'}>Store</MobileNavLink>
          {currentUser && <MobileNavLink as="button" onClick={logout}>Logout</MobileNavLink>}
        </Flex>
      </Flex>
    </Box>
  );

  return (
    <header className="bg-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3 sm:px-6 md:px-10 lg:px-12 xl:px-5">
        <Flex justify="between" align="center">
          {/* Logo */}
          <Logo className="text-base sm:text-lg md:text-base lg:text-xl cursor-default">KicksKraze</Logo>

          <Flex align="center" className="flex-grow mx-4 md:mx-4 lg:mx-6 xl:mx-8 max-w-2xl hidden md:flex">
            {/* Search Bar */}
            <SearchBar 
              className="w-full"
              inputClassName="text-xs md:text-[11px] lg:text-sm" 
              placeholderClassName="text-[10px] md:text-[10px] lg:text-xs"
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

function MobileNavLink({ children, isActive, ...props }) {
  return (
    <Text
      as={props.as || Link}
      {...props}
      size="2"
      className={`text-gray-600 hover:text-cyan-500 transition-colors duration-200 ${
        isActive ? 'text-cyan-500' : ''
      } ${props.className || ''}`}
    >
      {children}
    </Text>
  );
}

export default Header;
