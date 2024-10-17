import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@radix-ui/themes';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ className, style, inputClassName, placeholderClassName }) => (
  <TextField.Root className={`w-full ${className}`}>
    {/* Search Input */}
    <TextField.Input 
      placeholder="Find your favorite kicks..." 
      className={`pr-10 py-2 font-normal font-sans ${inputClassName}`}
      style={{ 
        paddingLeft: '0.5rem',
        borderRadius: '0.5rem',
        ...style
      }}
    />
    
    {/* Search Icon */}
    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
    
    {/* Placeholder Styling */}
    <style jsx>{`
      ::placeholder {
        font-size: inherit;
        ${placeholderClassName}
      }
    `}</style>
  </TextField.Root>
);

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  inputClassName: PropTypes.string,
  placeholderClassName: PropTypes.string
};

export default SearchBar;
