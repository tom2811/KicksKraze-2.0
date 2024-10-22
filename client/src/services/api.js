import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAllSneakers = async (page, limit, brands, sortOrder, searchQuery = '') => {
  try {
    const response = await axios.get(`${API_URL}/sneakers`, {
      params: { page, limit, brands, sortOrder, search: searchQuery }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSneakerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sneakers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchSneakers = async (term) => {
  try {
    const response = await axios.get(`${API_URL}/sneakers/search`, {
      params: { term }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
