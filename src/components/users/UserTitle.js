import React from 'react';

const UserTitle = ({ record }) => (
    <span>Edit {record ? `"${record.name}"` : ''}</span>
);

export default UserTitle;