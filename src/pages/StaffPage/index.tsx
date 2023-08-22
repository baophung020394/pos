import RoleList from '@features/Role/RoleList';
import StaffList from '@features/Staff/StaffList';
import React from 'react';

const StaffPage: React.FC = () => {
    return (
        <div className="staff-page">
            <StaffList />
        </div>
    );
};

export default StaffPage;
