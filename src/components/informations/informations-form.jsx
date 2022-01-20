import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Alert, Button, Form } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

import './informations-form.scss';

const Informations = () => {
  let { id } = useParams();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      Helpers.getItemDetails('information', id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, []);

  let initialData = { 
    title: '',
    description: ''
  };

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialData = { ...data };
    }
    
    return (
      <div className="informations__container-form">
        { !id ? <h1>Dodaj nową informację</h1> : <h1>Edytuj informację</h1> }
        <Formik
          initialValues={initialData}
          validate={values => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Tytuł jest wymagany!';
            } else if (values.title.length < 2) {
              errors.title = 'Nazwa jest za krótka!';
            } else if (values.title.length > 256) {
              errors.title = 'Nazwa jest za długa!';
            }
            if (!values.description) {
              errors.description = 'Opis jest wymagany!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!id) {
              Helpers.addItem('informations', values, setMessage, setErrMessage);
            } else {
              Helpers.updateItem('informations', id, values, setMessage, setErrMessage);
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
                <Form.Label>Tytuł:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Tytuł informacji"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {errors.title && touched.title && errors.title}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Opis:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Podaj treść informacji"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {errors.description && touched.description && errors.description}
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

export default Informations;