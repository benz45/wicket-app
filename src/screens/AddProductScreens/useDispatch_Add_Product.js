import {useEffect, useReducer} from 'react';
import {Keyboard} from 'react-native';

// Image picker
import useSelectImage from 'root/src/Hook/useSelectImage';

// Components
import Toast from 'root/src/toast-paper';
import db from '@react-native-firebase/database';

// Actions
import {
  action_uploadImageDoor,
  action_addDoor,
} from 'root/src/Actions/actions_firebase';

const KEY_CAN_CONNECTED = 'KEY_CAN_CONNECTED';
const KEY_NOT_FOUND = 'KEY_NOT_FOUND';
const RESET_ISKEY = 'RESET_ISKEY';
const KEY_CONNECTED = 'KEY_CONNECTED';
const FETCH_KEY_DATA = 'FETCH_KEY_DATA';
const USER_NOT_GETIMAGE = 'USER_NOT_GETIMAGE';
const SET_URI = 'SET_URI';
const SET_IMAGE = 'SET_IMAGE';
const SHOW_DIALOG = 'SHOW_DIALOG';
const HIDE_DIALOG = 'HIDE_DIALOG';
const SHOW_DIALOG_IMAGEPICKER = 'SHOW_DIALOG_IMAGEPICKER';
const HIDE_DIALOG_IMAGEPICKER = 'HIDE_DIALOG_IMAGEPICKER';

export const RESET_KEY = 'RESET_KEY';
export const SETKEY = 'SETKEY';
export const SETNAME = 'SETNAME';
export const SETDESC = 'SETDESC';
export const SETSTATUS = 'SETSTATUS';

// ?Initial state
const initialState = {
  isKey: {
    visible: false,
    message: '',
    type: 'info',
    error: false,
  },
  key: '',
  status: true,
  dialog: false,
};

// TODO: Reducer
const reducer = (state, {type, payload}) => {
  switch (type) {
    case SETKEY:
      return Object.assign({}, state, {key: payload});
    case SETNAME:
      return Object.assign({}, state, {name: payload});
    case SETDESC:
      return Object.assign({}, state, {desc: payload});
    case SETSTATUS:
      return Object.assign({}, state, {
        status: !!!state.status,
      });
    case SHOW_DIALOG:
      return Object.assign({}, state, {
        dialog: true,
      });
    case HIDE_DIALOG:
      return Object.assign({}, state, {
        dialog: false,
      });
    case USER_NOT_GETIMAGE:
      return Object.assign({}, state, {userGetImage: false});
    case SHOW_DIALOG_IMAGEPICKER:
      return Object.assign({}, state, {
        dialogImagePicker: true,
      });
    case HIDE_DIALOG_IMAGEPICKER:
      return Object.assign({}, state, {
        dialogImagePicker: false,
      });
    case KEY_CONNECTED:
      return Object.assign({}, state, {
        isKey: {
          visible: true,
          message: 'Product key connected.',
          type: 'error',
          error: true,
        },
      });
    case KEY_CAN_CONNECTED:
      return Object.assign({}, state, {
        isKey: {
          visible: true,
          message: 'Can be connected.',
          type: KEY_CAN_CONNECTED,
          error: false,
        },
      });
    case KEY_NOT_FOUND:
      return Object.assign({}, state, {
        isKey: {
          visible: true,
          message: 'Product key not found.',
          type: 'error',
          error: true,
        },
      });
    case FETCH_KEY_DATA:
      return Object.assign({}, state, {
        isKey: {
          visible: true,
          message: 'Loading...',
          type: 'loading',
          error: false,
        },
      });
    case RESET_ISKEY:
      return Object.assign({}, state, {
        isKey: {
          visible: false,
          message: '',
          type: 'info',
          error: false,
        },
      });
    case RESET_KEY:
      return Object.assign({}, state, {
        key: '',
      });
    default:
      throw new Error();
  }
};

// !Custom hook function.
const useReducerAddProduct = (key = '', displayName = '') => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Custom hook image picker.
  const {
    state: stateImage,
    _onShowDialogImagePicker,
    _components: DialogSelectImage,
  } = useSelectImage();

  // Check used product key from database.
  const checkProductKey = async (key) => {
    Keyboard.dismiss();
    dispatch({type: FETCH_KEY_DATA});
    await db()
      .ref('connections/datas')
      .once('value', (snapshot) => {
        const data = snapshot.val();
        const dataToArr = Object.values(data).filter((res) => {
          return res.key == key;
        });

        if (!!dataToArr[0]) {
          if (dataToArr[0].appConnection) {
            dispatch({type: KEY_CONNECTED});
          } else {
            dispatch({type: KEY_CAN_CONNECTED});
          }
        } else {
          dispatch({type: KEY_NOT_FOUND});
        }
      });
  };

  // The trap check connection key.
  useEffect(() => {
    if (state.key.length === 6) {
      checkProductKey(state.key);
    } else if (!!state.isKey.visible && state.key.length < 6) {
      dispatch({type: RESET_ISKEY});
    }
  }, [state.key]);

  //Basic dispatch.
  const _setKey = (text) => dispatch({type: SETKEY, payload: text});
  const _setName = (value) => dispatch({type: SETNAME, payload: value});
  const _setDesc = (value) => dispatch({type: SETDESC, payload: value});
  const _setStatus = () => dispatch({type: SETSTATUS});
  const _resetKey = () => dispatch({type: RESET_KEY});

  // Show & Hide dialog if add a product successful.
  const _showDialog = () => dispatch({type: SHOW_DIALOG});
  const _hideDialog = () => dispatch({type: HIDE_DIALOG});

  // Action confirm add product.
  const _confirmAddProduct = async () => {
    dispatch({type: FETCH_KEY_DATA});
    // Validation data.
    if (
      key.trim() === '' ||
      state.name.trim() === '' ||
      state.desc.trim() === ''
    ) {
      dispatch({type: RESET_ISKEY});
      return Toast('You not specified.');
    } else if (!stateImage.userGetImage) {
      dispatch({type: RESET_ISKEY});
      return Toast('Please image entered .');
    }

    // New date time.
    const newDate = new Date(Date.now());
    const dateString = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}`;

    // Upload image to firebase storage and get link.
    await action_uploadImageDoor(stateImage.uri, key).then(async (res) => {
      if (!res) {
        return Toast("Can't upload the image from camera");
      }
      await action_addDoor(
        key,
        state.name,
        state.desc,
        state.status,
        res,
        displayName,
        dateString,
      )
        .then(() => _showDialog())
        .catch((error) => alert(error.message));
    });

    // Create new door.

    Keyboard.dismiss();
    dispatch({type: RESET_ISKEY});
  };

  //Validation closure button to boolean.
  const _disableBtn = !Boolean(
    (key && state.name && state.desc && state.uri) ||
      state.isKey.type === 'KEY_CAN_CONNECTED',
  );

  const _loading = () => state.isKey.type == 'loading';

  return {
    state,
    stateImage,
    dispatch,
    _setKey,
    _setName,
    _setDesc,
    _setStatus,
    _resetKey,
    _disableBtn,
    _loading,
    DialogSelectImage,
    _onShowDialogImagePicker,
    _showDialog,
    _hideDialog,
    _confirmAddProduct,
  };
};

export default useReducerAddProduct;
