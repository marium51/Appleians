
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'customer';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole
  },
  {
    id: 2,
    name: 'Customer',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer' as UserRole
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user with matching credentials
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password && (!role || u.role === role)
      );
      
      if (foundUser) {
        // Remove password before storing user
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setIsLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
