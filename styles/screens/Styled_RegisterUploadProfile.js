import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Caption as CaptionPaper,
  HelperText as HelperTextPaper,
  Subheading,
  TextInput,
} from 'react-native-paper';

import {Button} from '../../components/CustomBtn';

export const AvatarImage = styled(Avatar.Image).attrs({
  size: 120,
})``;

export const AvatarIcon = styled(Avatar.Icon).attrs(
  ({
    theme: {
      colors: {text},
    },
  }) => ({
    icon: 'plus',
    color: text,
    size: 30,
  }),
)`
  position: absolute;
  align-self: flex-end;
  background-color: ${({
    theme: {
      colors: {accent},
    },
  }) => `${accent}`};
`;

export const ContainerAvatar = styled(View)`
  align-items: center;
`;
export const TouchableAvatar = styled(TouchableOpacity)`
  align-items: center;
  width: 120px;
  flex-direction: column;
`;

export const ContainerSubhead = styled(View)`
  align-items: center;
  margin-top: 20px;
`;

export const Subhead = styled(Subheading)``;
export const Caption = styled(CaptionPaper)``;

export const NameText = styled(TextInput).attrs({
  label: 'Input name',
})`
  background-color: ${({
    theme: {
      colors: {background},
    },
  }) => `${background}`};
  margin-top: 16px;
`;

export const HelperText = styled(HelperTextPaper).attrs({type: 'error'})``;

export const BtnUpload = styled(Button).attrs({
  mode: 'contained',
})`
  margin-top: 16px;
`;

export const BtnSkip = styled(BtnUpload).attrs({
  mode: 'flet',
})``;
