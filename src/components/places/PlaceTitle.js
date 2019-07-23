import React from 'react';

const PlaceTitle = ({ record }) => (
    <span>Edit {record ? 'Place' : ''}</span>
);

export default PlaceTitle;