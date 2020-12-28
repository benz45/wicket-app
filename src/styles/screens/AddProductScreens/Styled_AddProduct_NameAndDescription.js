import styled from 'styled-components';
import {View} from 'react-native';
import {
  Dialog,
  Surface,
  IconButton,
  Avatar,
  Text,
  Colors,
  TextInput,
  Switch,
  Caption,
} from 'react-native-paper';

//Component
import {Button} from 'root/src/Components/CustomBtn';
import {HeadText, SubHeadText} from 'root/src/Styles/styled';

export const AvatarIamge = styled(Avatar.Image).attrs({size: 160})``;

export const BorderCameraIcon = styled(Surface)`
  background-color: ${(props) => props.theme.colors.background};
  height: 160px;
  width: 160px;
  border-color: ${(props) => props.theme.colors.accent};
  border-width: 2px;
  border-radius: 90px;
  align-items: center;
  justify-content: center;
`;

export const BtnGoHome = styled(Button)``;

export const ContainerTextInput = styled(View)``;

//! Default status_______________________________________________________________
export const ContainerDefaultSwitch = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Container = styled(View)`
  flex: 1;
  padding: 0px 42px;
  justify-content: center;
`;

export const ContainerImagePicker = styled(View)`
  align-items: center;
  margin-bottom: 22px;
`;

export const DefaultSwitchText = styled(Text)``;

export const DefaultSwitch = styled(Switch)``;

export const DefaultSwitchCaption = styled(Caption)`
  color: ${(props) => `${props.theme.colors.accent}`};
  font-weight: bold;
`;
//! Dialog camera_______________________________________________________________
export const DialogContent = styled(Dialog.Content)`
  flex-direction: row;
  justify-content: center;
`;
export const DialogIconContent = styled(View)`
  align-items: center;
`;
export const DialogIconCamera = styled(IconButton).attrs((props) => ({
  color: props.theme.colors.accent,
  size: 36,
  icon: 'camera',
}))`
  margin: 20px 28px 20px 28px;
  border-color: ${(props) => props.theme.colors.accent};
  border-width: 2px;
`;
export const DialogIconGallery = styled(DialogIconCamera).attrs({
  icon: 'image-size-select-actual',
})``;
export const DialogSuccessfulContainer = styled(View)`
  align-items: center;
`;
export const DialogActions = styled(Dialog.Actions)`
  justify-content: flex-end;
`;

export const IconCamera = styled(IconButton).attrs((props) => ({
  icon: 'camera',
  color: props.theme.colors.accent,
  size: 35,
}))``;

export const MoreDetailText = styled(Text)`
  color: ${(props) => props.theme.colors.accent};
  margin: 10px 0px;
`;

//! Submit button_______________________________________________________________
export const SubmitButton = styled(Button).attrs({
  mode: 'contained',
})``;

export const TextInputName = styled(TextInput).attrs({
  label: 'Name',
  mode: 'outlined',
})`
  margin-bottom: 12px;
`;

export const TextInputDescription = styled(TextInputName).attrs({
  label: 'Description',
})``;

export const ProductKeyText = styled(MoreDetailText)`
  margin: 3px 0px;
`;
export const ShowProductKeyText = styled(ProductKeyText)`
  color: ${(props) => `${props.theme.colors.text}`};
  margin-bottom: 12px;
  font-size: 22px;
`;

//! Dialog Insert successful_______________________________________________________________

export const IconCheck = styled(IconButton).attrs((props) => ({
  icon: 'checkbox-marked-circle-outline',
  color: Colors.green400,
  size: 50,
}))``;

export const HeadTextOne = styled(HeadText)``;

export const HeadTextTwo = styled(SubHeadText)`
  color: ${(props) => `${props.theme.colors.primary}`};
`;
