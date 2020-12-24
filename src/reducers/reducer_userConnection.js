import {
  FETCH_USER_CONNECTION_SUCCESS,
  RESET_USER_CONNECTION,
} from 'root/src/actionsType';

const initialState = {
  isLoading: true,
  isError: false,
  user: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USER_CONNECTION_SUCCESS:
      return {...state, isLoading: false, user: Object.values(payload)};
    case RESET_USER_CONNECTION:
      return initialState;
    default:
      return state;
  }
};
