import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Flex, Button, TextField } from '@radix-ui/themes';
import { FaBars, FaTimes, FaShoppingCart, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

// Constants
const DIM_COLOR = '#4A4A4A';

// Styled Components
const AnimatedLink = styled(Link)`
  color: ${props => props.dimColor};
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.dimColor};
    transform: scaleX(${props => props.isActive ? 1 : 0});
    transform-origin: bottom left;
    transition: transform 0.3s ease-out;
  }
`;

const MobileMenu = styled.nav`
  max-height: ${props => props.isOpen ? '300px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const MobileMenuLink = styled(Link)`
  color: ${props => props.dimColor};
  text-decoration: none;
  text-align: center;
  padding: 10px 0;
  width: 100%;
  transition: background-color 0.2s;

  ${props => props.isActive && `
    background-color: rgba(0, 0, 0, 0.05);
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Logo = styled.span`
  color: #000;
  -webkit-text-stroke: 1px #000;
  letter-spacing: -0.03em;
`;

// Styles
const dimButtonStyle = {
  color: DIM_COLOR,
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  transition: 'outline 0.2s',
  outline: `1px solid ${DIM_COLOR}`,
  '&:hover': {
    outline: `2px solid ${DIM_COLOR}`
  }
};

const mobileLoginButtonStyle = {
  ...dimButtonStyle,
  width: '100%',
  outline: `1px solid ${DIM_COLOR}`,
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
};

const mobileLogoutButtonStyle = {
  color: DIM_COLOR,
  backgroundColor: 'transparent',
  padding: '10px 0',
  width: '100%',
  textAlign: 'center',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
};

// Components
const SearchBar = ({ className, style }) => (
  <TextField.Root className={`w-full ${className}`}>
    <TextField.Input 
      placeholder="Find your favorite kicks..." 
      className="pr-10 py-3 text-sm font-semibold font-sans" 
      style={{ 
        paddingLeft: '0.5rem',
        borderRadius: '0.5rem',
        ...style
      }}
    />
    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </TextField.Root>
);

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

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
