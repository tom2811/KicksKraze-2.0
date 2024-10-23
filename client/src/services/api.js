import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getAllSneakers = async (page, limit, brands, sortOrder, searchQuery = '') => {
  try {
    const response = await api.get('/sneakers', {
      params: { page, limit, brands, sortOrder, search: searchQuery }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sneakers:', error);
    throw error;
  }
};

export const getSneakerById = async (id) => {
  try {
    const response = await api.get(`/sneakers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchSneakers = async (term) => {
  try {
    const response = await api.get('/sneakers/search', {
      params: { term }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
