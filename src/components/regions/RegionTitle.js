import React from 'react';

const RegionTitle = ({ record, type }) => (
    <span>{type} {record ? 'Region' : ''}</span>
);

export default RegionTitle;