import styled from 'styled-components';

import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {View, Image} from 'react-native';
import {Avatar, Caption, Text} from 'react-native-paper';

export const DWcontentScroll = styled(DrawerContentScrollView)``;
export const DWcontainerHead = styled(DrawerItem).attrs({
  labelStyle: {display: 'none'},
  label: '',
})``;
export const DWuserInfo = styled(DWcontainerHead)``;
export const DWtheme = styled(DrawerItem)``;

export const HeadComponent = styled(View)`
  flex-direction: row;
  align-items: center;
`;
export const HeadImage = styled(Image)`
  width: 35px;
  height: 35px;
  margin-right: 6px;
`;
export const HeadText = styled(Text)`
  text-transform: uppercase;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
`;

export const UserInfoComponent = styled(HeadComponent)``;
export const AvatarImage = styled(Avatar.Image).attrs({
  size: 36,
})``;

export const Info = styled(View)`
  margin-left: 20px;
`;

export const DisplayName = styled(Text)``;
export const Email = styled(Caption)``;

export const ThemeContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ThemeInfo = styled(View)``;
export const ThemeText = styled(Text)``;
export const ThemeCaption = styled(Caption)``;

export const SwitchTheme = styled(View)`
  right: -40px;
`;
