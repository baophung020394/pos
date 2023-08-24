import OrderList from '@features/Order/OrderList';
import React from 'react';

const OrderPage: React.FC = () => {
    console.log('OrderPage');
    return (
        <div className="order-page">
            <OrderList />
        </div>
    );
};

export default OrderPage;
