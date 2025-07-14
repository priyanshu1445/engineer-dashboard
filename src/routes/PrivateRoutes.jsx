import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // or use context/session logic
  return isLoggedIn ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
