import ServicesList from '@features/Service/ServicesList';
import React from 'react';

const ServicesPage: React.FC = () => {
    console.log('ServicesPage');
    return (
        <div className="service-page">
            <ServicesList />
        </div>
    );
};

export default ServicesPage;
