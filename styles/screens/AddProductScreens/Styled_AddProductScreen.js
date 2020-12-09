import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import {
  Text,
  Title,
  TextInput,
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
  margin-bottom: 12px;
`;
export const HeadIcon = styled(Icon).attrs((props) => ({
  name: 'shape-rectangle-plus',
  size: 92,
  color: props.theme.colors.primary,
}))`
  align-items: center;
`;

export const HeadText = styled(Title)`
  margin-bottom: 24px;
  font-size: 24px;
  color: ${(props) => `${props.theme.colors.text}`};
  text-align: center;
`;

export const SubText = styled(Title)`
  margin-bottom: 6px;
  font-size: 16px;
  color: ${(props) => `${props.theme.colors.text}`};
`;

export const DetailText = styled(Text)`
  margin-bottom: 24px;
  color: ${(props) => `${props.theme.colors.subText}`};
`;

export const ProductKeyText = styled(Title)`
  color: ${(props) => `${props.theme.colors.text}`};
  font-size: 16px;
  margin-bottom: 6px;
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
