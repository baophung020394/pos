import { setUser } from '@store/authSlice';
import { IRootState } from '@store/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement; // element thay cho component
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
    const location = useLocation();
    return isAuthenticated ? element : <Navigate to="/auth/cover-login" state={{ from: location }} replace />;
};

export default PrivateRoute;
