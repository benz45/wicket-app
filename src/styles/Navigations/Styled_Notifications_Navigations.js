import styled from 'styled-components';
import {View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';

// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const {Navigator} = createMaterialTopTabNavigator();

export const notificationView = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-left: 14px;
`;

export const NotificationIcon = styled(IconButton).attrs(
  ({
    theme: {
      colors: {primary},
    },
  }) => ({
    size: 26,
    icon: 'bell-outline',
    color: primary,
  }),
)``;

export const NotificationText = styled(Text)`
  font-size: 20px;
  color: ${(props) => `${props.theme.colors.primary}`};
`;

export const navigatorStyle = styled(Navigator).attrs(
  ({
    theme: {
      colors: {accent},
    },
  }) => ({
    tabBarOptions: {
      indicatorStyle: {backgroundColor: accent},
      labelStyle: {textTransform: 'none'},
    },
  }),
)`
  /* position: absolute;
  top: 70px;
  left: 0px;
  right: 0px; */
`;
