import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

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
    navigate(`/eatery/${id}`, { replace: true }, [navigate]);
  }

  const handleEdit = id => {
    navigate(`/eatery/form/${id}`, {replace: true}, [navigate]);
  }

  const handleDelete = id => {
    Helpers.deleteItem('eatery', id);
    setIsLoaded(false);
  }

  const itemsList = () => {
    return (
      items.data.map((eatery, index) => (
        <tr key={eatery.id}>
          <td>{index + 1}</td>
          <td>{eatery.name}</td>
          <td>{eatery.mealsAvailability}</td>
          <td><Button onClick={() => handleDetails(eatery.id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(eatery.id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(eatery.id)} variant="outline-danger">Usuń</Button></td>
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
              <th>Ilość dostępnych posiłków</th>
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

export default EateriesList;