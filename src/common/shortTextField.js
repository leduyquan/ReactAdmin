import React from 'react';
import PropTypes from 'prop-types';

const ShortTextField = ({ source, record = {}, length }) => {
  const text = record[source];
  if (text.length > length) return <span>{text.slice(0, length)}...</span>
  return <span>{record[source]}</span>
};

ShortTextField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default ShortTextField;