import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { object, string } from 'yup';

import { FormikForm, Input, Errorform } from './Form.styled';

const initialValues = {
  name: '',
  number: '+',
};

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
let Schema = object({
  name: string().max(20).required('Enter a name'),
  number: string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Enter a number'),
});

export const Form = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <label htmlFor="name">
          <p>Name</p>
          <Input id="name" name="name" type="text" />
          <Errorform name="name" component="div" />
        </label>

        <label htmlFor="number">
          <p>Phone</p>
          <Input
            id="number"
            name="number"
            type="tel"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <Errorform name="number" component="div" />
        </label>

        <button type="submit">Add contact</button>
      </FormikForm>
    </Formik>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
