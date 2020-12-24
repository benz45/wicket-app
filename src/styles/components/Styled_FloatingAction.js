import styled from 'styled-components';
import {FloatingAction as FloatingActionComponent} from 'react-native-floating-action';

export const FloatingAction = styled(FloatingActionComponent).attrs(
  (props) => ({
    color: props.theme.colors.accent,
  }),
)`
  background-color: #000;
  position: absolute;
  left: 0;
  bottom: 0;
`;
