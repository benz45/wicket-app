import React from 'react';
import {Container, ContainerDetail} from '../styles/styled';
import {View, ScrollView} from 'react-native';

// UI
import {Colors, Avatar, IconButton} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';
import {SafeAreaView} from 'react-native-safe-area-context';

// Redux
import {useSelector} from 'react-redux';

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

// Styles
import styles from '../styles/styles';

export const HOCform = (Component) => (props) => {
  return (
    <Container>
      <Component {...props} />
    </Container>
  );
};

export const HOCdetail = (Component) => (props) => {
  return (
    <ScrollView>
      <ContainerDetail>
        <Component {...props} />
      </ContainerDetail>
    </ScrollView>
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

export const HOCheader = (Component) => (props) => {
  const {navigate} = useNavigation();
  const {accent} = useSelector((reducer) => reducer.ThemeReducer.theme.colors);
  const {user} = useSelector((res) => res.FirebaseReducer.currentUser);

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
    <View style={{flex: 1}}>
      <View style={styles.HomeScreen_Header}>
        <IconOpenDrawer />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton icon="bell" color={Colors.grey500} />
          <Avatar.Image
            size={38}
            source={{
              uri: user.photoURL,
            }}
            style={{
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Component {...props} />
      </View>
      {props.route.key === 'home' && (
        <FloatingAction
          color={accent}
          overlayColor="rgba(18, 18, 18, 0.33)"
          shadow={{
            shadowOpacity: 0,
          }}
          showBackground={true}
          style={{
            backgroundColor: '#000',
            position: 'absolute',
            left: 0,
            bottom: 0,
          }}
          actions={actions}
          onPressItem={(res) => linkTo(res)}
        />
      )}
    </View>
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
