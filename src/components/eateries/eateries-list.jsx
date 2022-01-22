import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Table, Row } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

const EateriesList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Helpers.getItems('eatery', setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  const handleDetails = id => {
    navigate(`/eateries/${id}`, { replace: false }, [navigate]);
  }

  const handleEdit = id => {
    navigate(`/eateries/form/${id}`, { replace: false }, [navigate]);
  }

  const handleDelete = id => {
    Helpers.deleteItem('eatery', id);
    setIsLoaded(false);
  }

  const handleReturn = () => {
    navigate('/', { replace: false }, [navigate]);
  }

  const itemsList = () => {
    return (
      items.data.map((eatery, index) => (
        <tr key={eatery.id || eatery._id}>
          <td>{index + 1}</td>
          <td>{eatery.name}</td>
          <td>{eatery.mealsAvailability}</td>
          <td><Button onClick={() => handleDetails(eatery.id || eatery._id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(eatery.id || eatery._id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(eatery.id || eatery._id)} variant="outline-danger">Usuń</Button></td>
        </tr>
      ))
    )
  }

  if (!isLoaded) {
    return (
      <Container fluid>
        <Row>
          { message ? <Alert variant="danger">{message}</Alert> : <p>Wczytywanie...</p> }
        </Row>
        <Row>
          { message && <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button> }
        </Row>
      </Container>
    )
  } else {
    return (
      <Container fluid>
        <Row>
          <h1>Jadłodajnie</h1>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nazwa</th>
                <th>Ilość dostępnych posiłków</th>
              </tr>
            </thead>
            <tbody>
              {itemsList()}
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

export default EateriesList;