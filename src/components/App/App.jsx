import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from '../Form/Form';

import { ContactList } from '../ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { name: 'John', number: '452-69-23', id: nanoid() },
      { name: 'Ann', number: '563-45-76', id: nanoid() },
      { name: 'Michael', number: '742-96-83', id: nanoid() },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    parsedContacts && this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.contacts !== prevState.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleSubmit = (values, { resetForm }) => {
    // console.log('values:', values);
    // console.log('actions:', actions);
    const findDuplicateContact = this.state.contacts.find(item => {
      return item.name === values.name;
    });
    findDuplicateContact
      ? alert(`${values.name} is already in contacts.`)
      : this.setState(prevState => {
          return {
            contacts: [
              {
                name: values.name,
                number: values.number,
                id: nanoid(),
              },
              ...prevState.contacts,
            ],
          };
        });

    resetForm();
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  changeFilter = e => {
    return this.setState({ filter: e.currentTarget.value });
  };
  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normaliseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normaliseFilter)
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <AppContainer>
        <h1>Phonebook</h1>

        <Form handleSubmit={this.handleSubmit} />

        <h2>Contacts</h2>

        <Filter filter={filter} onChange={this.changeFilter} />

        <ContactList
          contacts={this.getFilteredContacts()}
          onDelete={this.deleteContact}
        />
      </AppContainer>
    );
  }
}
