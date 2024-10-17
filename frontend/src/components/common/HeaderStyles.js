import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DIM_COLOR = '#4A4A4A';

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
    background-color: ${props => props.dimColor};
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

