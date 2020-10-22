import styled from 'styled-components';
import {View} from 'react-native';
import {
  Portal as PortalPaper,
  Dialog,
  IconButton,
  Text,
} from 'react-native-paper';

export const Portal = styled(PortalPaper)``;
export const DialogContainer = styled(Dialog)``;

export const DialogTitle = styled(Dialog.Title)``;
export const DialogText = styled(Text)``;
export const DialogContent = styled(Dialog.Content)`
  flex-direction: row;
  justify-content: center;
`;
export const DialogIconContent = styled(View)`
  align-items: center;
`;
export const DialogIconCamera = styled(IconButton).attrs((props) => ({
  color: props.theme.colors.accent,
  size: 36,
  icon: 'camera',
}))`
  margin: 20px 28px 20px 28px;
  border-color: ${(props) => props.theme.colors.accent};
  border-width: 2px;
`;
export const DialogIconGallery = styled(DialogIconCamera).attrs({
  icon: 'image-size-select-actual',
})``;
