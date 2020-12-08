import * as actions from '../actionsType';

const initialState = {
  connections: [],
  lengthData: false,
  realtimeDatabase: [],
  isFetching: false,
  currentUser: {
    isUser: false,
  },
  messages: {
    isFetchingMessage: false,
    messagesData: [],
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    // Realtime Database. (First & Update)
    case actions.FETCHING_REALTIMEDB_DOOR:
      return {...state, isFetching: true};
    case actions.FETCHING_REALTIMEDB_DOOR_LENGTHDATA:
      return {...state, lengthData: payload};
    case actions.FETCHING_REALTIMEDB_DOOR_SUCCESS:
      return {...state, realtimeDatabase: payload, isFetching: false};
    case actions.FETCHING_REALTIMEDB_DOOR_FAILRUE:
      return {...state, isFetching: false};

    // Messages
    case actions.GET_MESSAGES:
      return {...state, messages: {...state.messages, isFetchingMessage: true}};
    case actions.SET_MESSAGES:
      const _sortMessages = () => {
        if (payload) {
          return payload.sort((a, b) => {
            if (a.timestamp > b.timestamp) return -1;
            if (b.timestamp > a.timestamp) return 1;
            return 0;
          });
        } else [];
      };
      return {
        ...state,
        messages: {
          ...state.messages,
          isFetchingMessage: false,
          messagesData: _sortMessages(),
        },
      };

    // Connection
    case actions.SET_CONNECTION_CHANGED:
      return {...state, connections: payload};

    // Logout
    case actions.USER_LOGOUT:
      return {...state, currentUser: {isUser: false}, realtimeDatabase: []};

    default:
      return state;
  }
};
