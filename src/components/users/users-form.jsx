import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Alert, Form, Button } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

import './users-form.scss';

const Users = () => {
  let { id } = useParams();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      Helpers.getItemDetails('users', id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, []);

  let initialData = { 
    name: '',
    password: '',
    email: ''
  };

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialData = { ...data };
    }
    
    return (
      <div className="users__container-form">
        { !id ? <h1>Dodaj nowego użytkownika</h1> : <h1>Edytuj użytkownika</h1> }
        <Formik
          initialValues={initialData}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Nazwa jest wymagana!';
            } else if (values.name.length < 2) {
              errors.name = 'Nazwa jest za krótka!';
            } else if (values.name.length > 16) {
              errors.name = 'Nazwa jest za długa!';
            }
            if (!values.password) {
              errors.password = 'Hasło jest wymagane!';
            } else if (values.password.length < 6) {
              errors.password = 'Hasło jest za krótkie!';
            } else if (values.password.length > 16) {
              errors.password = 'Hasło jest za długie!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!id) {
              Helpers.addItem('users', values, setMessage, setErrMessage);
            } else {
              Helpers.updateItem('users', id, values, setMessage, setErrMessage);
            }
            if (!errMessage) {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nazwa użytkownika"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hasło:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Podaj hasło"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Podaj adres email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </Form.Group>
              <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zatwierdź</Button>
            </Form>
          )}
        </Formik>
  
        { message && <Alert variant="success">{message}</Alert> }
        { errMessage && <Alert variant="danger">{errMessage}</Alert> }
      </div>
    )
  } else {
    return (
      <p>{ errMessage ? errMessage : 'Wczytywanie...' }</p>
    )
  }
}

export default Users;