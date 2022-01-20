import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

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

  const itemsList = () => {
    return (
      items.data.map((shelter, index) => (
        <tr key={shelter.id}>
          <td>{index + 1}</td>
          <td>{shelter.name}</td>
          <td>{shelter.totalNumberOfBeds}</td>
          <td>{shelter.occupiedNumberOfBeds}</td>
          <td><Button onClick={() => handleDetails(shelter.id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(shelter.id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(shelter.id)} variant="outline-danger">Usuń</Button></td>
        </tr>
      ))
    )
  }

  if (!isLoaded) {
    return (
      <div>
        <p>{message ? message : 'Wczytywanie...'}</p>
      </div>
    )
  } else {
    return (
      <div>
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
      </div>
    )
  }
}

export default SheltersList;