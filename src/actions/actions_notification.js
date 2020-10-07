// Type
import {
  setNavigation,
  deleteNavigation,
  settingNotification,
  settingStatus,
  settingMessage,
  setAllNotificationtoStore
} from './index';

// ********************************************************
// Notification all
export const action_setAllNotification = (data)=> {
  return (dispatch) => {
    dispatch(setAllNotificationtoStore(data));
  }
}
// ********************************************************
export const action_setNavigation = (data) => {
  return (dispatch) => {
    dispatch(setNavigation(data));
  };
};

export const action_deleteNavigation = (data) => {
  return (dispatch) => {
    dispatch(deleteNavigation(data));
  };
};

// ********************************************************
// Switch settings

export const action_settingNotification = (data) => {
  return (dispatch) => {
    dispatch(settingNotification(data));
  };
};
export const action_settingStatus = (data) => {
  return (dispatch) => {
    dispatch(settingStatus(data));
  };
};
export const action_settingMessage = (data) => {
  return (dispatch) => {
    dispatch(settingMessage(data));
  };
};
