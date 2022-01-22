import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Table, Row } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

const SheltersList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Helpers.getItems('shelters', setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  const handleDetails = id => {
    navigate(`/shelters/${id}`, { replace: true }, [navigate]);
  }

  const handleEdit = id => {
    navigate(`/shelters/form/${id}`, {replace: true}, [navigate]);
  }

  const handleDelete = id => {
    Helpers.deleteItem('shelters', id);
    setIsLoaded(false);
  }

  const handleReturn = () => {
    navigate(-1);
  }

  const itemsList = () => {
    return (
      items.data.map((shelter, index) => (
        <tr key={shelter.id || shelter._id}>
          <td>{index + 1}</td>
          <td>{shelter.name}</td>
          <td>{shelter.totalNumberOfBeds}</td>
          <td>{shelter.occupiedNumberOfBeds}</td>
          <td><Button onClick={() => handleDetails(shelter.id || shelter._id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(shelter.id || shelter._id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(shelter.id || shelter._id)} variant="outline-danger">Usuń</Button></td>
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
          <h1>Schroniska</h1>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nazwa</th>
                <th>Ilość wszystkich łóżek</th>
                <th>Ilość zajętych łóżek</th>
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

export default SheltersList;