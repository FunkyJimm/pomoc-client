import axios from "axios";

import config from '../config/config';

const registration = async function(values) {
  try {
    const registration = await axios.post(`${config.API_URL}/users/`, {
      name: values.name,
      password: values.password,
      email: values.email
    });
    console.log(registration);
    if (!registration) {
      return false;
    }
    return true;
  } catch (err) {
    throw Error(err);
  }
}

const login = async function(values) {
  try {
    const login = await axios.post(`${config.API_URL}/login/`, {
      name: values.name,
      password: values.password,
    });
    console.log(login);
    if (!login) {
      return false;
    }
    return true;
  } catch (err) {
    throw Error(err);
  }
}

export default {
  registration,
  login,
}