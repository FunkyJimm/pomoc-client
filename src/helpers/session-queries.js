import axios from "axios";

import config from '../config/config';
import { errorsHandler } from '../errors/errors-messages';

const login = async function(values, setMessage, setErrMessage) {
  await axios.post(`${config.API_URL}/login`, values)
    .then(res => {
      console.log(res.data.status);
      setMessage('Zalogowano!');
    },
    (err) => {
      console.log(err.response.status);
      setErrMessage(errorsHandler(err.response.status));
    })
}

export default {
  login,
}