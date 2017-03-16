import axios from 'axios';
import _ from 'lodash';
import { SET_ACTIVE, START_LOAD, LOAD } from './actionTypes';
import { setError } from '../app/actions';

export const setActive = name => (
  {
    type: SET_ACTIVE,
    payload: name
  }
);

export const load = () => (
  (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: true
    });
    axios.get('https://api.github.com/repositories/83666514/contents/docs/params')
      .then(response => response.data)
      .then((response) => {
        const interfaces = [];
        const gets = [];
        _.forEach(response, (item) => {
          gets.push(axios.get(`https://raw.githubusercontent.com/DroneEmployee/drone-employee-connect/master/docs/params/${item.name}`));
        });
        axios.all(gets)
          .then((responsee) => {
            _.forEach(responsee, (item) => {
              const responseConfig = item.data.trim().replace(/^{/, '[').replace(/}$/, ']');
              let name = item.config.url.split('/');
              name = name.pop().split('.');
              name = name[0];
              interfaces[name] = JSON.parse(responseConfig);
            });
            dispatch({
              type: LOAD,
              payload: interfaces
            });
          })
        .catch((error) => {
          dispatch(setError(`load interfaces: ${error.toString()}`));
        });
      })
      .catch((error) => {
        dispatch(setError(`load interfaces: ${error.toString()}`));
      });
  }
);
