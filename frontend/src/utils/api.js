import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllSneakers = async (page = 1, limit = 12, brand = '') => {
  try {
    const response = await axios.get(`${API_URL}/sneakers`, {
      params: { page, limit, brand }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sneakers:', error);
    throw error;
  }
};

export const getSneakerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sneakers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sneaker:', error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/sneakers/brands`);
    console.log('Brands response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};