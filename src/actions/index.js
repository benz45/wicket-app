import * as Type from '../actionsType';

export const FETCHING_REALTIMEDB_DOOR_LENGTHDATA = (lengthData) => ({
  type: Type.FETCHING_REALTIMEDB_DOOR_LENGTHDATA,
  payload: lengthData,
});

/**************************************************************************/

// Navigation
export const setNavigation = (data) => ({
  type: Type.SET_NAVIGATION,
  payload: data,
});
export const deleteNotification = (data) => ({
  type: Type.DELETE_NOTIFICATION,
  payload: data,
});

export const settingNotification = (data) => ({
  type: Type.SETTING_NOTIFICATION,
  payload: data,
});
export const settingStatus = (data) => ({
  type: Type.SETTING_STATUS,
  payload: data,
});
export const settingMessage = (data) => ({
  type: Type.SETTING_MESSAGE,
  payload: data,
});
export const setAllNotificationtoStore = (data) => ({
  type: Type.SETALLNOTIFICATION_TOSTORE,
  payload: {
    type: data.type,
    data,
  },
});
/**************************************************************************/

// Messages
export const getMessages = () => ({
  type: Type.GET_MESSAGES,
});
export const setMessages = (data) => ({
  type: Type.SET_MESSAGES,
  payload: data,
});

/**************************************************************************/
//Badge (test)
export const modeONMessageOnly = () => ({
  type: Type.MODE_ONMESSAGEONLY,
});
export const modeOFFMessageOnly = () => ({
  type: Type.MODE_OFFMESSAGEONLY,
});
