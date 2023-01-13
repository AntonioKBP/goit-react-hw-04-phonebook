import { Component } from 'react';

import {
  Form,
  FormBlock,
  Label,
  FormLabelName,
  Input,
  FormBtn,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { number, name } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormBlock>
            <Label htmlFor="name">
              <FormLabelName>Name</FormLabelName>
              <Input
                value={name}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={this.handleChange}
                placeholder="Enter Name"
              />
            </Label>
            <Label>
              <FormLabelName>Number</FormLabelName>
              <Input
                value={number}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={this.handleChange}
                placeholder="Enter Phone Number"
              />
            </Label>
          </FormBlock>
          <FormBtn type="submit">Add contact</FormBtn>
        </Form>
      </>
    );
  }
}
