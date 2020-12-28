import {useReducer} from 'react';
// Toast
import Toast from 'root/src/toast-paper';

// Navigations
import {useNavigation} from '@react-navigation/native';

// Action
import {useSelector, useDispatch} from 'react-redux';
import {action_userUpdate} from 'root/src/Actions/actions_auth';

// Custom Hook
import useSelectImage from 'root/src/Hook/useSelectImage';

// Action type
const SET_NAME = 'SET_NAME';
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
  success: false,
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
  }
};

export default function useRegisterUploadProfile(emailUser) {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {user} = useSelector((store) => store.CurrentUserReducer);
  const [username] = emailUser.split('@wicket.com');

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

  // On press skip.
  const _onPressSkip = async () => {
    try {
      await dispatch({type: SET_BUSY, payload: {type: 'btnSkip', value: true}});
      await action_userUpdate(user.email, username, false);
      await navigate('RegisterComplate');
    } catch (err) {
      console.log(err);
    }
  };

  // On press upload.
  const _upload = async () => {
    try {
      await dispatch({
        type: SET_BUSY,
        payload: {type: 'btnUpload', value: true},
      });

      // Validate if user get image.
      if (!!!state.name.length) {
        await dispatch({type: ERROR_NAME});
        return Toast('Name not specified');
      } else {
        await action_userUpdate(
          user.email,
          state.name,
          stateImage.userGetImage ? stateImage.uri : false,
        );
        await navigate('RegisterComplate');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Validate image.
  const _sourceImage = stateImage.image
    ? stateImage.image
    : require('root/assets/profile.png');

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
