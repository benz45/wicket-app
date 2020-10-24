import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Styled
import {ThemeProvider} from 'styled-components';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import useApp from './useApp';
import {SET_THEME} from '../actionsType';

const Stack = createStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {
    sysDefault,
    darkMode,
    theme,
    theme: {
      colors: {
        backgroundColor,
        barStyle: {mode},
      },
    },
  } = useSelector((res) => res.ThemeReducer);

  // Change theme according sys default.
  useEffect(() => {
    if (sysDefault && colorScheme !== theme.theme) {
      dispatch({type: SET_THEME, payload: colorScheme});
    }
  }, [colorScheme]);

  // If sysDefault changed to do set theme according darkMode value.
  useEffect(() => {
    if (sysDefault && colorScheme !== theme.theme) {
      dispatch({type: SET_THEME, payload: colorScheme});
    } else if (!sysDefault) {
      dispatch({type: SET_THEME, payload: darkMode ? 'dark' : 'light'});
    }
  }, [sysDefault]);

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
