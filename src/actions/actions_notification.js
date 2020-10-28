// Type
import {
  setNotification,
  deleteNotification,
  settingNotification,
  settingStatus,
  settingMessage,
  setAllNotificationtoStore,
} from './index';

// ********************************************************
// Notification all
export const action_setAllNotification = (data) => {
  return (dispatch) => {
    dispatch(setAllNotificationtoStore(data));
  };
};
// ********************************************************
export const action_setNotification = (data) => {
  return (dispatch) => {
    dispatch(setNotification(data));
  };
};

export const action_deleteNotification = (data) => {
  return (dispatch) => {
    dispatch(deleteNotification(data));
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
