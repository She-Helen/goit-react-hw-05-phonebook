import React from 'react';
import PropTypes from 'prop-types';
import { ButtonAdd } from '../buttons/ButtonAdd';
import { CustomInput } from '../customInput/CustomInput';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    const contact = {
      name: this.state.name,
      number: this.state.number,
      id: uuidv4(),
    };
    this.props.onAddContact(contact);
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmitForm} className={styles.form}>
          <CustomInput
            label="name"
            name="name"
            type="text"
            value={this.state.name}
            handleChange={this.handleChange}
            required
          />
          <CustomInput
            label="number"
            name="number"
            type="text"
            value={this.state.number}
            handleChange={this.handleChange}
            required
          />

          <ButtonAdd type="submit">Add contact</ButtonAdd>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
