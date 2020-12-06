import {useReducer} from 'react';
// Toast
import Toast from '../../src/toast-paper';

// Navigations
import {useNavigation} from '@react-navigation/native';

// Action
import {action_userUpdate} from '../../src/actions/actions_firebase';

// Custom Hook
import useSelectImage from '../../src/customHook/useSelectImage';

// Action type
const SET_NAME = 'SET_NAME';
const RESET_STATE = 'RESET_STATE';
const ERROR_NAME = 'ERROR_NAME';
const SET_BUSY = 'SET_BUSY';

const initialState = {
  busy: {
    btnUpload: false,
    btnSkip: false,
  },
  name: '',
  error: {
    name: false,
  },
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_NAME:
      return {...state, name: payload, error: {name: false}};
    case ERROR_NAME:
      return {...state, busy: initialState.busy, error: {name: true}};
    case SET_BUSY:
      return {
        ...state,
        busy: {
          ...state.busy,
          [payload.type]: payload.value,
        },
      };
    case RESET_STATE:
      return initialState;
  }
};

export default function useRegisterUploadProfile(username) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Custom hook image picker.
  const {
    state: stateImage,
    _onShowDialogImagePicker,
    _components: DialogSelectImage,
  } = useSelectImage();
  const {navigate} = useNavigation();

  // Set state name.
  const _setName = (value) => {
    dispatch({type: SET_NAME, payload: value});
  };

  // Navigate to register complate.
  const navigateToRegisterComplate = () => {
    navigate('RegisterComplate');
  };

  // On press skip.
  const _onPressSkip = async () => {
    await dispatch({type: SET_BUSY, payload: {type: 'btnSkip', value: true}});
    await action_userUpdate(username, false);
    await dispatch({type: RESET_STATE});
    await navigateToRegisterComplate();
  };

  // On press upload.
  const _upload = async () => {
    await dispatch({type: SET_BUSY, payload: {type: 'btnUpload', value: true}});

    // Validate if user get image.
    if (!!!state.name.length) {
      await dispatch({type: ERROR_NAME});
      return Toast('Name not specified');
    } else {
      await action_userUpdate(
        state.name,
        stateImage.userGetImage ? stateImage.uri : false,
      );
      await dispatch({type: RESET_STATE});
      await navigateToRegisterComplate();
    }
  };

  // Validate image.
  const _sourceImage = stateImage.image
    ? stateImage.image
    : require('../../assets/profile.png');

  return {
    state,
    _sourceImage,
    dispatch,
    _setName,
    _onPressSkip,
    _upload,
    _onShowDialogImagePicker,
    DialogSelectImage,
  };
}
