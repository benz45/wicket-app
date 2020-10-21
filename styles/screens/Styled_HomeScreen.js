import styled from 'styled-components';
import {View, ScrollView} from 'react-native';
import {
  ActivityIndicator as ActivityIndicatorPaper,
  Text,
  IconButton,
  Card as CardPaper,
  Button,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ActivityIndicator = styled(ActivityIndicatorPaper).attrs(
  ({
    theme: {
      colors: {warning},
    },
  }) => ({
    color: warning,
    size: 16,
    animating: true,
  }),
)`
  margin-right: 10px;
`;

export const ContainerHead = styled(View)`
  padding: 0px 30px;
`;

export const ContainerNoData = styled(View)`
  flex: 1;
  padding-bottom: 110px;
`;

export const ContainerCard = styled(View)`
  margin: 0px 30px 0px 30px;
`;

export const ContainerShowStatus = styled(View)`
  flex-direction: row;
`;

export const ContainerActionSwitch = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ContainerLoading = styled(View)`
  align-items: center;
  flex-direction: row;
`;

export const ContainerHomeBar = styled(ScrollView)`
  margin-bottom: 16px;
`;

export const Card = styled(CardPaper)`
  border-radius: 30px;
  margin-bottom: 20px;
  padding: 10px 14px 10px 14px;
`;

export const CardTitle = styled(CardPaper.Title)``;

export const CardContent = styled(CardPaper.Content)`
  align-items: center;
`;

export const CardCover = styled(CardPaper.Cover)`
  height: 200px;
  width: 200px;
  border-radius: 200px;
`;

export const CardActions = styled(CardPaper.Actions)`
  justify-content: space-between;
  padding: 17px;
`;

export const BtnDisconnected = styled(Icon).attrs(
  ({
    theme: {
      colors: {warning},
    },
  }) => ({
    name: 'alert-circle-outline',
    color: warning,
  }),
)`
  padding-right: 8px;
`;

export const BtnNetworkDisconnected = styled(Button).attrs(
  ({
    theme: {
      colors: {error},
    },
  }) => ({color: error}),
)`
  padding: 0px 20px;
`;

export const HeadLayer = styled(View)`
  flex-direction: row;
`;

export const HomeName = styled(Text)`
  font-size: 23px;
  align-self: center;
`;

export const IconConnected = styled(IconButton).attrs({
  icon: 'shield-check',
  size: 22,
  color: '#58B924',
})``;

export const MainContainer = styled(View)`
  flex: 1;
`;

export const IconDisConnected = styled(IconConnected).attrs({
  icon: 'alert-circle',
  color: '#CF4127',
})``;

export const TextNetworkDisconnected = styled(Text)``;

export const TextShowStatus = styled(Text)`
  color: ${({
    theme: {
      colors: {accent},
    },
  }) => `${accent}`};
  border-bottom-color: ${({
    theme: {
      colors: {accent},
    },
  }) => `${accent}`};
  border-bottom-width: 1px;
`;

export const TextStatus = styled(Text)``;

export const TextDisconnected = styled(Text)``;
