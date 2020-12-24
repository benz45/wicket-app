import * as actions from 'root/src/actionsType';

const initialState = {
  lengthData: false,
  realtimeDatabase: [],
  messages: {
    isFetchingMessage: false,
    messagesData: [],
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    // Realtime Database. (First & Update)
    case actions.FETCHING_REALTIMEDB_DOOR_SUCCESS:
      return {
        ...state,
        realtimeDatabase: payload.value,
        lengthData: payload.lengthData,
      };
    case actions.FETCHING_REALTIMEDB_DOOR_FAILRUE:
      return {
        ...state,
        realtimeDatabase: [],
        lengthData: false,
      };

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

    // Logout
    case actions.USER_LOGOUT:
      return {...state, currentUser: {isUser: false}, realtimeDatabase: []};

    default:
      return state;
  }
};
