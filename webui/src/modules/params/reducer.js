import {
  SET_ACTIVE,
  START_LOAD,
  LOAD
} from './actionTypes';

const initialState = {
  active: '',
  loadList: false,
  list: {}
};

export default function params(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE: {
      return { ...state, active: action.payload };
    }

    case START_LOAD: {
      return { ...state, loadList: true };
    }

    case LOAD: {
      return { ...state, list: action.payload, loadList: false };
    }

    default:
      return state;
  }
}
