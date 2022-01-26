import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Alert, Form, Button } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

import './shelters-form.scss';

const Shelters = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      Helpers.getItemDetails('shelters', id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, [id]);

  const handleReturn = () => {
    navigate(-1);
  }

  let initialData = { 
    name: '', 
    address: {
      street: '',
      house: '',
      apartment: '',
    }, 
    city: '', 
    zipCode: '', 
    phone: '', 
    totalNumberOfBeds: '', 
    occupiedNumberOfBeds: '' 
  };

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialData = { ...data };
    }
    
    return (
      <div className="shelters__container-form">
        { !id ? <h1>Dodaj schronisko</h1> : <h1>Edytuj schronisko</h1> }
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
            if (!values.address.street) {
              errors.street = 'Nazwa ulicy jest wymagana!';
            }
            if (!values.address.house) {
              errors.house = 'Numer domu jest wymagany!';
            }
            if (!values.city) {
              errors.city = 'Miasto jest wymagane!';
            }
            if (!values.zipCode) {
              errors.zipCode = 'Kod pocztowy jest wymagany!';
            }
            if (!values.totalNumberOfBeds) {
              errors.totalNumberOfBeds = 'Musisz wprowadzić dostępną ilość łóżek!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!id) {
              Helpers.addItem('shelters', values, setMessage, setErrMessage);
            } else {
              Helpers.updateItem('shelters', id, values, setMessage, setErrMessage);
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
                <Form.Label>Ulica:</Form.Label>
                <Form.Control
                  type="text"
                  name="address.street"
                  placeholder="Nazwa ulicy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address?.street}
                />
                {errors.street && touched.street && errors.street}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Numer domu:</Form.Label>
                <Form.Control
                  type="text"
                  name="address.house"
                  placeholder="Numer domu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address?.house}
                />
                {errors.house && touched.house && errors.house}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Numer mieszkania:</Form.Label>
                <Form.Control
                  type="text"
                  name="address.apartment"
                  placeholder="Numer mieszkania"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address?.apartment}
                />
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
                <Form.Label>Liczba dostępnych łóżek:</Form.Label>
                <Form.Control
                  type="number"
                  name="totalNumberOfBeds"
                  placeholder="Ogólna liczba łóżek dostępnych w schronisku"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.totalNumberOfBeds}
                />
                {errors.totalNumberOfBeds && touched.totalNumberOfBeds && errors.totalNumberOfBeds}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Liczba zajętych łóżek:</Form.Label>
                <Form.Control
                  type="number"
                  name="occupiedNumberOfBeds"
                  placeholder="Liczba łóżek zajętych przez osoby bezdomne"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.occupiedNumberOfBeds}
                  min="0"
                  max={values.totalNumberOfBeds}
                />
                {errors.occupiedNumberOfBeds && touched.occupiedNumberOfBeds && errors.occupiedNumberOfBeds}
              </Form.Group>
              <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zatwierdź</Button>
              <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button>
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

export default Shelters;