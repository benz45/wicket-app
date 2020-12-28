import React from 'react';
import {Container} from 'root/src/Styles/styled';
import {View} from 'react-native';

// UI
import {Colors} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import FloatingAction from 'root/src/Components/FloatingAction';
// Redux
import {useSelector} from 'react-redux';

// Styles
import * as Styled from 'root/src/Styles/hoc/Styled_hocHeader';

export const HOCform = (Component) => (props) => {
  return (
    <Container>
      <Component {...props} />
    </Container>
  );
};

// IconOpenDrawer on HOCheader
const IconOpenDrawer = () => {
  const {openDrawer} = useNavigation();
  return (
    <Icons
      name="menu"
      size={26}
      color={Colors.grey500}
      onPress={() => openDrawer()}
    />
  );
};

export const hocHeader = (Component) => (props) => {
  const currentUser = useSelector((res) => res.CurrentUserReducer);
  const {realtimeDatabase} = useSelector((res) => res.FirebaseReducer);

  return (
    <Styled.ContainerView>
      <Styled.HeaderView>
        <IconOpenDrawer />
        <Styled.ContainerUserView>
          <Styled.Icon />
          <Styled.AvatarUserImage
            size={38}
            source={{
              uri: currentUser.user.photoURL,
            }}
          />
        </Styled.ContainerUserView>
      </Styled.HeaderView>
      <Styled.ContainerView>
        <Component {...props} />
      </Styled.ContainerView>
      {props.route.key === 'home' && realtimeDatabase.length < 2 && (
        <FloatingAction jumpTo={props.jumpTo} />
      )}
    </Styled.ContainerView>
  );
};

export const hocSettings = (Components) => (props) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 20,
      }}>
      <Components {...props} />
    </View>
  );
};

console.disableYellowBox = true;
