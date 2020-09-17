import React from 'react';
import PropTypes from 'prop-types';
import { CustomInput } from '../customInput/CustomInput';
import styles from './Filter.module.css';

export function Filter({ value, onChangeFilter }) {
  const handleChange = event => onChangeFilter(event.target.value);
  return (
    <div className={styles.FilterWrap}>
      <label className={styles.Label}>
        Find contacts by name
        <CustomInput type="search" value={value} handleChange={handleChange} />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
