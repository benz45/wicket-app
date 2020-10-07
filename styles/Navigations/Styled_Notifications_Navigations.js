import styled from 'styled-components';
import {View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';

export const NotificationTextContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const NotificationIcon = styled(IconButton).attrs((props) => ({
  size: 30,
  icon: 'bell-circle',
}))``;

export const NotificationText = styled(Text)`
  font-size: 20px;
  color: ${(props) => `${props.color}`};
`;
