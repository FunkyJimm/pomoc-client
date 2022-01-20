import { Formik, Form, Field, ErrorMessage } from "formik";

import Helpers from '../../helpers/registration';

const Registration = () => {
  return (
    <div className="registration-container">
      <h1>Rejestracja użytkownika</h1>
      <Formik
        initialValues={{ name: '', password: '', email: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required!';
          } else if (
            values.name.length < 2 || values.name.length > 16
          ) {
            errors.name = 'Name must be greater than 2 chars and not be greater than 16!';
          }
          if (!values.password) {
            errors.password = 'Password is required!';
          } else if (
            values.password.length < 6 || values.password.length > 32
          ) {
            errors.password = 'Password must be greater than 6 chars and not be greater than 32!';
          }
          if (!values.email) {
            errors.email = 'Email is required!';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address!';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (Helpers.registration(values)) {
              console.log('OK!');
            };
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Zatwierdź
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Registration;