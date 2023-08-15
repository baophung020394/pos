import CustomerList from '@features/Customer/CustomerList';
import React from 'react';

const CustomerPage: React.FC = () => {
    return (
        <div className="customer-page">
            <CustomerList />
        </div>
    );
};

export default CustomerPage;
