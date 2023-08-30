import PrivateRoute from '@components/PrivateRoute';
import PublicRoute from '@components/PublicRoute';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const CustomerPage = lazy(() => import('../pages/CustomerPage'));
const CustomerGroupPage = lazy(() => import('../pages/CustomerGroupPage'));
const PolicyPage = lazy(() => import('../pages/PolicyPage'));
const BranchPage = lazy(() => import('../pages/BranchPage'));
const RolePage = lazy(() => import('../pages/RolePage'));
const AddRolePage = lazy(() => import('../pages/RolePage/AddRolePage'));
const StaffPage = lazy(() => import('../pages/StaffPage/'));
const ServicesPage = lazy(() => import('../pages/ServicesPage/'));
const AddServicePage = lazy(() => import('../pages/ServicesPage/AddServicePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage/'));
const AddProductPage = lazy(() => import('../pages/ProductsPage/AddProductPage'));
const OrdersPage = lazy(() => import('../pages/OrderPage/'));
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

    // branch
    {
        path: '/branchs/',
        element: <PrivateRoute element={<BranchPage />} />,
    },

    // role
    {
        path: '/roles/',
        element: <PrivateRoute element={<RolePage />} />,
    },
    {
        path: '/roles/add',
        element: <PrivateRoute element={<AddRolePage />} />,
    },

    // staff
    {
        path: '/staffs',
        element: <PrivateRoute element={<StaffPage />} />,
    },

    // service
    {
        path: '/services',
        element: <PrivateRoute element={<ServicesPage />} />,
    },
    {
        path: '/services/add',
        element: <PrivateRoute element={<AddServicePage />} />,
    },

    // service
    {
        path: '/products',
        element: <PrivateRoute element={<ProductsPage />} />,
    },
    {
        path: '/products/add',
        element: <PrivateRoute element={<AddProductPage />} />,
    },

    // order
    {
        path: '/orders',
        element: <PrivateRoute element={<OrdersPage />} />,
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
