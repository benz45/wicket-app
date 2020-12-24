import styled from 'styled-components';
import {View} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';
export const ContainerView = styled(View)`
  flex: 1;
`;

export const HeaderView = styled(View)`
  padding: 15px 30px 15px 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerUserView = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(IconButton).attrs((props) => ({
  icon: 'bell',
  color: props.theme.colors.tabColor,
}))``;

export const AvatarUserImage = styled(Avatar.Image)`
  margin-left: 10px;
`;
