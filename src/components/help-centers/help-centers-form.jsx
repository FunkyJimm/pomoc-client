import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Alert, Button, Form } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

import './help-centers-form.scss';

const HelpCenters = () => {
  let { id } = useParams();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      Helpers.getItemDetails('helpcenter', id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, []);

  let initialData = { 
    name: '', 
    address: '', 
    city: '', 
    zipCode: '', 
    phone: '', 
    description: ''
  };

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialData = { ...data };
    }
    
    return (
      <div className="helpcenters__container-form">
        { !id ? <h1>Dodaj ośrodek pomocy</h1> : <h1>Edytuj ośrodek pomocy</h1> }
        <Formik
          initialValues={initialData}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Nazwa jest wymagana!';
            } else if (values.name.length < 2) {
              errors.name = 'Nazwa jest za krótka!';
            } else if (values.name.length > 256) {
              errors.name = 'Nazwa jest za długa!';
            }
            if (!values.address) {
              errors.address = 'Ulica jest wymagana!';
            }
            if (!values.city) {
              errors.city = 'Miasto jest wymagane!';
            }
            if (!values.zipCode) {
              errors.zipCode = 'Kod pocztowy jest wymagany!';
            }
            if (!values.description) {
              errors.description = 'Opis jest wymagany!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!id) {
              Helpers.addItem('helpcenter', values, setMessage, setErrMessage);
            } else {
              Helpers.updateItem('helpcenter', id, values, setMessage, setErrMessage);
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
                  placeholder="Nazwa schroniska"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Adres:</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Nazwa ulicy oraz nr domu i lokalu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                {errors.address && touched.address && errors.address}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Miasto:</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Nazwa miasta"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
                {errors.city && touched.city && errors.city}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kod pocztowy:</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  placeholder="Kod pocztowy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipCode}
                />
                {errors.zipCode && touched.zipCode && errors.zipCode}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Numer telefonu:</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  placeholder="Nr telefonu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {errors.phone && touched.phone && errors.phone}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Opis:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Opisz krótko czym zajmuje się podany ośrodek pomocy"
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

export default HelpCenters;