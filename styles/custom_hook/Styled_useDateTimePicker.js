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
    testID: 'dateTimePicker',
    display: 'spinner',
    mode: 'time',
    is24Hour: true,
    textColor: `${text}`,
  }),
)``;
