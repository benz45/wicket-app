import styled from 'styled-components';
import {View, Text, ScrollView as Scroll, TouchableOpacity} from 'react-native';

// React native paper
import {Card as CardPaper, Avatar, Colors} from 'react-native-paper';

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  padding: 20px 30px 20px 30px;
`;

export const ScrollView = styled(Scroll)`
  padding: 0px 10px 0px 10px;
`;

export const CardContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})`
  flex: 1;
  padding: 3px 0px 3px 0px;
`;

export const CardContainerLongPress = styled(TouchableOpacity).attrs({
  delayLongPress: 500,
  activeOpacity: 0.7,
})``;

export const Card = styled(CardPaper)`
  margin: 10px 0px 10px 0px;
  padding: 7px 0px 7px 0px;
`;

export const InCard = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 28px 10px 28px;
`;

export const CardDetail = styled(View)`
  justify-content: center;
`;

export const CardRepeat = styled(View)`
  align-self: center;
`;

export const TimeText = styled(Text)`
  font-size: 26px;
  margin-bottom: 8px;
  color: ${(props) => `${props.color}`};
`;
export const DateText = styled(Text)`
  font-size: 15px;
  color: ${(props) => `${props.color}`};
`;

export const DescriptionText = styled(Text)`
  font-size: 20px;
  color: ${(props) => `${props.color}`};
`;

export const RepeatNormalText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => `${props.color}`};
`;

export const RepeatLongText = styled(TouchableOpacity)`
  align-self: center;
`;

export const Trash = styled(Avatar.Icon).attrs({
  icon: 'delete-empty',
  size: 43,
})`
  right: 10px;
  background-color: #660000;
`;
