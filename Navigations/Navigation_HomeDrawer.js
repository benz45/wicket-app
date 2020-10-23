import React from 'react';

// Navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeBottomNavigationBar from './Navigation_HomeBottomNavigationBar';
import Stack_Setting from './Settings';

// Components
import CustomDrawer from '../components/CustomDrawer';

const PaperDrawer = createDrawerNavigator();

const Navigation_HomeDrawer = () => {
  return (
    <PaperDrawer.Navigator
      initialRouteName="Drawer_HomeBottomNavigationBar"
      drawerPosition="left"
      drawerType="back"
      drawerContentOptions={{
        activeTintColor: '#767676',
      }}
      drawerContent={(val) => <CustomDrawer {...val} />}>
      <PaperDrawer.Screen
        name="Drawer_HomeBottomNavigationBar"
        component={HomeBottomNavigationBar}
        options={{title: 'Home'}}
      />
      <PaperDrawer.Screen
        name="Drawer_Settings"
        component={Stack_Setting}
        options={{title: 'Settings'}}
      />
    </PaperDrawer.Navigator>
  );
};

export default Navigation_HomeDrawer;
