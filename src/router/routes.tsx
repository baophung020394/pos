import PrivateRoute from '@components/PrivateRoute';
import PublicRoute from '@components/PublicRoute';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const CustomerPage = lazy(() => import('../pages/CustomerPage'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <PrivateRoute element={<CustomerPage />} />,
    },

    //Authentication

    {
        path: '/auth/cover-login',
        element: <PublicRoute element={<LoginCover />} />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <PrivateRoute element={<Index />} />,
    },
];

export { routes };
