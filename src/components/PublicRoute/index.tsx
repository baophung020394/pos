import { IRootState } from '@store/index';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
    element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
    const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

    const location = useLocation();

    return !isAuthenticated ? element : <Navigate to="/customers" state={{ from: location }} replace />;
};

export default PublicRoute;
