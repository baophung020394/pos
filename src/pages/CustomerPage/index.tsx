import CustomerList from '@features/Customer/CustomerList';
import React from 'react';

const CustomerPage: React.FC = () => {
    console.log('CustomerPage');
    return (
        <div className="customer-page">
            <CustomerList />
        </div>
    );
};

export default CustomerPage;
