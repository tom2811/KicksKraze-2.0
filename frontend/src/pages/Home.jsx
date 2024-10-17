import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Heading, Text, Button } from '@radix-ui/themes';

function Home() {
  return (
    <Container className="py-16 text-center">
      <Heading size="8" className="mb-4">Welcome to KicksKraze</Heading>
      <Text size="5" className="mb-8">Discover the latest and greatest sneakers in our collection.</Text>
      <Link to="/store">
        <Button size="3" variant="solid">
          Shop Now
        </Button>
      </Link>
    </Container>
  );
}

export default Home;
