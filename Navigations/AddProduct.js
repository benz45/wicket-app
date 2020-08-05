import React from 'react';

// React Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import AddKey from '../screens/AddProduct/AddKey';
import AddName from '../screens/AddProduct/AddName';
import AddImage from '../screens/AddProduct/AddImage';

// Toptabs
const Stack = createStackNavigator();
const TabTop = createMaterialTopTabNavigator();

// HOC
import {hocAddProduct} from '../src/hoc';

// Varaibles
const hocAddKey = AddKey;
const hocAddName = hocAddProduct(AddName);
const hocAddImage = hocAddProduct(AddImage);

const AddProduct = () => {
  return (
    <TabTop.Navigator tabBarOptions={{style: {display: 'none'}}}>
      <TabTop.Screen component={hocAddKey} name="AddKey" />
      <TabTop.Screen component={hocAddName} name="AddName" />
      <TabTop.Screen component={hocAddImage} name="AddImage" />
    </TabTop.Navigator>
  );
};

export default AddProduct;
