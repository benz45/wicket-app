import React, {useState, useEffect} from 'react';
import {View, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {
  Switch,
  TextInput,
  Text,
  Caption,
  Card,
  Portal,
  Dialog,
  Surface,
  IconButton,
  Colors,
  ProgressBar,
  Divider,
  Avatar,
  HelperText,
} from 'react-native-paper';

// Database
import database from '@react-native-firebase/database';

// Components
import Toast from '../src/toast-paper';
import {Button} from '../components/CustomBtn';

// Styles
import styled from 'styled-components';
import {H4, H2} from '../styles/styled';

// Actions
import {
  action_uploadImageDoor,
  action_addDoor,
} from '../src/actions/actions_firebase';

// Image picker
import ImagePicker from 'react-native-image-picker';

// Redux
import {useSelector} from 'react-redux';

const Input = styled(TextInput)`
  margin: 6px 0px 6px 0;
`;

const AddProductScreen = ({jumpTo}) => {
  const {background, accent, disabled} = useSelector(
    (reducer) => reducer.ThemeReducer.theme.colors,
  );
  const {
    currentUser: {
      user: {displayName},
    },
    connections,
  } = useSelector((reducer) => reducer.FirebaseReducer);

  const [key, setKey] = useState('');
  const [busy, setBasy] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [isUri, setUri] = useState();
  const [status, setStatus] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [dialogImagePicker, setDialogImagePicker] = useState(false);
  const [isImage, setImage] = useState(false);
  const [isProgress, setProgress] = useState(0);
  const [userGetImage, setUserGetImage] = useState(false);
  const [visibleProductkey, setVisibleProductkey] = useState({
    visible: false,
    message: '',
    type: 'info',
    error: false,
  });

  const clearState = () => {
    setUri();
    setProgress(0);
    setDesc('');
    setName('');
    setKey('');
    setStatus(true);
    setImage(false);
  };

  // Button submit.
  const _submit = async () => {
    setBasy(true);

    // Validate value
    if (key.trim() === '' || name.trim() === '' || desc.trim() === '') {
      setBasy(false);
      return Toast('You not specified.');
    } else if (key.length != 6) {
      setBasy(false);
      return setVisibleProductkey({
        visible: true,
        message: 'Please product key entered correctly.',
        type: 'error',
        error: true,
      });
    } else if (!userGetImage) {
      setBasy(false);
      return Toast('Please image entered .');
    }

    // New date
    const newDate = new Date(Date.now());
    const dateString = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}`;

    // Upload image to firebase storage and get link.
    const imageLink = await action_uploadImageDoor(isUri.uri, key);

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

    clearState();
    setBasy(false);
    Keyboard.dismiss();
  };

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
      setUserGetImage(true);
      setUri(uri);
      setImage(source);
    }
  };

  const getImage = () => {
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
  const showDialogImagePicker = () => setDialogImagePicker(true);
  const hideDialogImagePicker = () => {
    setDialogImagePicker(false);
  }; // Image picker************************************************************************

  // Validate product key*******************************************************************
  const checkProductKey = async () => {
    const res = await database()
      .ref('connections/datas')
      .once('value', (res) => {
        return res.val();
      });
    return res;
  };

  useEffect(() => {
    if (key.length === 6) {
      checkProductKey().then((res) => {
        const responseArr = Object.values(res.val());
        const responseKey = responseArr.filter((snapshot) => {
          return snapshot.no == key;
        });
        if (!!responseKey[0]) {
          setVisibleProductkey({
            visible: false,
            message: '',
            type: 'info',
            error: false,
          });
          if (responseKey[0].appConnection) {
            setVisibleProductkey({
              visible: true,
              message: 'Product key connected.',
              type: 'error',
              error: true,
            });
          } else {
            setVisibleProductkey({
              visible: true,
              message: 'Can be connected.',
              type: 'info',
              error: false,
            });
          }
        } else {
          setVisibleProductkey({
            visible: true,
            message: 'Product key not found.',
            type: 'error',
            error: true,
          });
        }
      });
    } else {
      setVisibleProductkey({visible: false, message: '', type: 'info'});
    }
  }, [key]);
  // Validate product key*******************************************************************

  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 30,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', marginBottom: 16}}>
          {!isImage || typeof isImage == 'undefined' ? (
            <TouchableOpacity onPress={getImage}>
              <Surface
                style={{
                  backgroundColor: background,
                  height: 160,
                  width: 160,
                  borderColor: accent,
                  borderWidth: 1,
                  borderRadius: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 4,
                }}>
                <IconButton icon="camera" color={accent} size={30} />
              </Surface>
            </TouchableOpacity>
          ) : (
            <Avatar.Image size={160} source={isImage} />
          )}
        </View>
        <Text style={{color: accent, marginVertical: 10}}>Product key</Text>
        {/* <Card> */}
        {/* <Card.Content style={{marginHorizontal: 8, marginTop: 15}}> */}
        <View style={{marginHorizontal: 8, marginTop: 0}}>
          <Input
            error={visibleProductkey.error}
            maxLength={6}
            value={key}
            label="XX-XXX-X"
            mode="outlined"
            // style={{backgroundColor: '#212121'}}
            onChange={(e) => setKey(e.nativeEvent.text)}
          />
          <HelperText
            type={visibleProductkey.type}
            visible={visibleProductkey.visible}>
            {visibleProductkey.message}
          </HelperText>
        </View>
        {/* </Card.Content>
        </Card> */}
        <Text style={{color: accent, marginVertical: 10}}>More details</Text>
        {/* <Card>
          <Card.Content style={{marginHorizontal: 8, marginTop: 15}}> */}
        <View style={{marginHorizontal: 8, marginTop: 0}}>
          <Input
            value={name}
            label="Name"
            // mode="outlined"
            // style={{backgroundColor: '#212121'}}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
          <Input
            value={desc}
            label="Description"
            // mode="outlined"
            // style={{backgroundColor: '#212121'}}
            onChange={(e) => setDesc(e.nativeEvent.text)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text>
              Default status{'\t\n'}
              <Caption>Open</Caption>
            </Text>

            <Switch
              style={{flex: 1}}
              value={status}
              onValueChange={() => setStatus(!status)}
            />
          </View>
        </View>
        {/* </Card.Content>
        </Card> */}
        <Button
          mode="contained"
          loading={busy}
          onPress={() => _submit()}
          style={{marginVertical: 18}}>
          {busy ? 'Loading' : 'Submit'}
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

          <Dialog visible={dialog} onDismiss={hideDialog}>
            <Dialog.Content>
              <View style={{alignItems: 'center'}}>
                <IconButton
                  icon="checkbox-marked-circle-outline"
                  color={Colors.green400}
                  size={50}
                />
                <H2>Insert successful</H2>
                <H4 style={{color: '#757575'}}>
                  Lorem ipsum odor amet, consectetuer.
                </H4>
              </View>
            </Dialog.Content>
            <Dialog.Actions style={{justifyContent: 'space-between'}}>
              <Button
                onPress={() => {
                  hideDialog();
                  jumpTo('home');
                }}>
                Go Home
              </Button>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
};
export default AddProductScreen;
