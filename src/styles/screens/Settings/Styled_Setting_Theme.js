import styled from 'styled-components';
import {View} from 'react-native';
import {List, Switch} from 'react-native-paper';

export const MainContainer = styled(View)``;

export const ListSectionDefaultSys = styled(List.Section).attrs({
  title: 'Theme system',
})``;
export const ListItemsDefaultSys = styled(List.Item).attrs({
  title: 'Default System',
})``;

export const ListSectionManual = styled(List.Section).attrs({
  title: 'Manual',
})``;

export const ListItemsManual = styled(List.Item).attrs({
  title: 'Dark mode',
})``;

export const SwitchTheme = styled(Switch)``;
