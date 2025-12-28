import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('neighbourAidUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, this would call an API
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      location: 'Downtown Area',
      joinDate: '2024-01-15',
      verified: true,
      rating: 4.8,
      completedRequests: 12,
      helpedNeighbors: 8,
      avatar: null
    };
    
    setUser(mockUser);
    localStorage.setItem('neighbourAidUser', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const register = (userData) => {
    // Mock registration
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      joinDate: new Date().toISOString().split('T')[0],
      verified: false,
      rating: 0,
      completedRequests: 0,
      helpedNeighbors: 0,
      avatar: null
    };
    
    setUser(newUser);
    localStorage.setItem('neighbourAidUser', JSON.stringify(newUser));
    return Promise.resolve(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('neighbourAidUser');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('neighbourAidUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};