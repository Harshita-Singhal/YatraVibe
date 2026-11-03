import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const DEMO_USER = {
  id: 'user-1',
  name: 'Ananya Desai',
  email: 'ananya@yatravibe.com',
  avatar: '👩‍🦰',
  level: 'Road Warrior',
  points: 7650,
  trips: 14,
  badges: 6,
  ecoScore: 78,
  joinedDate: '2023-08-15',
  location: 'Delhi, India',
  bio: 'Passionate traveler exploring every corner of incredible India 🇮🇳',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('yatravibe_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('yatravibe_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const loggedUser = { ...DEMO_USER, email };
        setUser(loggedUser);
        localStorage.setItem('yatravibe_user', JSON.stringify(loggedUser));
        localStorage.setItem('yatravibe_token', 'demo-jwt-token');
        resolve(loggedUser);
      }, 800);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...DEMO_USER, name, email, points: 0, trips: 0, badges: 0 };
        setUser(newUser);
        localStorage.setItem('yatravibe_user', JSON.stringify(newUser));
        localStorage.setItem('yatravibe_token', 'demo-jwt-token');
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yatravibe_user');
    localStorage.removeItem('yatravibe_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
