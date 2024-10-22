import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Box className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <Flex align="center" gap="4" className="mb-3">
        <Icon className="text-cyan-600 text-2xl" />
        <Text weight="bold" size="5">{title}</Text>
      </Flex>
      <Text size="3" color="gray">
        {description}
      </Text>
    </Box>
  );
}

export default FeatureCard;