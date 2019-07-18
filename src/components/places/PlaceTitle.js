/* eslint react/jsx-key: off */
import React from 'react';

const PlaceTitle = ({ record }) => (
    <span>Edit {record ? `"${record.name}"` : ''}</span>
);

export default PlaceTitle;
