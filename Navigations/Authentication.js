import React from 'react';

// React Navigations
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterUploadProfile from '../screens/RegisterUploadProfile';
import RegisterComplateScreen from '../screens/RegisterComplateScreen';

// HOC
import {HOCform} from '../src/hoc';

const Stack = createStackNavigator();

const Authentication = () => {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
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

      <Stack.Screen
        name="RegisterProfile"
        component={HOCform(RegisterUploadProfile)}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterComplate"
        component={HOCform(RegisterComplateScreen)}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Authentication;
