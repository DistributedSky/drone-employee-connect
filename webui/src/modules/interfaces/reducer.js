import {
  LOAD,
  SET_STATUS_CONNECT,
  SET_INFO, SET_DOCKER,
  SET_HARDWARE,
  SET_DRONE
} from './actionTypes';

const initialState = {
  hardware: {},
  list: []
};

export default function interfaces(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      return { ...state, list: action.payload };
    }

    case SET_STATUS_CONNECT: {
      const list = state.list.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            connect: action.payload.status
          };
        }
        return item;
      });
      return { ...state, list };
    }

    case SET_INFO: {
      const list = state.list.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            info: action.payload.info
          };
        }
        return item;
      });
      return { ...state, list };
    }

    case SET_DOCKER: {
      const list = state.list.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            container: action.payload.container
          };
        }
        return item;
      });
      return { ...state, list };
    }

    case SET_DRONE: {
      const list = state.list.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            drone: action.payload.drone
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
