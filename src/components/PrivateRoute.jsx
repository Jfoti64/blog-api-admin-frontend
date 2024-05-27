import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('token');
};

const isAdmin = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin ? JSON.parse(isAdmin) : false;
};

const PrivateRoute = ({ component: Component, adminOnly }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Component />;
};

// Add prop validation
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  adminOnly: PropTypes.bool,
};

export default PrivateRoute;
