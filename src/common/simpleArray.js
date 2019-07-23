import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = {
    chip: { margin: 4 },
};

export const ChipField = ({
    className,
    classes = {},
    source,
    record = {},
    ...rest
}) => {
  console.log('fda', get(record, source))
  const mapping = get(record, source);
    return (
      
        <Chip
            className={classnames(classes.chip, className)}
            label={source !== null && source !== undefined ? mapping.map(x => <li>{x}</li>) : ''}

        />
    );
};

ChipField.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    elStyle: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string,
    record: PropTypes.object,
};

const PureChipField = withStyles(styles)(pure(ChipField));

export default PureChipField;