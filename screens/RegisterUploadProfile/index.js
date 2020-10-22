import React from 'react';

import * as Styled from '../../styles/screens/Styled_RegisterUploadProfile';
import {useRoute} from '@react-navigation/native';

import useRegisterUploadProfile from './useRegisterUploadProfile';

const RegisterUploadProfile = () => {
  const {
    params: {username},
  } = useRoute();

  const {
    state,
    _sourceImage,
    _onPressSkip,
    _setName,
    _upload,
    _onShowDialogImagePicker,
    DialogSelectImage,
  } = useRegisterUploadProfile(username);

  return (
    <React.Fragment>
      <Styled.ContainerAvatar>
        <Styled.TouchableAvatar onPress={() => _onShowDialogImagePicker()}>
          <Styled.AvatarImage source={_sourceImage} />
          <Styled.AvatarIcon />
        </Styled.TouchableAvatar>
      </Styled.ContainerAvatar>
      <Styled.ContainerSubhead>
        <Styled.Subhead>Add Profile</Styled.Subhead>
        <Styled.Caption>You can upload JPG or PNG files</Styled.Caption>
      </Styled.ContainerSubhead>
      <Styled.NameText
        value={state.name}
        error={state.error.name}
        onChange={(e) => _setName(e.nativeEvent.text)}
      />
      <Styled.BtnUpload onPress={() => _upload()} loading={state.busy}>
        Upload
      </Styled.BtnUpload>
      <Styled.BtnSkip onPress={() => _onPressSkip()}>Skip</Styled.BtnSkip>
      <DialogSelectImage />
    </React.Fragment>
  );
};

export default RegisterUploadProfile;
