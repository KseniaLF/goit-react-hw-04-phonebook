import PropTypes from 'prop-types';

import { ContactContainer, DeteleBtn } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ContactContainer>
      <ul>
        {contacts.map(({ name, number, id }) => (
          <li key={id}>
            {name}: {number}
            <DeteleBtn onClick={() => onDelete(id)}>Delete</DeteleBtn>
          </li>
        ))}
      </ul>
    </ContactContainer>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
