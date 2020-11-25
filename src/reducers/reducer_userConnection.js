import {FETCH_USER_CONNECTION_SUCCESS} from '../actionsType';

const initialState = {
  isLoading: true,
  isError: false,
  user: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USER_CONNECTION_SUCCESS:
      return {...state, isLoading: false, user: Object.values(payload)};
    default:
      return state;
  }
};
