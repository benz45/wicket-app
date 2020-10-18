import {useEffect, useReducer} from 'react';
import {Keyboard} from 'react-native';
// Image picker
import ImagePicker from 'react-native-image-picker';

// Components
import Toast from '../../src/toast-paper';
import db from '@react-native-firebase/database';

// Actions
import {
  action_uploadImageDoor,
  action_addDoor,
} from '../../src/actions/actions_firebase';

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

// TODO: Image picker
const options = {
  title: 'Select image',
  storageOptions: {
    path: 'images',
  },
  maxWidth: 640,
  maxHeight: 480,
  quality: 0.5,
};

// *Initial state
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
    case SET_URI:
      return Object.assign({}, state, {
        uri: payload,
      });
    case SET_IMAGE:
      return Object.assign({}, state, {
        uri: payload.uri,
        image: payload.source,
        userGetImage: true,
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

// !Custom hook.
const useReducerAddProduct = (key = '', displayName = '') => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkProductKey = async (key) => {
    Keyboard.dismiss();
    dispatch({type: FETCH_KEY_DATA});
    await db()
      .ref('connections/datas')
      .once('value', (snapshot) => {
        const data = snapshot.val();
        const dataToArr = Object.values(data).filter((res) => {
          return res.no == key;
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

  // Check connection key.
  useEffect(() => {
    if (state.key.length === 6) {
      checkProductKey(state.key);
    } else if (!!state.isKey.visible && state.key.length < 6) {
      dispatch({type: RESET_ISKEY});
    }
  }, [state.key]);

  const _imageResponse = (response) => {
    if (response.didCancel) {
      if (!!!state.userGetImage) {
        dispatch({type: USER_NOT_GETIMAGE});
      }
    } else if (response.error) {
      Toast(response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const uri = response.path;
      const source = {uri: `data:image/jpeg;base64,${response.data}`};
      dispatch({type: SET_IMAGE, payload: {uri, source}});
    }
  };

  const _setKey = (text) => dispatch({type: SETKEY, payload: text});
  const _setName = (value) => dispatch({type: SETNAME, payload: value});
  const _setDesc = (value) => dispatch({type: SETDESC, payload: value});
  const _setStatus = () => dispatch({type: SETSTATUS});
  const _resetKey = () => dispatch({type: RESET_KEY});

  const _showDialog = () => {
    dispatch({type: SHOW_DIALOG});
  };
  const _hideDialog = () => {
    dispatch({type: HIDE_DIALOG});
  };

  const _onShowDialogImagePicker = () => {
    dispatch({type: SHOW_DIALOG_IMAGEPICKER});
  };

  const _hideDialogImagePicker = () => {
    dispatch({type: HIDE_DIALOG_IMAGEPICKER});
  };

  const _getImageFromCamera = () => {
    _hideDialogImagePicker();
    ImagePicker.launchCamera(options, _imageResponse);
  };

  const _getImageFromGallery = () => {
    _hideDialogImagePicker();
    ImagePicker.launchImageLibrary(options, _imageResponse);
  };

  const _confirmAddProduct = async () => {
    dispatch({type: FETCH_KEY_DATA});
    if (
      key.trim() === '' ||
      state.name.trim() === '' ||
      state.desc.trim() === ''
    ) {
      dispatch({type: RESET_ISKEY});
      return Toast('You not specified.');
    } else if (!state.userGetImage) {
      dispatch({type: RESET_ISKEY});
      return Toast('Please image entered .');
    }

    // New date
    const newDate = new Date(Date.now());
    const dateString = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}`;

    // Upload image to firebase storage and get link.
    const imageLink = await action_uploadImageDoor(state.uri, key);

    // Create new door.
    await action_addDoor(
      key,
      state.name,
      state.desc,
      state.status,
      imageLink,
      displayName,
      dateString,
    )
      .then(() => _showDialog())
      .catch((error) => alert(error.message));

    Keyboard.dismiss();
    dispatch({type: RESET_ISKEY});
  };

  const _disableBtn = !Boolean(
    (key && state.name && state.desc && state.uri) ||
      state.isKey.type === 'KEY_CAN_CONNECTED',
  );

  const _loading = () => state.isKey.type == 'loading';

  return {
    state,
    dispatch,
    _setKey,
    _setName,
    _setDesc,
    _setStatus,
    _resetKey,
    _disableBtn,
    _loading,
    _getImageFromCamera,
    _getImageFromGallery,
    _showDialog,
    _hideDialog,
    _hideDialogImagePicker,
    _onShowDialogImagePicker,
    _confirmAddProduct,
  };
};

export default useReducerAddProduct;
