import styled from 'styled-components';
import {
  Avatar,
  Title as TitlePaper,
  Button as BtnPaper,
} from 'react-native-paper';
import {View} from 'react-native';

export const ContainerAvatarImage = styled(View)`
  align-items: center;
`;
export const AvatarImage = styled(Avatar.Image).attrs({
  size: 130,
})`
  background-color: white;
  margin: 36px 0px 0px 0px;
`;

export const ContainerInfo = styled(View)`
  padding: 0px 18px;
`;

export const Title = styled(TitlePaper)`
  text-align: center;
  margin: 18px 0px;
`;

export const ContainerBtn = styled(View)`
  flex-direction: row;
  justify-content: center;
  padding: 14px 0px;
`;

export const BtnHistory = styled(BtnPaper).attrs({
  mode: 'contained',
  uppercase: false,
})`
  padding: 0px 22px;
  margin-right: 8px;
`;

export const BtnEdit = styled(BtnPaper).attrs({
  mode: 'outlined',
  uppercase: false,
})``;
