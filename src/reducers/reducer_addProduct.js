import * as actions from 'root/src/actionsType';

const initialState = {
  busy: false,
  key: '',
  isKey: {
    visible: false,
    message: '',
    type: 'info',
    error: false,
  },
  isUri: '',
  isImage: false,
  name: '',
  description: '',
  status: true,
  dialogImagePicker: false,
  dialogInsertSuccessful: false,
  userGetImage: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.SET_PRODUCTKEY_TOSTORE:
      return {...state, key: payload};
    case actions.SET_BUSY_ON:
      return {...state, busy: true};
    case actions.SET_BUSY_ON:
      return {...state, busy: false};

    case actions.PRODUCTKEY_CONNECTED:
      return {
        ...state,
        isKey: {
          visible: true,
          message: 'Product key connected.',
          type: 'error',
          error: true,
        },
      };
    case actions.PRODUCTKEY_NOT_YET_CONNECTION:
      return {
        ...state,
        isKey: {
          visible: true,
          message: 'Can be connected.',
          type: 'info',
          error: false,
        },
      };
    case actions.PRODUCTKEY_NOT_FOUND:
      return {
        ...state,
        isKey: {
          visible: true,
          message: 'Product key not found.',
          type: 'error',
          error: true,
        },
      };
    case actions.RESET_ISKEY:
      return {
        ...state,
        isKey: {
          visible: false,
          message: '',
          type: 'info',
          error: false,
        },
      };

    default:
      return state;
  }
};
