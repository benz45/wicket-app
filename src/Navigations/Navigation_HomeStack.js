import React from 'react';

// Navigations
import {createStackNavigator} from '@react-navigation/stack';
import Settings from './Settings';
import DetailProduct from './DetailProduct';
import Navigation_HomeDrawer from './Navigation_HomeDrawer';
import Notifications from './Notifications';
import AddProduct_NameAndDescriptionScreen from 'root/src/Screens/AddProductScreens/AddProduct_NameAndDescriptionScreen';

const Stack = createStackNavigator();

const Navigation_HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Stack_HomeDrawer"
        component={Navigation_HomeDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Stack_Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Stack_Setting"
        component={Settings}
        options={({route}) => ({title: route.params.title})}
      />

      <Stack.Screen
        name="Stack_detailProductScreen"
        component={DetailProduct}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Stack_AddProduct_NameAndDescription"
        component={AddProduct_NameAndDescriptionScreen}
        options={{title: 'Create new wicket', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

export default Navigation_HomeStack;
