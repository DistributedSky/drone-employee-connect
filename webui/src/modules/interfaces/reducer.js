import _ from 'lodash';
import {
  START_LOAD,
  LOAD,
  NEW_DOCKER,
  SET_DOCKER,
  SET_LOG,
  SET_HARDWARE
} from './actionTypes';

const initialState = {
  docker: false,
  hardware: {},
  loadList: false,
  list: []
};

export default function interfaces(state = initialState, action) {
  switch (action.type) {
    case START_LOAD: {
      return { ...state, loadList: true };
    }

    case LOAD: {
      const list = action.payload.map((item) => {
        const con = _.find(state.list, { name: item.name });
        if (con) {
          return con;
        }
        return {
          name: item.name,
          status: ''
        };
      });
      return { ...state, list, loadList: false };
    }

    case NEW_DOCKER: {
      return { ...state, docker: action.payload };
    }

    case SET_DOCKER: {
      const list = state.list.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            status: action.payload.status
          };
        }
        return item;
      });
      return { ...state, list };
    }

    case SET_LOG: {
      const list = state.list.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            log: action.payload.log
          };
        }
        return item;
      });
      return { ...state, list };
    }

    case SET_HARDWARE: {
      return { ...state, hardware: action.payload };
    }

    default:
      return state;
  }
}
