import CustomerList from '@features/Customer/CustomerList';
import CustomerGroupList from '@features/GroupCustomer/CustomerGroupList';
import React from 'react';

const CustomerGroupPage: React.FC = () => {
    return (
        <div className="customer-group-page">
            <CustomerGroupList />
        </div>
    );
};

export default CustomerGroupPage;
