import React from 'react';

const ObjectTitle = ({ record, type }) => (
    <span>{type} {record ? 'Object' : ''}</span>
);

export default ObjectTitle;