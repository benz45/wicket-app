// Type
import {
  SET_NOTIFICATION,
  DELETE_NOTIFICATION,
  SETTING_NOTIFICATION,
  SETTING_STATUS,
  SETTING_MESSAGE,
  SETALLNOTIFICATION_TOSTORE,
  VALIDATION_DATE_NOTIFICATION,
} from 'root/src/actionsType';

const initialState = {
  settingNotification: true,
  settingStatus: true,
  settingMessage: true,
  notificationData: [],
  allNotification: [],
};

export default (state = initialState, {type, payload}) => {
  // Length data state "allNotification".
  const lengthAllNotification = state.allNotification.length;

  // Fucntion insert property id, type in payload before add to store.
  const _insertPropInPayload = ({
    type: typeNotification,
    data: dataNotification,
  }) => {
    const {
      notification,
      from,
      sentTime,
      data,
      collapseKey,
    } = dataNotification.snapshot;
    const insert_dataNotification = {
      id: `${typeNotification + new Date().getTime()}`,
      type: typeNotification,
      informations: {notification, from, sentTime, data, collapseKey},
    };

    return {
      ...state,
      allNotification:
        // Check length data. If not yet data to do insert first data.
        // If data have to do insert new data and prev all data.
        !!!lengthAllNotification
          ? [insert_dataNotification]
          : [insert_dataNotification, ...state.allNotification],
    };
  };

  switch (type) {
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        notificationData: [...state.notificationData, payload],
      });
    case VALIDATION_DATE_NOTIFICATION:
      return {...state, notificationData: payload};
    case DELETE_NOTIFICATION:
      return {...state, notificationData: payload};
    case SETTING_NOTIFICATION:
      return {...state, settingNotification: payload};
    case SETTING_STATUS:
      return {...state, settingStatus: payload};
    case SETTING_MESSAGE:
      return {...state, settingMessage: payload};
    case SETALLNOTIFICATION_TOSTORE:
      return _insertPropInPayload(payload);
    default:
      return state;
  }
};
