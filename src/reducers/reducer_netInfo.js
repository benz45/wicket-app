import {FETCH_NETINFO} from 'root/src/actionsType';

const initialState = {
  isNetInfo: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_NETINFO:
      return {...state, isNetInfo: payload};

    default:
      return state;
  }
};
