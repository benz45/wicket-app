import React, {useState, useEffect, useRef} from 'react';
import {BottomNavigation} from 'react-native-paper';

import database from '@react-native-firebase/database';
import PushNotification from 'react-native-push-notification';

// Navigations
import {createDrawerNavigator} from '@react-navigation/drawer';
import Stack_Setting from './Settings';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// AddProductScreen have a two screen is add picture and key, add name and descriptions.
import AddProductScreen from '../screens/AddProductScreen';

import MessageScreen from '../screens/MessageScreen';
import NotificationList from '../screens/NotificationList';

// Components
import CustomDrawer from '../components/CustomDrawer';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setMessages} from '../src/actions/';

// HOC
import {HOCheader} from '../src/hoc';

const home = HOCheader(HomeScreen);
const message = MessageScreen;
const add = HOCheader(AddProductScreen);
const notificationList = HOCheader(NotificationList);
const profile = ProfileScreen;
const PaperDrawer = createDrawerNavigator();

const data = {
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

const HomeTab = () => {
  const dispatch = useDispatch();
  const mount = useRef(true);
  const mountSettingMessage = useRef(true);
  const [state, setState] = useState(data);
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
    product: add,
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
      barStyle={{backgroundColor: tabBackground}}
      navigationState={state}
      onIndexChange={_handleIndexChange}
      renderScene={_renderScene}
      inactiveColor={tabColor}
      activeColor={tabActiveColor}
    />
  );
};

const AppBar = () => {
  return (
    <PaperDrawer.Navigator
      initialRouteName="Stack_HomeTab"
      drawerPosition="left"
      drawerType="back"
      drawerContentOptions={{activeTintColor: '#767676'}}
      drawerContent={(val) => <CustomDrawer {...val} />}>
      <PaperDrawer.Screen
        name="Stack_HomeTab"
        component={HomeTab}
        options={{title: 'Home'}}
      />
      <PaperDrawer.Screen
        name="Stack_Settings"
        component={Stack_Setting}
        options={{title: 'Settings'}}
      />
    </PaperDrawer.Navigator>
  );
};

export default AppBar;
