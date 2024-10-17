import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@radix-ui/themes';
import { FaSearch } from 'react-icons/fa';

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

export default SearchBar;
