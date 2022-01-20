import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

import config from '../../config/config';

const EateryDetails = () => {
  let { id } = useParams();
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
  }, []);

  if (!isLoaded) {
    return (
      <div>
        <p>Error</p>
      </div>
    )
  } else {
    const { data } = items;
    const { name, address, city, zipCode, phone, mealsAvailability } = data;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Adres</th>
              <th>Miasto</th>
              <th>Kod pocztowy</th>
              <th>Telefon</th>
              <th>Ilość dostępnych posiłków</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{address}</td>
              <td>{city}</td>
              <td>{zipCode}</td>
              <td>{phone}</td>
              <td>{mealsAvailability}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  } 
}

export default EateryDetails;