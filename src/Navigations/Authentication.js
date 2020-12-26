import React from 'react';

// React Navigations
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import LoginScreen from 'root/src/screens/LoginScreen';
import RegisterScreen from 'root/src/screens/RegisterScreen';

const Stack = createStackNavigator();

const Authentication = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterSecurity"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Authentication;
