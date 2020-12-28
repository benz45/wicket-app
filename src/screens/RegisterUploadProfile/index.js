import React from 'react';

import * as Styled from 'root/src/Styles/Screens/Styled_RegisterUploadProfile';

// Redux
import {useSelector} from 'react-redux';

import useRegisterUploadProfile from 'root/src/Screens/RegisterUploadProfile/useRegisterUploadProfile';

const RegisterUploadProfile = () => {
  const {user} = useSelector((store) => store.CurrentUserReducer);

  const {
    state,
    _sourceImage,
    _onPressSkip,
    _setName,
    _upload,
    _onShowDialogImagePicker,
    DialogSelectImage,
  } = useRegisterUploadProfile(user.email);

  return (
    <React.Fragment>
      <Styled.ContainerAvatar>
        <Styled.TouchableAvatar onPress={() => _onShowDialogImagePicker()}>
          <Styled.AvatarImage source={_sourceImage} />
          <Styled.AvatarIcon />
        </Styled.TouchableAvatar>
      </Styled.ContainerAvatar>
      <Styled.ContainerSubhead>
        <Styled.Subhead>Update Profile</Styled.Subhead>
        <Styled.Title>{user.email}</Styled.Title>
        <Styled.Caption>You can upload JPG or PNG files</Styled.Caption>
      </Styled.ContainerSubhead>
      <Styled.NameText
        value={state.name}
        error={state.error.name}
        onChange={(e) => _setName(e.nativeEvent.text)}
      />
      <Styled.BtnUpload onPress={_upload} loading={state.busy.btnUpload}>
        Upload
      </Styled.BtnUpload>
      <Styled.BtnSkip
        loading={state.busy.btnSkip}
        onPress={() => _onPressSkip()}>
        Skip
      </Styled.BtnSkip>
      <DialogSelectImage />
    </React.Fragment>
  );
};

export default RegisterUploadProfile;
