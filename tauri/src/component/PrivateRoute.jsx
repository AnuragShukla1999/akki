import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Component to handle private routes
const PrivateRoute = ({ element, ...rest }) => {
  const userLoggedIn = localStorage.getItem('user');

  return (
    <Route
      {...rest}
      element={userLoggedIn ? element : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
