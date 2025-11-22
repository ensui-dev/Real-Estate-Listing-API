import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';

const AdminRoute = () => {
  const { user, isAuthenticated, loading, isAdmin } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
