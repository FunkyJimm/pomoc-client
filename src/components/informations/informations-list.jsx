import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Table, Row } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

const InformationsList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Helpers.getItems('informations', setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  const handleDetails = id => {
    navigate(`/informations/${id}`, { replace: true }, [navigate]);
  }

  const handleEdit = id => {
    navigate(`/informations/form/${id}`, {replace: true}, [navigate]);
  }

  const handleDelete = id => {
    console.log(id)
    Helpers.deleteItem('informations', id);
    setIsLoaded(false);
  }

  const handleReturn = () => {
    navigate(-1);
  }

  const itemsList = () => {
    return (
      items.data.map((information, index) => (
        <tr key={information.id || information._id}>
          <td>{index + 1}</td>
          <td>{information.title}</td>
          <td>{information.description}</td>
          <td><Button onClick={() => handleDetails(information.id || information._id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(information.id || information._id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(information.id || information._id)} variant="outline-danger">Usuń</Button></td>
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
          <h1>Informacje</h1>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tytuł</th>
                <th>Opis</th>
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

export default InformationsList;