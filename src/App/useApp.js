import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
// Splash screen
import SplashScreen from 'react-native-splash-screen';
// Firebase message
import messaging from '@react-native-firebase/messaging';
// Components
import Authentication from 'root/src/Navigations/Authentication';
import Authenticated from 'root/src/Navigations/Authenticated';
import {createStackNavigator} from '@react-navigation/stack';

import {useSelector, useDispatch} from 'react-redux';
import {action_setAllNotification} from 'root/src/Actions/actions_notification';
import {LOAD_CURRENT_USER_FIREBASE} from 'root/src/actionsType';

import RegisterComplateScreen from 'root/src/Screens/RegisterComplateScreen';

// HOC
import {HOCform} from 'root/src/hoc';

const Stack = createStackNavigator();

export default function useApp() {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();
  const {isUser} = useSelector((res) => res.CurrentUserReducer);

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

  const onAuthStateChanged = (snapUser) => {
    if (initializing) setInitializing(false);
    if (snapUser) {
      dispatch({type: LOAD_CURRENT_USER_FIREBASE, payload: snapUser});
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isUser ? (
        <Stack.Screen name="Authenticated" component={Authenticated} />
      ) : (
        <Stack.Screen name="Authentication" component={Authentication} />
      )}
      <Stack.Screen
        name="RegisterComplate"
        component={HOCform(RegisterComplateScreen)}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
