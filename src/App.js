import React, {useEffect} from 'react';
import {StatusBar, View, Text} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Styled
import {ThemeProvider} from 'styled-components';

// Firebase message
import messaging from '@react-native-firebase/messaging';

// Splash screen
import SplashScreen from 'react-native-splash-screen';

// React Navigation
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import Authentication from '../Navigations/Authentication';
import Authenticated from '../Navigations/Authenticated';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {action_loadCurrentUser_firebase} from '../src/actions/actions_firebase';
import {action_setAllNotification} from '../src/actions/actions_notification';

const Stack = createStackNavigator();

const Auth = () => {
  const {navigate} = useNavigation();
  const {isUser} = useSelector((res) => res.FirebaseReducer.currentUser);

  useEffect(() => {
    isUser ? navigate('Authenticated') : navigate('Authentication');
    SplashScreen.hide();
  }, [isUser]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Authenticated" component={Authenticated} />
      <Stack.Screen name="Authentication" component={Authentication} />
    </Stack.Navigator>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const {theme} = useSelector((res) => res.ThemeReducer);

  // Log show data.
  // const data = useSelector((res) => res.FirebaseReducer.realtimeDatabase);
  // console.log(JSON.stringify(data, 0, 2));

  const {backgroundColor, mode} = theme.colors.barStyle;

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

    // Load data current user from firebase.
    const loadCurrentUser = async () => {
      await action_loadCurrentUser_firebase();
    };
    loadCurrentUser();

    return unsubscribe_message;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <StatusBar barStyle={mode} backgroundColor={backgroundColor} />
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Auth" component={Auth} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;
