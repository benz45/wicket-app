import React from 'react';

// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import barOptions from '../screens/HomebarOptions/BarOptions';
import barHome from '../screens/HomebarOptions/BarHome';

// Crate navigation
const TabTop = createMaterialTopTabNavigator();

export default function HomebarOptions() {
  return (
    <TabTop.Navigator tabBarOptions={{style: {display: 'none'}}}>
      <TabTop.Screen name="home" component={barHome} />
      <TabTop.Screen name="option" component={barOptions} />
    </TabTop.Navigator>
  );
}
