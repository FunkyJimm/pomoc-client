import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

import config from '../../config/config';

const InformationDetails = () => {
  let { id } = useParams();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`${config.API_URL}/informations/${id}`)
      .then(res => {
        setItems(res.data);
        setIsLoaded(true);
      })
    }
  }, []);

  if (!isLoaded) {
    return (
      <div>
        <p>Error</p>
      </div>
    )
  } else {
    const { data } = items;
    const { title, description } = data;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Opis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{title}</td>
              <td>{description}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  } 
}

export default InformationDetails;