import React from 'react';

const UserTitle = ({ record }) => (
    <span>Edit {record ? 'User' : ''}</span>
);

export default UserTitle;