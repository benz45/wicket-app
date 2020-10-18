import React, {useState, useEffect} from 'react';
import {View, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {
  Switch,
  Text,
  Caption,
  Portal,
  Dialog,
  Surface,
  IconButton,
  Colors,
  TextInput,
  Avatar,
} from 'react-native-paper';

// Styled
import * as Styled from '../../styles/screens/AddProductScreens/Styled_AddProduct_NameAndDescription';

// Components
import Toast from '../../src/toast-paper';
import {Button} from '../../components/CustomBtn';
import {H4, H2} from '../../styles/styled';

// Actions
import {
  action_uploadImageDoor,
  action_addDoor,
} from '../../src/actions/actions_firebase';

// Image picker
import ImagePicker from 'react-native-image-picker';

// Redux
import {useSelector} from 'react-redux';

export default function AddProduct_NameAndDescription({jumpTo}) {
  const {
    currentUser: {
      user: {displayName},
    },
  } = useSelector((reducer) => reducer.FirebaseReducer);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [isUri, setUri] = useState();
  const [status, setStatus] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [dialogImagePicker, setDialogImagePicker] = useState(false);
  const [isImage, setImage] = useState(false);
  const [userGetImage, setUserGetImage] = useState(false);

  // Show & Hide Dialog.
  const showDialog = () => setDialog(true);
  const hideDialog = () => {
    setDialog(false);
  };

  // Image picker************************************************************************
  const options = {
    title: 'Select image',
    storageOptions: {
      path: 'images',
    },
    maxWidth: 640,
    maxHeight: 480,
    quality: 0.5,
  };

  const _imageResponse = (response) => {
    if (response.didCancel) {
      setUserGetImage(false);
    } else if (response.error) {
      Toast(response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const uri = {uri: response.path};
      const source = {uri: 'data:image/jpeg;base64,' + response.data};
      setUserGetImage(true);
      setUri(uri);
      setImage(source);
    }
  };

  const _getImageFromCamera = () => {
    hideDialogImagePicker();
    ImagePicker.launchCamera(options, _imageResponse);
  };
  const _getImageFromGallery = () => {
    hideDialogImagePicker();
    ImagePicker.launchImageLibrary(options, _imageResponse);
  };
  const _showDialogImagePicker = () => setDialogImagePicker(true);
  const hideDialogImagePicker = () => {
    setDialogImagePicker(false);
  }; // Image picker************************************************************************

  const _clearState = () => {
    setUri();
    setProgress(0);
    setDesc('');
    setName('');
    setKey('');
    setStatus(true);
    setImage(false);
  };

  const _getImage = () => {
    _showDialogImagePicker();
  };

  // Button submit.
  const _action_submit = async () => {
    setBasy(true);
    navigate('Stack_AddProduct_NameAndDescription');

    // // Validate value
    // if (key.trim() === '' || name.trim() === '' || desc.trim() === '') {
    //   setBasy(false);
    //   return Toast('You not specified.');
    // } else if (key.length != 6) {
    //   setBasy(false);
    //   return setVisibleProductkey({
    //     visible: true,
    //     message: 'Please product key entered correctly.',
    //     type: 'error',
    //     error: true,
    //   });
    // } else if (!userGetImage) {
    //   setBasy(false);
    //   return Toast('Please image entered .');
    // }

    // // New date
    // const newDate = new Date(Date.now());
    // const dateString = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}`;

    // // Upload image to firebase storage and get link.
    // const imageLink = await action_uploadImageDoor(isUri.uri, key);

    // Create new door.
    await action_addDoor(
      key,
      name,
      desc,
      status,
      imageLink,
      displayName,
      dateString,
    )
      .then(() => showDialog())
      .catch((error) => alert(error));

    _clearState();
    setBasy(false);
    Keyboard.dismiss();
  };

  const _action_goHome = () => {
    hideDialog();
    jumpTo('home');
  };

  return (
    <Styled.Container>
      <Styled.ProductKeyText>Product key</Styled.ProductKeyText>
      <Styled.ShowProductKeyText>TE25FE</Styled.ShowProductKeyText>

      {/* Image picker. Select and show image. */}
      <Styled.ContainerImagePicker>
        {!isImage || typeof isImage == 'undefined' ? (
          <TouchableOpacity onPress={_getImage}>
            <Styled.BorderCameraIcon>
              <Styled.IconCamera />
            </Styled.BorderCameraIcon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={_getImage}>
            <Styled.AvatarIamge source={isImage} />
          </TouchableOpacity>
        )}
      </Styled.ContainerImagePicker>
      <Styled.MoreDetailText>More details</Styled.MoreDetailText>

      {/* Text input. */}
      <Styled.ContainerTextInput>
        <Styled.TextInputName
          value={name}
          onChange={(e) => setName(e.nativeEvent.text)}
        />
        <Styled.TextInputDescription
          value={desc}
          onChange={(e) => setDesc(e.nativeEvent.text)}
        />
      </Styled.ContainerTextInput>

      {/* Default switch. */}
      <Styled.ContainerDefaultSwitch>
        <Styled.DefaultSwitchText>
          Default status{'\t\n'}
          <Styled.DefaultSwitchCaption>Open</Styled.DefaultSwitchCaption>
        </Styled.DefaultSwitchText>
        <Styled.DefaultSwitch
          value={status}
          onValueChange={() => setStatus(!status)}
        />
      </Styled.ContainerDefaultSwitch>

      {/* Confirm button */}
      <Styled.SubmitButton>Confirm</Styled.SubmitButton>

      <Portal>
        {/* Dialog open camera and select image from gallery.  */}
        <Dialog visible={dialogImagePicker} onDismiss={hideDialogImagePicker}>
          <Dialog.Title>Directly Launch</Dialog.Title>
          <Styled.DialogContent>
            <Styled.DialogIconContent>
              <Styled.DialogIconCamera onPress={() => _getImageFromCamera()} />
              <Text>Camera</Text>
            </Styled.DialogIconContent>
            <Styled.DialogIconContent>
              <Styled.DialogIconGallery
                onPress={() => _getImageFromGallery()}
              />
              <Text>Gallery</Text>
            </Styled.DialogIconContent>
          </Styled.DialogContent>
        </Dialog>

        {/* Dialog message insert data successful. */}
        <Dialog visible={dialog} onDismiss={hideDialog}>
          <Dialog.Content>
            <Styled.DialogSuccessfulContainer>
              <Styled.IconCheck />
              <Styled.HeadTextOne>Insert successful</Styled.HeadTextOne>
              <Styled.HeadTextTwo>
                Lorem ipsum odor amet, consectetuer.
              </Styled.HeadTextTwo>
            </Styled.DialogSuccessfulContainer>
          </Dialog.Content>
          <Styled.DialogActions>
            <Button onPress={_action_goHome}>Go Home</Button>
            <Button onPress={hideDialog}>Done</Button>
          </Styled.DialogActions>
        </Dialog>
      </Portal>
    </Styled.Container>
  );
}
