import React, {useReducer} from 'react';
import {Platform} from 'react-native';

// Image picker
import ImagePicker from 'react-native-image-picker';

import Toast from 'root/src/toast-paper';

// Styled
import * as Styled from 'root/src/styles/custom_hook/Styled_useSelectImage';

// Action type
const SET_IMAGE = 'SET_IMAGE';
const USER_NOT_GETIMAGE = 'USER_NOT_GETIMAGE';
const SHOW_DIALOG_IMAGEPICKER = 'SHOW_DIALOG_IMAGEPICKER';
const HIDE_DIALOG_IMAGEPICKER = 'HIDE_DIALOG_IMAGEPICKER';

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

// ?Initial state
const initialState = {
  uri: '',
  image: '',
  dialogImagePicker: false,
};

// TODO: Reducer
const reducer = (state, {type, payload}) => {
  switch (type) {
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
    default:
      throw new Error();
  }
};

export default function indexUseSelectImage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Response image picker.
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
      // Image set base64.
      const source = {uri: `data:image/jpeg;base64,${response.data}`};

      // Platform.
      if (Platform.OS === 'ios') {
        const iOS_uri = response.uri;
        dispatch({type: SET_IMAGE, payload: {uri: iOS_uri, source}});
      } else if (Platform.OS === 'android') {
        const android_uri = response.path;
        dispatch({type: SET_IMAGE, payload: {uri: android_uri, source}});
      }
    }
  };

  // Show dialog image picker.
  const _onShowDialogImagePicker = () =>
    dispatch({type: SHOW_DIALOG_IMAGEPICKER});

  // Hide dialog image picker.
  const _hideDialogImagePicker = () =>
    dispatch({type: HIDE_DIALOG_IMAGEPICKER});

  // Action get image from carema.
  const _getImageFromCamera = () => {
    _hideDialogImagePicker();
    ImagePicker.launchCamera(options, _imageResponse);
  };

  // Action get image from gallery
  const _getImageFromGallery = () => {
    _hideDialogImagePicker();
    ImagePicker.launchImageLibrary(options, _imageResponse);
  };

  const _components = () => (
    <Styled.Portal>
      <Styled.DialogContainer
        visible={state.dialogImagePicker}
        onDismiss={_hideDialogImagePicker}>
        <Styled.DialogTitle>Directly Launch</Styled.DialogTitle>
        <Styled.DialogContent>
          <Styled.DialogIconContent>
            <Styled.DialogIconCamera onPress={_getImageFromCamera} />
            <Styled.DialogText>Camera</Styled.DialogText>
          </Styled.DialogIconContent>
          <Styled.DialogIconContent>
            <Styled.DialogIconGallery onPress={_getImageFromGallery} />
            <Styled.DialogText>Gallery</Styled.DialogText>
          </Styled.DialogIconContent>
        </Styled.DialogContent>
      </Styled.DialogContainer>
    </Styled.Portal>
  );

  return {state, _components, _onShowDialogImagePicker, _hideDialogImagePicker};
}
