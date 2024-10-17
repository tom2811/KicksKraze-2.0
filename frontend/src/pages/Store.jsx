import React, { useState, useEffect } from 'react';
import { getAllSneakers, getBrands } from '../utils/api';
import SneakerCard from '../components/SneakerCard';
import { Container, Heading, Flex, Box, Button, Grid } from '@radix-ui/themes';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Store() {
  const [sneakers, setSneakers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState('');

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        setLoading(true);
        const data = await getAllSneakers(currentPage, itemsPerPage, selectedBrand);
        setSneakers(data.sneakers);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sneakers. Please try again later.');
        setLoading(false);
      }
    };
    fetchSneakers();
  }, [currentPage, selectedBrand]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
  };

  const handleAddToCart = (sneaker) => {
    // Implement add to cart functionality
    console.log('Added to cart:', sneaker);
  };

  if (loading) return <Container className="py-16 text-center">Loading...</Container>;
  if (error) return <Container className="py-16 text-center text-red-600">{error}</Container>;

  return (
    <Container className="py-8">
      <Flex direction={{ initial: 'column', md: 'row' }}>
        <Box className="w-full md:w-1/4 pr-0 md:pr-6 mb-6 md:mb-0">
          <Flex direction="row" gap="2" className="flex-wrap md:flex-col">
            <Button 
              onClick={() => handleBrandChange('')}
              variant={selectedBrand === '' ? 'solid' : 'outline'}
            >
              All Items
            </Button>
            {brands.map((brand) => (
              <Button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                variant={selectedBrand === brand ? 'solid' : 'outline'}
              >
                {brand || 'Unknown'}
              </Button>
            ))}
          </Flex>
        </Box>
        <Box className="w-full md:w-3/4">
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
            {sneakers.map((sneaker) => (
              <SneakerCard 
                key={sneaker.id} 
                sneaker={sneaker} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </Grid>
          <Flex justify="center" align="center" gap="2" className="mt-8 flex-wrap">
            <Button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              <FaChevronLeft />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                variant={currentPage === i + 1 ? 'solid' : 'outline'}
              >
                {i + 1}
              </Button>
            ))}
            <Button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              <FaChevronRight />
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}

export default Store;
