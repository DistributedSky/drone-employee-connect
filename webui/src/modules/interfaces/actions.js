import axios from 'axios';
import _ from 'lodash';
import { LOAD, SET_STATUS_CONNECT, SET_INFO, SET_DOCKER, SET_HARDWARE, SET_DRONE } from './actionTypes';
import { URL_ROOT } from '../../config/config';

export const load = () => (
  (dispatch) => {
    axios.get(`${URL_ROOT}/interfaces`)
      .then((response) => {
        const interfaces = [];
        _.forEach(response.data.interfaces, (item) => {
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
        console.log(error);
      });
  }
);

export const getInfo = name => (
  (dispatch) => {
    axios.get(`${URL_ROOT}/interfaces/${name}`)
      .then((response) => {
        _.forEach(response.data.interfaces[name], (item) => {
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
        console.log(error);
      });
  }
);

export const connect = (name, ssid, password) => (
  (dispatch) => {
    axios.post(`${URL_ROOT}/interfaces/${name}`, {
      ssid,
      password
    })
      .then((response) => {
        dispatch({
          type: SET_STATUS_CONNECT,
          payload: {
            name,
            status: response.data.interfaces[name].connected
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

export const getStatusDocker = name => (
  (dispatch) => {
    axios.get(`${URL_ROOT}/containers/${name}`)
      .then((response) => {
        if (_.has(response.data, 'error')) {
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
          _.forEach(response.data.containers[name], (item, short) => {
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
        console.log(error);
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
    axios.post(`${URL_ROOT}/containers/${name}`, {
      image
    })
      .then((response) => {
        _.forEach(response.data.containers[name], (item, short) => {
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
        console.log(error);
      });
  }
);

export const getDrone = name => (
  (dispatch) => {
    axios.get(`${URL_ROOT}/drones/${name}`)
      .then((response) => {
        dispatch({
          type: SET_DRONE,
          payload: {
            name,
            drone: response.data.drones[name]
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // dispatch({
    //   type: SET_DRONE,
    //   payload: {
    //     name,
    //     drone: {
    //       battery: 73,
    //       signal: 80,
    //       stamp: 33213321
    //     }
    //   }
    // });
  }
);

export const getHardware = () => (
  (dispatch) => {
    axios.get(`${URL_ROOT}/hardware`)
      .then((response) => {
        dispatch({
          type: SET_HARDWARE,
          payload: response.data.hardware
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
