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

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
    error: false,
  };

  componentDidMount() {
    const savedContactsInLS = localStorage.getItem('contacts');
    if (savedContactsInLS) {
      this.setState({
        contacts: JSON.parse(savedContactsInLS),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
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
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );
    return (
      <>
        <Container>
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames={slideLogoAppear}
            unmountOnExit
          >
            <Logo />
          </CSSTransition>

          <ContactForm onAddContact={this.addContact}></ContactForm>

          <CSSTransition
            in={contacts.length > 1}
            timeout={250}
            classNames={popFilterStyles}
            unmountOnExit
          >
            <Filter value={filter} onChangeFilter={this.onChangeFilter} />
          </CSSTransition>

          {contacts.length < 1 && <p>You have no contacts yet</p>}

          <ContactsList
            contacts={filteredContacts}
            onRemoveContact={this.removeContact}
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
