import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllSneakers = async () => {
  try {
    const response = await axios.get(`${API_URL}/sneakers`);
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
