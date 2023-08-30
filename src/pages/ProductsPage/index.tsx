import ProductList from '@features/Product/ProductList';
import React from 'react';

const ProductsPage: React.FC = () => {
    console.log('ProductsPage');
    return (
        <div className="service-page">
            <ProductList />
        </div>
    );
};

export default ProductsPage;
