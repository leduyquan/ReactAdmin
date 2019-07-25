import React from 'react';

const UserTitle = ({ record, type }) => (
    <span>{type} {record ? 'User' : ''}</span>
);

export default UserTitle;