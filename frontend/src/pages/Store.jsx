import React, { useState, useEffect, useCallback } from 'react';
import { getAllSneakers, getBrands } from '../services/api';
import SneakerCard from '../components/SneakerCard';
import { Container, Heading, Flex, Box, Checkbox, Text, Grid, Button, Select, Badge } from '@radix-ui/themes';
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';

// Styled component for the filter menu
const FilterMenu = styled.div`
  @media (max-width: 767px) {
    max-height: ${props => props.isOpen ? '300px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    padding-left: 1rem;
  }
`;

function Store() {
  const [sneakers, setSneakers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [totalSneakers, setTotalSneakers] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const itemsPerPage = 12;

  // Fetch sneakers based on current page, selected brands, and sort order
  const fetchSneakers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllSneakers(currentPage, itemsPerPage, selectedBrands.join(','), sortOrder);
      setSneakers(data.sneakers);
      setTotalPages(data.totalPages);
      setTotalSneakers(data.totalSneakers);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch sneakers. Please try again later.');
      setLoading(false);
    }
  }, [currentPage, selectedBrands, sortOrder]);

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData.brands);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      }
    };
    fetchBrands();
  }, []);

  // Fetch sneakers when dependencies change
  useEffect(() => {
    fetchSneakers();
  }, [fetchSneakers]);

  // Handle brand selection
  const handleBrandChange = (brand) => {
    if (brand === 'All Items') {
      setSelectedBrands([]);
    } else {
      setSelectedBrands(prev => 
        prev.includes(brand) 
          ? prev.filter(b => b !== brand)
          : [...prev, brand]
      );
    }
    setCurrentPage(1);
  };

  // Handle adding item to cart (placeholder)
  const handleAddToCart = (sneaker) => {
    console.log('Added to cart:', sneaker);
  };

  // Handle sort order change
  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Toggle filter menu on mobile
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // Calculate total sneakers count
  const sneakersCount = totalSneakers;

  // Loading and error states
  if (loading) return <Container className="py-16 text-center">Loading...</Container>;
  if (error) return <Container className="py-16 text-center text-red-600">{error}</Container>;

  return (
    <Container className="py-4 px-2 md:py-6 md:px-3">
      <Flex direction="column" className="md:flex-row md:gap-2 lg:gap-4">
        {/* Filter Section */}
        <Box className="w-full md:w-1/4 lg:w-2/12 mb-4 md:mb-0">
          {/* Mobile Filter Header */}
          <Flex justify="center" align="center" className="sm:hidden pb-2">
            <Flex align="center" className="relative">
              <Heading size="1" className="text-gray-600 mr-3">Filter Items</Heading>
              <Button 
                variant="ghost" 
                onClick={toggleFilter}
                className="p-0 text-cyan-500"
              >
                <FaChevronDown className={`transition-transform duration-300 ${isFilterOpen ? 'transform rotate-180' : ''}`} />
              </Button>
            </Flex>
          </Flex>
          {/* Desktop Filter Header */}
          <Heading size={{ initial: '1', sm: '2', lg: '3' }} mb="2" mt="1" className="text-gray-600 hidden sm:block">Filter Items</Heading>
          {/* Filter Menu */}
          <FilterMenu isOpen={isFilterOpen}>
            <Flex direction="column" gap="1" className="sm:pl-0">
              {/* All Items Checkbox */}
              <Flex align="center" className="cursor-pointer hover:bg-gray-100 rounded-md p-1">
                <Checkbox 
                  checked={selectedBrands.length === 0}
                  onCheckedChange={() => handleBrandChange('All Items')}
                  color="cyan"
                  size="1"
                />
                <Text ml="2" size={{ initial: '1', lg: '2' }} className="sm:text-xs lg:text-sm">All Items</Text>
              </Flex>
              {/* Brand Checkboxes */}
              {brands.map(brand => (
                <Flex key={brand} align="center" className="cursor-pointer hover:bg-gray-100 rounded-md p-1">
                  <Checkbox 
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                    color="cyan"
                    size="1"
                  />
                  <Text ml="2" size={{ initial: '1', lg: '2' }} className="sm:text-xs lg:text-sm">{brand}</Text>
                </Flex>
              ))}
            </Flex>
          </FilterMenu>
        </Box>

        {/* Main Content Section */}
        <Box className="w-full md:w-3/4 lg:w-10/12">
          {/* Header with total count, selected brands, and sort */}
          <Flex justify="between" align="center" mb="2" wrap="wrap" gap="2">
            {/* Total sneakers count */}
            <Text size={{ initial: '1', lg: '2' }} className="text-gray-600 md:text-xs lg:text-sm">
              Total sneakers found: {sneakersCount}
            </Text>
            {/* Selected brands badges (hidden on mobile) */}
            <Flex gap="1" align="center" wrap="wrap" className="max-w-full hidden md:flex">
              {selectedBrands.slice(0, 3).map(brand => (
                <Badge key={brand} variant="soft" radius="full" color="cyan" size="1" className="md:text-xs lg:text-sm">
                  {brand}
                </Badge>
              ))}
              {selectedBrands.length > 3 && (
                <Badge variant="soft" radius="full" color="cyan" size="1" className="md:text-xs lg:text-sm">
                  +{selectedBrands.length - 3} more
                </Badge>
              )}
            </Flex>
            {/* Sort dropdown */}
            <Select.Root value={sortOrder} onValueChange={handleSortChange}>
              <Select.Trigger 
                color="cyan" 
                className="cursor-pointer text-xs sm:text-xs md:text-xs lg:text-sm" 
                size={{ initial: '2', md: '1' }}
              />
              <Select.Content 
                color="cyan" 
                className="text-xs sm:text-xs md:text-xs lg:text-sm"
              >
                <Select.Item value="default" className="cursor-pointer">Sort: Featured</Select.Item>
                <Select.Item value="highToLow" className="cursor-pointer">Price: High to Low</Select.Item>
                <Select.Item value="lowToHigh" className="cursor-pointer">Price: Low to High</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

          {/* Sneaker Grid */}
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap={{ initial: '2', md: '3', lg: '4' }}>
            {sneakers.map((sneaker) => (
              <SneakerCard 
                key={sneaker.id} 
                sneaker={sneaker} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </Grid>

          {/* Pagination */}
          <Flex justify="center" mt="5">
            <Flex align="center" gap="2">
              <Button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="soft"
                color="cyan"
                size="1"
                className="cursor-pointer md:text-xs lg:text-sm"
              >
                <FaChevronLeft />
              </Button>
              <Text size="1" className="text-gray-600 md:text-xs lg:text-sm">Page {currentPage} of {totalPages}</Text>
              <Button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="soft"
                color="cyan"
                size="1"
                className="cursor-pointer md:text-xs lg:text-sm"
              >
                <FaChevronRight />
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}

export default Store;
