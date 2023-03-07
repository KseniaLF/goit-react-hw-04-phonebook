import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from '../Form/Form';

import { ContactList } from '../ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppContainer } from './App.styled';

const initialContacts = [
  { name: 'John', number: '452-69-23', id: nanoid() },
  { name: 'Ann', number: '563-45-76', id: nanoid() },
  { name: 'Michael', number: '742-96-83', id: nanoid() },
];

const getInitialContacts = () => {
  const contacts = localStorage.getItem('contacts');

  if (contacts) {
    return JSON.parse(contacts);
  }
  return initialContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    // console.log('values:', values);
    // console.log('actions:', actions);

    const findDuplicateContact = contacts.find(item => {
      return item.name === values.name;
    });

    findDuplicateContact
      ? alert(`${values.name} is already in contacts.`)
      : setContacts(prevState => [
          {
            name: values.name,
            number: values.number,
            id: nanoid(),
          },
          ...prevState,
        ]);

    resetForm();
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const getFilteredContacts = () => {
    const normaliseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normaliseFilter)
    );
  };

  return (
    <AppContainer>
      <h1>Phonebook</h1>

      <Form handleSubmit={handleSubmit} />

      <h2>Contacts</h2>

      <Filter filter={filter} onChange={changeFilter} />

      <ContactList contacts={getFilteredContacts()} onDelete={deleteContact} />
    </AppContainer>
  );
};
