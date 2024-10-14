import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

let token = null;

const setToken = (newToken) => {
  token = newToken;
  if (newToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default {
  setToken,
  login: (email, password) => api.post('/auth/login', { email, password }),
  getUser: () => api.get('/auth/user'),
  getItems: () => api.get('/items').then(res => res.data),
  createItem: (item) => api.post('/items', item),
};
