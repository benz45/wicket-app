import styled from 'styled-components';

import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

import {Button} from '../../components/CustomBtn';
export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  padding: 30px 30px 30px 30px;
`;

export const ContanerInput = styled(View)`
  margin-top: 10px;
`;
export const ContanerButton = styled(View)`
  margin-top: 20px;
`;

export const UsernameInput = styled(TextInput).attrs({
  label: 'Username',
})`
  margin: 10px 0px 10px 0px;
  background-color: ${({
    theme: {
      colors: {background},
    },
  }) => `${background}`};
`;
export const PasswordInput = styled(UsernameInput).attrs({
  label: 'Password',
  secureTextEntry: true,
})``;

export const ButtonLogin = styled(Button).attrs({
  mode: 'contained',
})`
  justify-content: center;
  height: 36px;
`;

export const ButtonRegister = styled(Button).attrs({
  dark: true,
})`
  margin-top: 14px;
`;
