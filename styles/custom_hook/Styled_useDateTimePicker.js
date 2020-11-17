import styled from 'styled-components';
import {Button} from 'react-native-paper';
import DateTimePickerComponent from '@react-native-community/datetimepicker';

export const btnSubmit = styled(Button).attrs({labelStyle: {fontSize: 16}})`
  margin-top: 8px;
`;

export const DateTimePicker = styled(DateTimePickerComponent).attrs(
  ({
    theme: {
      colors: {text},
    },
  }) => ({
    textColor: `${text}`,
  }),
)``;
