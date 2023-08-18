import PrivateRoute from '@components/PrivateRoute';
import PublicRoute from '@components/PublicRoute';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const CustomerPage = lazy(() => import('../pages/CustomerPage'));
const CustomerGroupPage = lazy(() => import('../pages/CustomerGroupPage'));
const PolicyPage = lazy(() => import('../pages/PolicyPage'));
const Customer = lazy(() => import('../features/Customer/Customer'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));

const routes = [
    // customer
    {
        path: '/customers',
        element: <PrivateRoute element={<CustomerPage />} />,
    },
    {
        path: '/customers/:id',
        element: <PrivateRoute element={<Customer />} />,
    },
    {
        path: '/customers-group/',
        element: <PrivateRoute element={<CustomerGroupPage />} />,
    },

    // policy
    {
        path: '/policies/',
        element: <PrivateRoute element={<PolicyPage />} />,
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
        element: <PrivateRoute element={<CustomerPage />} />,
    },
];

export { routes };
