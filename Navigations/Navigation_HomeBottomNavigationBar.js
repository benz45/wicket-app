import React, {useState, useEffect, useRef} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {Platform} from 'react-native';

import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// AddProductScreen have a two screen is add picture and key, add name and descriptions.
import Navigation_AddProduct from '../screens/AddProductScreens/AddProductScreen';

import MessageScreen from '../screens/MessageScreen';
import NotificationList from '../screens/NotificationList';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setMessages} from '../src/actions/';

// HOC
import {HOCheader} from '../src/hoc';

const home = HOCheader(HomeScreen);
const message = MessageScreen;
const addProduct = Navigation_AddProduct;
const notificationList = HOCheader(NotificationList);
const profile = ProfileScreen;

const tabsList = () => {
  if (Platform.OS === 'android') {
    return {
      index: 0,
      routes: [
        {
          key: 'home',
          title: 'Home',
          icon: 'home',
          badge: false,
        },
        {
          key: 'message',
          title: 'Message',
          icon: 'facebook-messenger',
          badge: false,
        },
        {key: 'product', title: 'Product', icon: 'plus-circle', badge: false},
        {
          key: 'notificationList',
          title: 'Notification',
          icon: 'bell',
          badge: false,
        },
        {key: 'profile', title: 'Profile', icon: 'account', badge: false},
      ],
    };
  } else if (Platform.OS === 'ios') {
    return {
      index: 0,
      routes: [
        {
          key: 'home',
          title: 'Home',
          icon: 'home',
          badge: false,
        },
        {
          key: 'message',
          title: 'Message',
          icon: 'facebook-messenger',
          badge: false,
        },
        {key: 'product', title: 'Product', icon: 'plus-circle', badge: false},
        {key: 'profile', title: 'Profile', icon: 'account', badge: false},
      ],
    };
  }
};

const HomeBottomNavigationBar = () => {
  const dispatch = useDispatch();
  const mount = useRef(true);
  const mountSettingMessage = useRef(true);
  const [state, setState] = useState(tabsList());
  const {
    tabBackground,
    tabColor,
    tabActiveColor,
    user,
    settingMessage,
  } = useSelector((store) => {
    return {
      ...store.ThemeReducer.theme.colors,
      ...store.FirebaseReducer.messages,
      ...store.FirebaseReducer.currentUser,
      ...store.NotificationReducer,
      ...store.FirebaseReducer.messages,
    };
  });

  const _handleIndexChange = (val) => {
    setState((prevState) => {
      prevState.routes[val].badge = false;
      return {
        index: val,
        routes: prevState.routes,
      };
    });
  };

  const _renderScene = BottomNavigation.SceneMap({
    home: home,
    message: message,
    product: addProduct,
    notificationList: notificationList,
    profile: profile,
  });

  //Mount SettingMessage
  mountSettingMessage.current = settingMessage;

  // First load messages.
  useEffect(() => {
    database()
      .ref('messages')
      .limitToLast(1)
      .on('child_added', (snapshot) => {
        const message = snapshot.val();
        if (mount.current) return;
        if (mountSettingMessage.current) {
          if (user.email !== message.user._id) {
            PushNotification.localNotification({
              title: message.user.username,
              message: message.text,
              soundName: 'definite.mp3',
            });
            setState((prevState) => {
              if (prevState.index !== 1) {
                if (typeof prevState.routes[1].badge == 'boolean') {
                  prevState.routes[1].badge = 1;
                  return {
                    ...prevState,
                    routes: prevState.routes,
                  };
                } else {
                  prevState.routes[1].badge++;
                  return {
                    ...prevState,
                    routes: prevState.routes,
                  };
                }
              } else return {...prevState};
            });
            return;
          }
        }
      });
    database()
      .ref('messages')
      .on('value', (snapshot) => {
        const value = snapshot.val();
        if (!!value) {
          dispatch(setMessages(Object.values(value)));
        }
        mount.current = false;
      });
  }, []);
  return (
    <BottomNavigation
      // Custom height bar.
      barStyle={{height: 70, backgroundColor: tabBackground}}
      navigationState={state}
      onIndexChange={_handleIndexChange}
      renderScene={_renderScene}
      inactiveColor={tabColor}
      activeColor={tabActiveColor}
    />
  );
};

export default HomeBottomNavigationBar;
