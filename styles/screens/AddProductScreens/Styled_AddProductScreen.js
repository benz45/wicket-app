import styled from 'styled-components';

import {View} from 'react-native';
import {
  Text,
  TextInput,
  IconButton,
  HelperText as HelperTextPaper,
} from 'react-native-paper';

//Component
import {Button} from '../../../components/CustomBtn';

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  padding: 0px 36px 0px 36px;
`;

export const HeadIconContainer = styled(View)`
  align-items: center;
`;
export const HeadIcon = styled(IconButton).attrs((props) => ({
  icon: 'shape-rectangle-plus',
  size: 88,
  color: props.theme.colors.accent,
}))`
  align-items: center;
`;

export const HeadText = styled(Text)`
  margin-bottom: 6px;
  font-size: 24px;
  color: ${(props) => `${props.theme.colors.text}`};
  /* text-transform: uppercase; */
  text-align: center;
`;

export const DetailText = styled(Text)`
  padding-bottom: 12px;
  color: ${(props) => `${props.theme.colors.primary}`};
  text-align: center;
`;

export const ProductKeyText = styled(Text)`
  color: ${(props) => `${props.theme.colors.accent}`};
  font-size: 16px;
  margin: 12px 0px;
`;

export const InputKeyContainer = styled(View)``;
export const InputKey = styled(TextInput).attrs({
  maxLength: 6,
  label: 'XX-XXX-X',
  mode: 'outlined',
})``;

export const HelperText = styled(HelperTextPaper).attrs({
  padding: 'normal',
})`
  margin-bottom: 6px;
`;

export const SubmitButton = styled(Button).attrs({
  mode: 'contained',
})``;