import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';

const AuthGuard = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return user ? children : <Navigate to="/login" />;
};

export default AuthGuard;