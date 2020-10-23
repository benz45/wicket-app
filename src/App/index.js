import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Styled
import {ThemeProvider} from 'styled-components';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Redux
import {useSelector} from 'react-redux';
import useApp from './useApp';

const Stack = createStackNavigator();

const App = () => {
  const {
    theme,
    theme: {
      colors: {
        backgroundColor,
        barStyle: {mode},
      },
    },
  } = useSelector((res) => res.ThemeReducer);

  // Log show data.
  // const {currentUser, realtimeDatabase} = useSelector(
  //   (res) => res.FirebaseReducer,
  // );
  // console.log(JSON.stringify(mode, 0, 2));

  return (
    <ThemeProvider theme={theme}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <StatusBar barStyle={mode} backgroundColor={backgroundColor} />
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Auth" component={useApp} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;
