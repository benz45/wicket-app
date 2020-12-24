import {LOAD_CURRENT_USER_FIREBASE, USER_LOGOUT} from 'root/src/actionsType';

const initialState = {
  isUser: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOAD_CURRENT_USER_FIREBASE:
      return {...state, user: payload, isUser: !!payload && true};
    case USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
