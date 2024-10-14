import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await api.getUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  const login = async (email, password) => {
    const { token, user } = await api.login(email, password);
    localStorage.setItem('token', token);
    api.setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}