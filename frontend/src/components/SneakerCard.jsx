import React from 'react';
import { Card, Flex, Box, Text, Button } from '@radix-ui/themes';
import { useAuth } from '../contexts/AuthContext';

function SneakerCard({ sneaker, onAddToCart }) {
  const { currentUser } = useAuth();

  return (
    <Card className="overflow-hidden shadow-sm">
      <Box className="relative pb-[100%] bg-white">
        <img 
          src={sneaker.imgUrl} 
          alt={sneaker.name} 
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </Box>
      <Box className="p-4 bg-white">
        <Flex direction="column" gap="2">
          <Text size="1" weight="bold" className="text-gray-500 uppercase tracking-wide">{sneaker.brand}</Text>
          <Text as="h3" size="3" weight="bold" className="line-clamp-2">{sneaker.name}</Text>
          <Text size="2" className="text-gray-600">{sneaker.colorway}</Text>
          <Text size="5" weight="bold" className="text-blue-600">${sneaker.price}</Text>
          <Button 
            onClick={() => onAddToCart(sneaker)} 
            size="3"
            className="mt-2 w-full"
            disabled={!currentUser}
          >
            {currentUser ? 'Add to Cart' : 'Login to Purchase'}
          </Button>
        </Flex>
      </Box>
    </Card>
  );
}

export default SneakerCard;
