import React from 'react';

const ObjectTitle = ({ record }) => (
    <span>Edit {record ? "Object" : ''}</span>
);

export default ObjectTitle;