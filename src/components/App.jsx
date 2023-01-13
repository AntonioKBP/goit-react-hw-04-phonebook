import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import {
  Main,
  MainTitle,
  SecondartTitle,
} from './TitleAndMainStyled/TitleAndMainStyled.styled';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addUser = data => {
    const findExistsName = this.state.contacts.some(
      contact => contact.name === data.name
    );
    if (findExistsName) {
      Notify.warning(`${data.name} is already in contacts`);
      return;
    } else {
      const newAbonent = {
        id: nanoid(),
        ...data,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newAbonent],
      }));
    }
  };

  handleSearch = e => {
    this.setState({ filter: e.target.value });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactId),
    }));
    return;
  };

  render() {
    const contactsLenght = this.state.contacts.length;
    // console.log(contactsLenght);
    const { contacts, filter } = this.state;
    const newUsers = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    // console.log(newUsers);

    return (
      <Main>
        <MainTitle>PhoneBook</MainTitle>
        <ContactForm onSubmit={this.addUser} />

        <SecondartTitle>Contacts</SecondartTitle>
        <Filter filterValue={filter} onSearch={this.handleSearch} />
        {contactsLenght > 0 && (
          <ContactList
            users={newUsers}
            onDeleteContact={this.handleDeleteContact}
          />
        )}
      </Main>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.number.isRequired,
      number: PropTypes.number,
    })
  ),
  filter: PropTypes.string,
};
