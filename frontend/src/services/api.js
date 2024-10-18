import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllSneakers = async (page, limit, brands, sortOrder) => {
  try {
    const response = await axios.get(`${API_URL}/sneakers`, {
      params: { page, limit, brands, sortOrder }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sneakers:', error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/sneakers/brands`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};
