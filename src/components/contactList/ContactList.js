import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ContactsItem } from '../contactsItem/ContactsItem';
import slideStyles from './slide.module.css';
import staticStyles from '../staticElements.module.css';
import styles from './ContactList.module.css';

export function ContactsList({ contacts, onRemoveContact, isMounted }) {
  return (
    <TransitionGroup component="ul" className={styles.List}>
      {contacts.map(el => (
        <CSSTransition
          appear={isMounted}
          in={isMounted || contacts.length > 0}
          key={el.id}
          timeout={250}
          classNames={isMounted ? staticStyles : slideStyles}
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
