import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DIM_COLOR = '#4A4A4A';
export const ACCENT_COLOR = 'hsl(192 91% 36%)';

export const AnimatedLink = styled(Link)`
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
    background-color: ${ACCENT_COLOR}; // Changed to ACCENT_COLOR (cyan)
    transform: scaleX(${props => props.isActive ? 1 : 0});
    transform-origin: bottom left;
    transition: transform 0.3s ease-out;
  }
`;

export const MobileMenu = styled.nav`
  max-height: ${props => props.isOpen ? '300px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

export const MobileMenuLink = styled(Link)`
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

export const Logo = styled.span`
  color: #000;
  -webkit-text-stroke: 1px #000;
  letter-spacing: -0.03em;
`;

export const dimButtonStyle = {
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

export const mobileLoginButtonStyle = {
  ...dimButtonStyle,
  width: '100%',
  outline: `1px solid ${DIM_COLOR}`,
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
};

export const mobileLogoutButtonStyle = {
  color: DIM_COLOR,
  backgroundColor: 'transparent',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  padding: '10px 0',
  width: '100%',
  border: 'none',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
};

export const FancyButton = styled.button`
  background-color: white;
  color: ${DIM_COLOR};
  border: 1px solid ${ACCENT_COLOR};
  border-radius: 16px;
  padding: 0.3rem 0.8rem;
  font-weight: 500;
  font-size: 0.75rem; // Equivalent to text-xs
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: ${ACCENT_COLOR};
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    &::before {
      width: 100%;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 768px) {
    font-size: 0.875rem; // Equivalent to text-sm for larger screens
  }
`;

export const MobileFancyButton = styled(FancyButton)`
  width: auto;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
`;
