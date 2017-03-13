import { SET_ERROR } from './actionTypes';

export const setError = msg => (
  {
    type: SET_ERROR,
    payload: msg
  }
);
