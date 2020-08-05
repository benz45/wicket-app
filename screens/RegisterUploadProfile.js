import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Caption,
  Subheading,
  TextInput,
  HelperText,
  Portal,
  Dialog,
  IconButton,
  Text,
} from 'react-native-paper';
import Styled from 'styled-components';
import {useNavigation, useRoute} from '@react-navigation/native';

// Redux
import {useSelector} from 'react-redux';

// Action
import {action_userUpdate} from '../src/actions/actions_firebase';

// Component
import Button from '../components/CustomButton';

// ImagePicker
import ImagePicker from 'react-native-image-picker';

// Toast
import Toast from '../src/toast-paper';

const RegisterUploadProfile = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const [uri, setUri] = useState(0);
  const [busy, setBusy] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [userGetImage, setUserGetImage] = useState(false);
  const [dialogImagePicker, setDialogImagePicker] = useState(false);
  const [isImage, setImage] = useState(require('../assets/profile.png'));
  const [name, setName] = useState('');
  const {accent, text} = useSelector(
    (reducer) => reducer.ThemeReducer.theme.colors,
  );

  // On Press skip.
  const _onPressSkip = async () => {
    await action_userUpdate(params.username, false);
    navigate('RegisterComplate');
  };

  /* // Image picker************************************************************************ */
  const options = {
    title: 'Select image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxWidth: 640,
    maxHeight: 480,
    quality: 0.5,
  };

  const imageResponse = (response) => {
    if (response.didCancel) {
      setUserGetImage(false);
    } else if (response.error) {
      Toast(response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const uri = {uri: response.path};
      const source = {uri: 'data:image/jpeg;base64,' + response.data};
      setUri(uri);
      setImage(source);
    }
  };

  const showDialogImagePicker = () => setDialogImagePicker(true);
  const hideDialogImagePicker = () => {
    setDialogImagePicker(false);
  };

  const _getImage = () => {
    setUserGetImage(true);
    showDialogImagePicker();
  };
  const _getImageFromCamera = () => {
    hideDialogImagePicker();
    ImagePicker.launchCamera(options, imageResponse);
  };
  const _getImageFromGallery = () => {
    hideDialogImagePicker();
    ImagePicker.launchImageLibrary(options, imageResponse);
  };
  /* // Image picker************************************************************************ */

  const _uploadImage = async () => {
    setBusy(true);

    // Validate if user get image.
    // if (userGetImage && !!!name.length) {
    //   setBusy(false);
    //   setHasErrors(true);
    //   return Toast('Username not specified.');
    // } else
    if (userGetImage || (!userGetImage && !!!name.length)) {
      setBusy(false);
      setHasErrors(true);
      return Toast('Username not specified.');
    } else {
      await action_userUpdate(name, userGetImage ? uri.uri : false);
    }

    setBusy(false);
    navigate('RegisterComplate');
  };

  useEffect(() => {
    if (name.length !== 0) {
      setHasErrors(false);
    }
  }, [name]);

  return (
    <>
      <View style={{alignItems: 'center'}}>
        <View style={{width: 120, flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={_getImage}>
            <Avatar.Image source={isImage} size={120} />
            <Avatar.Icon
              icon="plus"
              color={text}
              size={30}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                backgroundColor: accent,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Subheading>Create Photo</Subheading>
        <Caption>You can upload JPG or PNG files</Caption>
      </View>
      <TextInput
        value={name}
        label="Name"
        style={{marginTop: 16}}
        error={hasErrors}
        onChange={(e) => setName(e.nativeEvent.text)}
      />
      <HelperText type="error" visible={hasErrors}>
        Not specified!
      </HelperText>
      <Button
        style={{marginTop: 10}}
        mode="contained"
        loading={busy}
        onPress={_uploadImage}>
        Upload
      </Button>
      <Button style={{marginTop: 10}} onPress={_onPressSkip}>
        Skip
      </Button>
      <Portal>
        <Dialog visible={dialogImagePicker} onDismiss={hideDialogImagePicker}>
          <Dialog.Title>Directly Launch</Dialog.Title>
          <Dialog.Content
            style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <IconButton
                size={36}
                style={{
                  marginHorizontal: 28,
                  marginVertical: 20,
                  borderColor: accent,
                  borderWidth: 2,
                }}
                onPress={() => _getImageFromCamera()}
                color={accent}
                icon="camera"
              />
              <Text>Camera</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <IconButton
                size={36}
                style={{
                  marginHorizontal: 28,
                  marginVertical: 20,
                  borderColor: accent,
                  borderWidth: 2,
                }}
                onPress={() => _getImageFromGallery()}
                color={accent}
                icon="image-size-select-actual"
              />
              <Text>Gallery</Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default RegisterUploadProfile;
