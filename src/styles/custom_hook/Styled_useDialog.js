import styled from 'styled-components';

import {
  Portal as PortalPaper,
  Dialog as DialogPaper,
  IconButton,
  Text,
} from 'react-native-paper';
import {Button} from 'root/src/components/CustomBtn';

export const Portals = styled(PortalPaper)``;

export const Dialog = styled(DialogPaper)``;

export const DialogContent = styled(DialogPaper.Content)`
  align-items: center;
`;

export const Icon = styled(IconButton).attrs((props) => {
  return {
    color:
      props.icon === 'checkbox-marked-circle-outline'
        ? props.theme.colors.primary
        : props.icon === 'progress-clock'
        ? props.theme.colors.warning
        : props.icon === 'close'
        ? props.theme.colors.error
        : null,
    size: 50,
  };
})``;

export const TextHead = styled(Text)`
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const TextDescription = styled(Text)``;

export const DialogActions = styled(DialogPaper.Actions)`
  justify-content: space-between;
`;

export const Btn = styled(Button)``;
