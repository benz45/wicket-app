import styled from 'styled-components';
import {View} from 'react-native';

// Paper
import {
  Subheading as SubheadingPaper,
  Text,
  TextInput,
} from 'react-native-paper';

// Component
import {Button as CustomBtn} from '../../components/CustomBtn';

export const MainContainer = styled(View)`
  flex: 1;
  margin: 80px 40px 80px 40px;
  justify-content: center;
`;

export const ContainerTextInput = styled(View)`
  margin-top: 18px;
`;

export const SubheadingEmail = styled(SubheadingPaper)`
  font-size: 16px;
  margin: 0px 8px 0px 8px;
`;
export const Subheading = styled(SubheadingEmail)`
  color: ${({
    theme: {
      colors: {accent},
    },
  }) => `${accent}`};
`;

export const Button = styled(CustomBtn).attrs({
  mode: 'contained',
  dark: true,
})`
  justify-content: center;
  margin-top: 26px;
`;

export const GenerateText = styled(View)`
  flex-direction: row;
`;

export const TextBackToLogin = styled(Text)`
  margin-top: 26px;
  text-align: center;
  color: ${(props) => `${props.theme.colors.subText}`};
`;

export const Username = styled(TextInput).attrs({
  label: 'Username',
  mode: 'flat',
})`
  background-color: ${({
    theme: {
      colors: {background},
    },
  }) => `${background}`};
`;

export const Password = styled(Username).attrs({
  label: 'Password',
  secureTextEntry: true,
  textContentType: 'newPassword',
})``;

export const CPassword = styled(Password).attrs({
  label: 'Confirm Password',
})``;
