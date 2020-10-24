import styled from 'styled-components';
import {View} from 'react-native';
import {
  Avatar,
  Title as TitlePaper,
  Button,
  Card as CardPaper,
  List,
} from 'react-native-paper';
export const MainContainer = styled(View)`
  flex: 1;
  padding: 0px 36px;
  justify-content: center;
`;

export const ContainerImage = styled(View)`
  align-items: center;
`;

export const Image = styled(Avatar.Image).attrs({size: 100})``;

export const Title = styled(TitlePaper)`
  text-align: center;
  font-size: 26px;
  padding: 22px 0px;
`;

export const BtnLogout = styled(Button).attrs((props) => ({
  mode: 'flet',
  color: props.theme.colors.primary,
  dark: true,
}))`
  margin-top: 16px;
`;

export const Card = styled(CardPaper)``;

export const ListId = styled(List.Item)``;
export const ListUsername = styled(List.Item)``;
export const ListEmail = styled(List.Item)``;
export const ListCreation = styled(List.Item)``;
