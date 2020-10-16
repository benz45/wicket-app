import React from 'react';

// Screen
import AddProduct_ProductKey_Screen from '../screens/AddProductScreens/AddProductScreen';
import AddProduct_NameAndDescription_Screen from '../screens/AddProductScreens/AddProduct_NameAndDescriptionScreen';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Navigation_AddProduct() {
  return (
    <Stack.Navigator
      initialRouteName="Stack_AddProduct_ProductKey"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Stack_AddProduct_NameAndDescription"
        component={AddProduct_NameAndDescription_Screen}
      />
    </Stack.Navigator>
  );
}
