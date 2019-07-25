import React from 'react';

const PlaceTitle = ({ record, type }) => (
    <span>{type} {record ? 'Place' : ''}</span>
);

export default PlaceTitle;