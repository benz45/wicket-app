import styled from 'styled-components';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {Text, TextInput as TextInputPaper} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from '../../components/CustomBtn';

const window = Dimensions.get('screen');

console.log(window);

export const MainContainer = styled(View)`
  padding: 80px 65px 0px 65px;
  justify-content: center;
`;

// Containers
export const ContainerTime = styled(TouchableOpacity)`
  padding: 50px 0px;
  /* flex: 1; */
  flex-direction: column;
`;

export const ContainerRepeat = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerDialogRepeat = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled(TextInputPaper).attrs({
  mode: 'flet',
})`
  margin-bottom: 24px;
  background-color: ${(props) => `${props.theme.colors.background}`};
`;

// Icons
export const ChevonRightIcon = styled(Icon).attrs(
  ({
    theme: {
      colors: {primary},
    },
  }) => ({
    name: 'angle-right',
    color: primary,
    size: 20,
  }),
)`
  margin-left: 8px;
`;

// Text
export const RepeatText = styled(Text)``;

export const TimeText = styled(Text)`
  font-size: 70px;
  text-align: center;
`;

export const RepeatTypeText = styled(Text)`
  color: ${(props) => `${props.theme.colors.primary}`};
`;

export const btnAddNoti = styled(Button).attrs({
  mode: 'contained',
})`
  margin: 24px 0px;
`;
