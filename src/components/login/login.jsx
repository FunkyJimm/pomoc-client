import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Helpers from '../../helpers/registration';

const Login = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="login-container">
      <h1>Logowanie użytkownika</h1>
      <Formik
        initialValues={{ name: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'You need to enter a name!';
          }
          if (!values.password) {
            errors.password = 'You need to enter a password!';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (Helpers.login(values)) {
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
            <button type="submit" disabled={isSubmitting}>
              Zaloguj
            </button>
          </Form>
        )}
      </Formik>
      {message}
    </div>
  )
}

export default Login;