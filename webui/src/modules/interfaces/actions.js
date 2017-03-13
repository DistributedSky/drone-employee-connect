import _ from 'lodash';
import { LOAD, SET_STATUS_CONNECT, SET_INFO, SET_DOCKER, SET_HARDWARE, SET_DRONE } from './actionTypes';
import * as api from '../../utils/api';
import { setError } from '../app/actions';

export const load = () => (
  (dispatch) => {
    api.get('/interfaces')
      .then((response) => {
        const interfaces = [];
        _.forEach(response.interfaces, (item) => {
          interfaces.push({
            name: item,
            connect: false,
            info: {},
            drone: {},
            container: {}
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

export const getInfo = name => (
  (dispatch) => {
    api.get(`/interfaces/${name}`)
      .then((response) => {
        _.forEach(response.interfaces[name], (item) => {
          if (_.has(item[0], 'addr') && _.has(item[0], 'broadcast') && _.has(item[0], 'netmask')) {
            dispatch({
              type: SET_INFO,
              payload: {
                name,
                info: {
                  addr: item[0].addr,
                  broadcast: item[0].broadcast,
                  netmask: item[0].netmask
                }
              }
            });
            dispatch({
              type: SET_STATUS_CONNECT,
              payload: {
                name,
                status: true
              }
            });
          }
        });
      })
      .catch((error) => {
        dispatch(setError(`getInfo interface: ${error.toString()}`));
      });
  }
);

export const connect = (name, ssid, password) => (
  (dispatch) => {
    api.post(`/interfaces/${name}`, {
      ssid,
      password
    })
      .then((response) => {
        dispatch({
          type: SET_STATUS_CONNECT,
          payload: {
            name,
            status: response.interfaces[name].connected
          }
        });
        if (response.interfaces[name].connected) {
          dispatch(getInfo(name));
        }
      })
      .catch((error) => {
        dispatch(setError(`connect: ${error.toString()}`));
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
              container: {
                status: 'no'
              }
            }
          });
        } else {
          _.forEach(response.containers[name], (item, short) => {
            dispatch({
              type: SET_DOCKER,
              payload: {
                name,
                container: {
                  short,
                  status: item.status
                }
              }
            });
          });
        }
      })
      .catch((error) => {
        dispatch(setError(`getStatusDocker: ${error.toString()}`));
      });
  }
);

export const runDocker = (name, image) => (
  (dispatch) => {
    dispatch({
      type: SET_DOCKER,
      payload: {
        name,
        container: {
          status: 'run'
        }
      }
    });
    api.post(`/containers/${name}`, {
      image
    })
      .then((response) => {
        _.forEach(response.containers[name], (item, short) => {
          dispatch({
            type: SET_DOCKER,
            payload: {
              name,
              container: {
                short,
                status: item.status
              }
            }
          });
        });
      })
      .catch((error) => {
        dispatch(setError(`runDocker: ${error.toString()}`));
      });
  }
);

export const getDrone = name => (
  (dispatch) => {
    api.get(`/drones/${name}`)
      .then((response) => {
        dispatch({
          type: SET_DRONE,
          payload: {
            name,
            drone: response.drones[name]
          }
        });
      })
      .catch((error) => {
        dispatch(setError(`getDrone: ${error.toString()}`));
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
