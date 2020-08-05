import * as Type from '../actionsType';
/**************************************************************************/

// First load Current user from firebase.
export const firstLoadCurrentUser = () => ({
  type: Type.FIRST_LOAD_CURRENTUSER_FIREBASE,
});
export const firstLoadCurrentUserSuccess = (data) => ({
  type: Type.FIRST_LOAD_CURRENTUSER_FIREBASE_SUCCESS,
  payload: data,
});
export const firstLoadCurrentUserFailrue = (error) => ({
  type: Type.FIRST_LOAD_CURRENTUSER_FIREBASE_FAILRUE,
  payload: error,
});
/**************************************************************************/

// Fetching realtime database door from firebase. (First)
export const FETCHING_REALTIMEDB_DOOR_SUCCESS = (data) => ({
  type: Type.FETCHING_REALTIMEDB_DOOR_SUCCESS,
  payload: data,
});
export const FETCHING_REALTIMEDB_DOOR_LENGTHDATA = (lengthData) => ({
  type: Type.FETCHING_REALTIMEDB_DOOR_LENGTHDATA,
  payload: lengthData,
});
export const FETCHING_REALTIMEDB_DOOR_FAILRUE = (error) => ({
  type: Type.FETCHING_REALTIMEDB_DOOR_FAILRUE,
  payload: error,
});

/**************************************************************************/

// Fetching realtime database door from firebase. (Update)
export const FETCHING_REALTIMEDB_DOOR_UPDATE = () => ({
  type: Type.FETCHING_REALTIMEDB_DOOR_UPDATE,
});
export const FETCHING_REALTIMEDB_DOOR_UPDATE_SUCCESS = (data) => ({
  type: Type.FETCHING_REALTIMEDB_DOOR_UPDATE_SUCCESS,
  payload: data,
});
export const FETCHING_REALTIMEDB_DOOR_UPDATE_FAILRUE = (error) => ({
  type: Type.FETCHING_REALTIMEDB_DOOR_UPDATE_FAILRUE,
  payload: error,
});

/**************************************************************************/

// Load theme from cache to store.
export const CacheTheme_fetching = () => ({
  type: Type.CACHETHEME_FETCHING,
});
export const setThemeToStore = (theme, ValueTypeBoolean) => ({
  type: Type.SETTHEME_TO_STORE,
  loadTheme: theme,
  isCache: ValueTypeBoolean,
});
export const getThemeFromCache_success = (cacheTheme, ValueTypeBoolean) => ({
  type: Type.GETTHEME_FROM_CACHE_SUCCESS,
  loadTheme: cacheTheme,
  isCache: ValueTypeBoolean,
});

/**************************************************************************/

// Navigation
export const setNavigation = (data) => ({
  type: Type.SET_NAVIGATION,
  payload: data,
});
export const deleteNavigation = (data) => ({
  type: Type.DELETE_NAVIGATION,
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

/**************************************************************************/
// Connection arduino & app
export const setConnectionChacnge = (data) => ({
  type: Type.SET_CONNECTION_CHANGED,
  payload: data,
});
