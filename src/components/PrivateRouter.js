import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(UserContext);

  return user.isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
