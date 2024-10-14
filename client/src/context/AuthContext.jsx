import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    // Implement your login logic here
    // For now, we'll just set a mock user
    setCurrentUser({ email });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (email, password) => {
    // Implement your registration logic here
    // For now, we'll just set a mock user
    setCurrentUser({ email });
  };

  const forgotPassword = (email) => {
    // Implement your forgot password logic here
    console.log(`Password reset email sent to ${email}`);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
