import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@radix-ui/themes';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const StyledTextField = styled(TextField.Root)`
  width: 100%;
  ${props => props.className}
`;

const StyledInput = styled(TextField.Input)`
  padding-right: 2.5rem;
  padding-left: 0.5rem;
  border-radius: 0.5rem;
  font-size: inherit;

  &::placeholder {
    ${props => props.$placeholderClassName}
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 0.75rem;
`;

const SearchBar = ({ className, style, inputClassName, placeholderClassName }) => (
  <StyledTextField className={className} style={style}>
    <StyledInput 
      placeholder="Find your favorite kicks..." 
      className={inputClassName}
      $placeholderClassName={placeholderClassName}
    />
    <TextField.Slot>
      <SearchIcon />
    </TextField.Slot>
  </StyledTextField>
);

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  inputClassName: PropTypes.string,
  placeholderClassName: PropTypes.string
};

export default SearchBar;
