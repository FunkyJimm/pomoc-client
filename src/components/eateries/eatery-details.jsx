import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Container, Table, Row } from 'react-bootstrap';

import config from '../../config/config';

const EateryDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`${config.API_URL}/eatery/${id}`)
      .then(res => {
        setItems(res.data);
        setIsLoaded(true);
      })
    }
  }, [id]);

  const handleReturn = () => {
    navigate(-1);
  }

  if (!isLoaded) {
    return (
      <Container fluid>
        <Row>
          <Alert variant="danger">Błąd!</Alert>
        </Row>
        <Row>
          <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button>
        </Row>
      </Container>
    )
  } else {
    const { data } = items;
    console.log(data);
    const { name, address, city, zipCode, phone, mealsAvailability } = data;

    return (
      <Container fluid>
        <Row>
          <h1>{ name }</h1>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Adres</th>
                <th>Miasto</th>
                <th>Kod pocztowy</th>
                <th>Telefon</th>
                <th>Dostępność posiłków</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{name}</td>
                <td>{`${address.street} ${address.house}${address?.apartment && '/' + address?.apartment}`}</td>
                <td>{city}</td>
                <td>{zipCode}</td>
                <td>{phone}</td>
                <td>{mealsAvailability ? 'Dostępne' : 'Niedostępne'}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button>
        </Row>
      </Container>
    )
  } 
}

export default EateryDetails;