import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

// Styled
import * as Styled from 'root/src/styles/components/Styled_FloatingAction';
const icon = (name) => <Icons name={name} size={20} color="#f5f5f5" />;
const actions = [
  {
    text: 'Create new',
    icon: icon('plus'),
    name: 'CreateNew',
    position: 1,
    color: '#90CAF9',
    textBackground: '#f5f5f5',
  },
  {
    text: 'Notification',
    icon: icon('bell'),
    name: 'Notification',
    position: 2,
    color: '#90CAF9',
    textBackground: '#f5f5f5',
  },
];

export default function FloatingAction(props) {
  const {navigate} = useNavigation();

  const linkTo = (val) => {
    val === 'CreateNew'
      ? props.jumpTo('product')
      : val === 'Notification'
      ? navigate('Stack_Notifications', {
          title: 'Notifications',
        })
      : null;
  };

  return (
    <Styled.FloatingAction
      overlayColor="rgba(18, 18, 18, 0.33)"
      shadow={{
        shadowOpacity: 0,
      }}
      showBackground={true}
      actions={actions}
      onPressItem={(res) => linkTo(res)}
    />
  );
}
