import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slideStyles from './slide.module.css';
import { ContactsItem } from '../contactsItem/ContactsItem';
import styles from './ContactList.module.css';

export function ContactsList({ contacts, onRemoveContact }) {
  return (
    <TransitionGroup component="ul" className={styles.List}>
      {contacts.map(el => (
        <CSSTransition
          key={el.id}
          timeout={250}
          classNames={slideStyles}
          unmountOnExit
        >
          <ContactsItem
            key={el.id}
            contact={el}
            onRemoveContact={onRemoveContact}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
