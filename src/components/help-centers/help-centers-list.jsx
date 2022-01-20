import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

const HelpCentersList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Helpers.getItems('helpcenter', setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  const handleDetails = id => {
    navigate(`/helpcenters/${id}`, { replace: true }, [navigate]);
  }

  const handleEdit = id => {
    navigate(`/helpcenters/form/${id}`, {replace: true}, [navigate]);
  }

  const handleDelete = id => {
    Helpers.deleteItem('helpcenter', id);
    setIsLoaded(false);
  }

  const itemsList = () => {
    return (
      items.data.map((helpCenter, index) => (
        <tr key={helpCenter.id}>
          <td>{index + 1}</td>
          <td>{helpCenter.name}</td>
          <td>{helpCenter.description}</td>
          <td><Button onClick={() => handleDetails(helpCenter.id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(helpCenter.id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(helpCenter.id)} variant="outline-danger">Usuń</Button></td>
        </tr>
      ))
    )
  }

  if (!isLoaded) {
    return (
      <div>
        <p>{ message ? message : 'Wczytywanie...' }</p>
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
              <th>Opis</th>
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

export default HelpCentersList;