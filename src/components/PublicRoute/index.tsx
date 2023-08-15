import { IRootState } from '@store/index';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
    element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
    const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

    const location = useLocation();

    console.log('isAuthenticated', isAuthenticated);
    return !isAuthenticated ? element : <Navigate to="/" state={{ from: location }} replace />;
};

export default PublicRoute;
