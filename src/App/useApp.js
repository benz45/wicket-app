import React, {useEffect} from 'react';

// Splash screen
import SplashScreen from 'react-native-splash-screen';
// Firebase message
import messaging from '@react-native-firebase/messaging';
// Components
import Authentication from '../../Navigations/Authentication';
import Authenticated from '../../Navigations/Authenticated';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useSelector, useDispatch} from 'react-redux';
import useLoadCurrentUser from '../../src/customHook/useLoadCurrentUser';
import {action_setAllNotification} from '../../src/actions/actions_notification';

const Stack = createStackNavigator();

export default function useApp() {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {isUser, user} = useSelector((res) => res.CurrentUserReducer);
  useLoadCurrentUser();

  useEffect(() => {
    // Foreground all message.
    const subscribe_message = messaging().onMessage(async (snapshot) => {
      try {
        if (!!snapshot)
          dispatch(action_setAllNotification({snapshot, type: 'GLOBAL'}));
      } catch (err) {
        console.error(err.message);
      }
    });
    subscribe_message;

    // Background all message.
    const unsubscribe_message = messaging().setBackgroundMessageHandler(
      async (snapshot) => {
        if (!!snapshot)
          dispatch(action_setAllNotification({snapshot, type: 'GLOBAL'}));
      },
    );
    return unsubscribe_message;
  }, []);

  useEffect(() => {
    isUser && !!user.displayName
      ? navigate('Authenticated')
      : isUser && !!!user.displayName
      ? navigate('Authentication', {screen: 'RegisterProfile'})
      : navigate('Authentication');
    SplashScreen.hide();
  }, [isUser]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Authenticated" component={Authenticated} />
      <Stack.Screen name="Authentication" component={Authentication} />
    </Stack.Navigator>
  );
}
