import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ContactForm } from './contactForm/ContactForm';
import { ContactsList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import { Logo } from './logo/Logo';
import { Container } from './container/Container';
import { Notification } from './notification/Notification';
import slideNotiAppear from './notification/slide.module.css';
import slideLogoAppear from './slideAppear.module.css';
import popFilterStyles from './filter/pop.module.css';
import staticElements from './staticElements.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
    error: false,
    isMountedfilter: false,
    isMounted: false,
  };

  componentDidMount() {
    const contactsInLS = localStorage.getItem('contacts');
    if (contactsInLS) {
      const savedContactsInLS = JSON.parse(contactsInLS);
      this.setState({
        contacts: savedContactsInLS,
      });
      this.setState({
        isMounted: true,
      });
      if (savedContactsInLS.length > 1) {
        this.setState({
          isMountedfilter: true,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      this.setState({
        isMounted: false,
        isMountedfilter: false,
      });
    }
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  addContact = newContact => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      this.setState({ error: true });
      setTimeout(() => {
        this.setState({ error: false });
      }, 2500);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      });
    }
  };

  onChangeFilter = filter => {
    this.setState({ filter });
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const contacts = this.state.contacts;
    const filter = this.state.filter;
    const isMounted = this.state.isMounted;
    const isMountedfilter = this.state.isMountedfilter;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );
    return (
      <>
        <Container>
          <CSSTransition
            in
            appear
            timeout={500}
            classNames={slideLogoAppear}
            unmountOnExit
          >
            <Logo />
          </CSSTransition>

          <ContactForm onAddContact={this.addContact}></ContactForm>

          <CSSTransition
            in={isMountedfilter || contacts.length > 1}
            appear={isMountedfilter}
            timeout={250}
            classNames={isMountedfilter ? staticElements : popFilterStyles}
            unmountOnExit
          >
            <Filter value={filter} onChangeFilter={this.onChangeFilter} />
          </CSSTransition>

          {contacts.length < 1 && <p>You have no contacts yet</p>}

          <ContactsList
            contacts={filteredContacts}
            onRemoveContact={this.removeContact}
            isMounted={isMounted}
          ></ContactsList>
          <CSSTransition
            in={this.state.error}
            timeout={250}
            classNames={slideNotiAppear}
            unmountOnExit
          >
            <Notification />
          </CSSTransition>
        </Container>
      </>
    );
  }
}
