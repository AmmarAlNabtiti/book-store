import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuth } from '../utils/isAuth';

const ProtectedRoute = ({ element: Component }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await isAuth();
      setAuth(isAuthenticated);
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
