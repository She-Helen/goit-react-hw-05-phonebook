import React from 'react';
import PropTypes from 'prop-types';

import { ButtonRemove } from '../buttons/ButtonRemove';

import styles from './ContactsItem.module.css';

export function ContactsItem({
  contact: { name, number, id },
  onRemoveContact,
}) {
  const handleClick = e => onRemoveContact(e.currentTarget.dataset.id);

  return (
    <li className={styles.ListItem}>
      <span className={styles.Text}>{name}: </span>
      <span className={styles.Number}>{number}</span>
      <ButtonRemove type="button" id={id} onClick={handleClick} />
    </li>
  );
}

ContactsItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
