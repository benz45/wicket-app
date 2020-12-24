import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import {Avatar, Text, TextInput, Title} from 'react-native-paper';

export const MainContainer = styled(View)`
  flex: 1;
  justify-content: center;
  padding: 0px 36px;
`;
export const ContainerImage = styled(TouchableOpacity)`
  align-items: center;
`;

export const Image = styled(Avatar.Image).attrs({
  size: 140,
})``;

export const ContainerLayer = styled(View)`
  margin-top: 26px;
`;

export const ProductKeyText = styled(Text)`
  color: ${(props) => `${props.theme.colors.primary}`};
  margin: 0px 0px;
`;
export const NameText = styled(ProductKeyText)``;

export const DescriptionText = styled(ProductKeyText)``;
export const ProductKeyTitle = styled(Title)`
  font-size: 26px;
`;

export const NameInput = styled(TextInput).attrs({
  label: 'Name',
})`
  background-color: ${(props) => `${props.theme.colors.background}`};
`;

export const DescriptionInput = styled(NameInput).attrs({
  label: 'Description',
})``;
