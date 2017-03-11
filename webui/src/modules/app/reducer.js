import { SET_ERROR } from './actionTypes';

const initialState = {
  error: ''
};

export default function interfaces(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR: {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
}
