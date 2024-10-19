import React, { useState } from 'react';
import { Card, Flex, Box, Text, Button, Select, Tooltip, AspectRatio } from '@radix-ui/themes';
import { useAuth } from '../contexts/AuthContext';

function SneakerCard({ sneaker, onAddToCart }) {
  const { currentUser } = useAuth();
  const [selectedSize, setSelectedSize] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  // Generate sizes from US 4 to US 15
  const availableSizes = Array.from({ length: 12 }, (_, i) => i + 4);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({ ...sneaker, size: selectedSize });
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm">
      {/* Sneaker Image */}
      <AspectRatio ratio={4/3} className="mb-2">
        <img 
          src={sneaker.imgUrl} 
          alt={sneaker.name} 
          className="object-cover w-[70%] h-[70%] sm:w-3/4 sm:h-3/4 lg:w-3/4 lg:h-3/4 mx-auto"
        />
      </AspectRatio>

      {/* Sneaker Details */}
      <Box className="p-2 md:p-3 bg-white">
        <Flex direction="column" gap="1">
          {/* Brand */}
          <Text 
            size={{ initial: '1', lg: '2' }} 
            weight="bold" 
            className="text-gray-500 uppercase tracking-wide truncate"
          >
            {sneaker.brand}
          </Text>

          {/* Sneaker Name */}
          <Text 
            as="h3" 
            size={{ initial: '2', lg: '3' }} 
            weight="bold" 
            className="truncate" 
            title={sneaker.name}
          >
            {sneaker.name}
          </Text>

          {/* Colorway */}
          <Text 
            size={{ initial: '1', lg: '2' }} 
            className="text-gray-600 truncate" 
            title={sneaker.colorway}
          >
            {sneaker.colorway}
          </Text>

          {/* Price */}
          <Text size={{ initial: '3', lg: '4' }} weight="bold" className="text-cyan-700">
            ${sneaker.price}
          </Text>

          {/* Add to Cart Section */}
          {currentUser ? (
            <Flex gap="2" align="center">
              {/* Size Selector */}
              <Select.Root value={selectedSize} onValueChange={setSelectedSize}>
                <Select.Trigger placeholder="Size" color="cyan" className="cursor-pointer" size="1" />
                <Select.Content color="cyan">
                  {availableSizes.map(size => (
                    <Select.Item key={size} value={size.toString()} className="cursor-pointer">
                      US {size}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              {/* Add to Cart Button */}
              <Tooltip content="Please select a size first" open={showTooltip}>
                <Button 
                  onClick={handleAddToCart} 
                  size="2"
                  className="flex-grow truncate cursor-pointer"
                  variant="outline"
                  color="cyan"
                >
                  Add to Cart
                </Button>
              </Tooltip>
            </Flex>
          ) : (
            // Login to Purchase Button (for non-logged in users)
            <Button 
              size="2"
              className="mt-2 w-full cursor-pointer"
              disabled={!currentUser}
            >
              Login to Purchase
            </Button>
          )}
        </Flex>
      </Box>
    </Card>
  );
}

export default SneakerCard;
