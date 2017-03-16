import _ from 'lodash';
import Convert from 'ansi-to-html';
import { START_LOAD, LOAD, NEW_DOCKER, SET_DOCKER, SET_LOG, SET_HARDWARE } from './actionTypes';
import * as api from '../../utils/api';
// import * as api from '../../utils/api_v1_test';
import { setError } from '../app/actions';

const convert = new Convert();

export const load = () => (
  (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: true
    });
    api.get('/containers')
      .then((response) => {
        const interfaces = [];
        _.forEach(response.containers, (item) => {
          interfaces.push({
            name: item
          });
        });
        dispatch({
          type: LOAD,
          payload: interfaces
        });
      })
      .catch((error) => {
        dispatch(setError(`load interfaces: ${error.toString()}`));
      });
  }
);

export const getStatusDocker = name => (
  (dispatch) => {
    api.get(`/containers/${name}`)
      .then((response) => {
        if (_.has(response, 'error')) {
          dispatch({
            type: SET_DOCKER,
            payload: {
              name,
              status: 'no'
            }
          });
        } else {
          dispatch({
            type: SET_DOCKER,
            payload: {
              name,
              status: response.containers[name].status
            }
          });
        }
      })
      .catch((error) => {
        dispatch(setError(`getStatusDocker: ${error.toString()}`));
      });
  }
);

export const runDocker = (image, form) => (
  (dispatch) => {
    dispatch({
      type: NEW_DOCKER,
      payload: true
    });
    api.post('/containers', {
      image,
      params: JSON.stringify(form)
    })
      .then((response) => {
        if (_.has(response, 'message')) {
          dispatch(setError(`runDocker: ${response.message}`));
        } else {
          dispatch(load());
        }
        dispatch({
          type: NEW_DOCKER,
          payload: false
        });
      })
      .catch((error) => {
        dispatch(setError(`runDocker: ${error.toString()}`));
        dispatch({
          type: NEW_DOCKER,
          payload: false
        });
      });
  }
);

export const getLog = name => (
  (dispatch) => {
    api.get(`/containers/${name}/logs`)
      .then((response) => {
        dispatch({
          type: SET_LOG,
          payload: {
            name,
            log: convert.toHtml(response.containers[name].logs.replace(/\\x1b/g, '\x1b').replace(/\\n/g, '<br />').replace(/\\'/g, '\''))
          }
        });
      })
      .catch((error) => {
        dispatch(setError(`getLog: ${error.toString()}`));
      });
  }
);

export const getHardware = () => (
  (dispatch) => {
    api.get('/hardware')
      .then((response) => {
        dispatch({
          type: SET_HARDWARE,
          payload: response.hardware
        });
      })
      .catch((error) => {
        dispatch(setError(`getHardware: ${error.toString()}`));
      });
  }
);
