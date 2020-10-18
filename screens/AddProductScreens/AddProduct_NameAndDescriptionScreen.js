import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Portal, Dialog} from 'react-native-paper';

// Styled
import * as Styled from '../../styles/screens/AddProductScreens/Styled_AddProduct_NameAndDescription';

// Custom hook.
import useDispatch_Add_Product from './useDispatch_Add_Product';

// Redux
import {useSelector} from 'react-redux';

// !AddProduct_NameAndDescription
export default function AddProduct_NameAndDescription({
  navigation: {navigate},
  route: {
    params: {paramKey: key},
  },
}) {
  const {
    currentUser: {
      user: {displayName},
    },
  } = useSelector((reducer) => reducer.FirebaseReducer);

  // Custom hook.
  const {
    state,
    _setName,
    _setDesc,
    _setStatus,
    _hideDialog,
    _loading,
    _confirmAddProduct,
    _getImageFromCamera,
    _getImageFromGallery,
    _hideDialogImagePicker,
    _onShowDialogImagePicker,
  } = useDispatch_Add_Product(key, displayName);

  const _jumpToHome = async () => {
    await _confirmAddProduct();
  };

  return (
    <Styled.Container>
      <Styled.ProductKeyText>Product key</Styled.ProductKeyText>
      <Styled.ShowProductKeyText>{key && key}</Styled.ShowProductKeyText>

      {/* Image picker. Select and show image. */}
      <Styled.ContainerImagePicker>
        {!state.image || typeof state.image == 'undefined' ? (
          <TouchableOpacity onPress={_onShowDialogImagePicker}>
            <Styled.BorderCameraIcon>
              <Styled.IconCamera />
            </Styled.BorderCameraIcon>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={_onShowDialogImagePicker}>
            <Styled.AvatarIamge source={state.image} />
          </TouchableOpacity>
        )}
      </Styled.ContainerImagePicker>
      <Styled.MoreDetailText>More details</Styled.MoreDetailText>

      {/* Text input. */}
      <Styled.ContainerTextInput>
        <Styled.TextInputName
          value={state.name && state.name}
          onChange={(e) => _setName(e.nativeEvent.text)}
        />
        <Styled.TextInputDescription
          value={state.desc && state.decs}
          onChange={(e) => _setDesc(e.nativeEvent.text)}
        />
      </Styled.ContainerTextInput>

      {/* Default switch. */}
      <Styled.ContainerDefaultSwitch>
        <Styled.DefaultSwitchText>
          Default status{'\t\n'}
          <Styled.DefaultSwitchCaption>Open</Styled.DefaultSwitchCaption>
        </Styled.DefaultSwitchText>
        <Styled.DefaultSwitch
          value={!!state.status}
          onValueChange={_setStatus}
        />
      </Styled.ContainerDefaultSwitch>

      {/* Confirm button */}
      <Styled.SubmitButton onPress={_jumpToHome} loading={_loading()}>
        Confirm
      </Styled.SubmitButton>

      {/* All dialog. */}
      <Portal>
        {/* Dialog open camera and select image from gallery.  */}
        <Dialog
          visible={state.dialogImagePicker && state.dialogImagePicker}
          onDismiss={_hideDialogImagePicker}>
          <Dialog.Title>Directly Launch</Dialog.Title>
          <Styled.DialogContent>
            <Styled.DialogIconContent>
              <Styled.DialogIconCamera onPress={_getImageFromCamera} />
              <Text>Camera</Text>
            </Styled.DialogIconContent>
            <Styled.DialogIconContent>
              <Styled.DialogIconGallery onPress={_getImageFromGallery} />
              <Text>Gallery</Text>
            </Styled.DialogIconContent>
          </Styled.DialogContent>
        </Dialog>

        {/* Dialog message insert data successful. */}
        <Dialog visible={state.dialog} onDismiss={_hideDialog}>
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
            <Styled.BtnGoHome onPress={() => navigate('Stack_HomeDrawer')}>
              Go home
            </Styled.BtnGoHome>
          </Styled.DialogActions>
        </Dialog>
      </Portal>
    </Styled.Container>
  );
}
