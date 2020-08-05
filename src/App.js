import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

// Splash screen
import SplashScreen from 'react-native-splash-screen';

// React Navigation
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import Authentication from '../Navigations/Authentication';
import Authenticated from '../Navigations/Authenticated';

// Redux
import {useSelector} from 'react-redux';
import {action_loadCurrentUser_firebase} from '../src/actions/actions_firebase';

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
  const {theme} = useSelector((res) => res.ThemeReducer);

  // Log show data.
  // const data = useSelector((res) => res.FirebaseReducer.realtimeDatabase);
  // console.log(JSON.stringify(data, 0, 2));

  const {backgroundColor, mode} = theme.colors.barStyle;

  useEffect(() => {
    const loadCurrentUser = async () => {
      await action_loadCurrentUser_firebase();
    };
    loadCurrentUser();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar barStyle={mode} backgroundColor={backgroundColor} />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;