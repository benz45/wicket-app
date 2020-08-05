// Picker Image
import ImagePicker from 'react-native-image-picker';

const showImagePicker = (cbUri, cbSource) => {
  ImagePicker.launchImageLibrary({}, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const uri = {uri: response.path};

      // You can also display the image using data:
      const source = {uri: 'data:image/jpeg;base64,' + response.data};

      cbUri(uri);
      cbSource(source);
    }
  });
};

export default showImagePicker