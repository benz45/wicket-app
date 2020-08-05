// Type
import {
  SET_NAVIGATION,
  DELETE_NAVIGATION,
  SETTING_NOTIFICATION,
  SETTING_STATUS,
  SETTING_MESSAGE,
} from '../actionsType';

const initialState = {
  settingNotification: true,
  settingStatus: true,
  settingMessage: true,
  notificationData: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_NAVIGATION:
      return Object.assign({}, state, {
        notificationData: [...state.notificationData, payload],
      });
    case DELETE_NAVIGATION:
      return {...state, notificationData: payload};
    case SETTING_NOTIFICATION:
      return {...state, settingNotification: payload};
    case SETTING_STATUS:
      return {...state, settingStatus: payload};
    case SETTING_MESSAGE:
      return {...state, settingMessage: payload};
    default:
      return state;
  }
};
