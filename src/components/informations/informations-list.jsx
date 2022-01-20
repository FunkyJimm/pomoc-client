import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

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

  const itemsList = () => {
    return (
      items.data.map((information, index) => (
        <tr key={information.id}>
          <td>{index + 1}</td>
          <td>{information.title}</td>
          <td>{information.description}</td>
          <td><Button onClick={() => handleDetails(information.id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(information.id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(information.id)} variant="outline-danger">Usuń</Button></td>
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
              <th>Tytuł</th>
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

export default InformationsList;