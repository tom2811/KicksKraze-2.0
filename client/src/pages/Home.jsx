import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Text, Flex, Box, Grid } from '@radix-ui/themes';
import { FancyButton, ShimmeringHeading } from '../components/StyledComponents';
import FeatureCard from '../components/feature/FeatureCard';
import { featureCards } from '../data/featureCardsData';

function Home() {
  return (
    <Container className="min-h-[calc(100vh-128px)] flex flex-col px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <Box className="max-w-5xl mx-auto w-full flex-grow flex flex-col">
        {/* Header */}
        <ShimmeringHeading size="8" className="text-center mb-12 mt-4">
          Welcome to KicksKraze
        </ShimmeringHeading>
        
        <Box className="flex-grow flex flex-col justify-between">
          {/* Subheader */}
          <Text size="5" className="text-gray-600 leading-relaxed text-center mb-8">
            Discover and buy authentic sneakers on the ultimate marketplace for sneaker enthusiasts.
          </Text>

          {/* Shop Now Button */}
          <Flex justify="center" className="mb-16">
            <Link to="/store" className="inline-block">
              <FancyButton className="text-sm md:text-xs lg:text-sm xl:text-base px-4 py-2 rounded-full">
                Shop Now
              </FancyButton>
            </Link>
          </Flex>

          {/* Feature Cards */}
          <Grid columns={{ initial: "1", md: "2" }} gap="6" className="mb-16">
            {featureCards.map((card, index) => (
              <FeatureCard 
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
