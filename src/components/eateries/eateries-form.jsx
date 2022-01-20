import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Alert, Button, Form, FormGroup } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

import './eateries-form.scss';

const Eateries = () => {
  let { id } = useParams();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      Helpers.getItemDetails('eatery', id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (isLoaded) {
    const { data } = items;
    const { name, address, city, zipCode, phone, mealsAvailability } = data;
    
    return (
      <div className="eateries__container-form">
        { !isLoaded ? <h1>Dodaj jadłodajnie</h1> : <h1>Edytuj jadłodajnie</h1> }
        <Formik
          initialValues={{ 
            name, 
            address, 
            city, 
            zipCode, 
            phone,
            mealsAvailability,
          }}
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
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!id) {
              Helpers.addItem('eatery', values, setMessage, setErrMessage);
            } else {
              Helpers.updateItem('eatery', id, values, setMessage, setErrMessage);
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
              <FormGroup className="mb-3">
                <Form.Label>Wybierz dostępność posiłków</Form.Label>
                <Form.Select 
                  name="mealsAvailability"
                  onChange={handleChange} 
                  value={values.mealsAvailability}
                  defaultChecked={values.mealsAvailability}
                >
                  <option value="true">Dostępne</option>
                  <option value="false">Niedostępne</option>
                </Form.Select>
              </FormGroup>
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

export default Eateries;