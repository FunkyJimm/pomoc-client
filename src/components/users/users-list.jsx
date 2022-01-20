import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

import Helpers from '../../helpers/api-queries';

const UsersList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Helpers.getItems('users', setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  const handleDetails = id => {
    navigate(`/users/${id}`, { replace: true }, [navigate]);
  }

  const handleEdit = id => {
    navigate(`/users/form/${id}`, {replace: true}, [navigate]);
  }

  const handleDelete = id => {
    console.log(id)
    Helpers.deleteItem('users', id);
    setIsLoaded(false);
  }

  const itemsList = () => {
    return (
      items.data.map((user, index) => (
        <tr key={user.id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><Button onClick={() => handleDetails(user.id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(user.id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(user.id)} variant="outline-danger">Usuń</Button></td>
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
              <th>Email</th>
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

export default UsersList;