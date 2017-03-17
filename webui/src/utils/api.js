import axios from 'axios';
import { URL_ROOT } from '../config/config';

export const remove = url => (
  axios.delete(`${URL_ROOT}${url}`)
    .then(response => response.data)
);

export const post = (url, data) => (
  axios.post(`${URL_ROOT}${url}`, data)
    .then(response => response.data)
);

export const get = url => (
  axios.get(`${URL_ROOT}${url}`)
    .then(response => response.data)
);
