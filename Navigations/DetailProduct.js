import React from 'react';

// React Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import DetailProductScreen from '../screens/DetailsProduct/DetailProductScreen';
import DetailProductEditScreen from '../screens/DetailsProduct/DetailProductEditScreen';
import DetailProductDatabaseScreen from '../screens/DetailsProduct/DetailProductDatabaseScreen';
import DetailProductAnalysisScreen from '../screens/DetailsProduct/DetailProductAnalysisScreen';

// Toptabs
const Stack = createStackNavigator();
const TabTop = createMaterialTopTabNavigator();

// Hoc
import {HOCdetail} from '../src/hoc';

// Redux
import {useSelector} from 'react-redux';

const DetailProduct = ({route}) => {
  const {accent, color} = useSelector((store) => store.ThemeReducer.theme.colors);

  const ChildProduct = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="DetailProductScreen"
        component={HOCdetail(DetailProductScreen)}
        initialParams={route.params}
      />
      <Stack.Screen
        name="DetailProductEditScreen"
        component={HOCdetail(DetailProductEditScreen)}
        initialParams={route.params}
        options={{title: 'Edit product'}}
      />
    </Stack.Navigator>
  );
  return (
    <TabTop.Navigator
      tabBarOptions={{
        indicatorStyle: {backgroundColor: accent},
        inactiveTintColor: color,
      }}>
      <TabTop.Screen
        component={ChildProduct}
        name="ChildProduct"
        options={{title: 'Details'}}
      />
      {/* <TabTop.Screen
        component={DetailProductDatabaseScreen}
        name="DetailProductDatabaseScreen"
        options={{title: 'Database'}}
        initialParams={route}
      /> */}
      <TabTop.Screen
        component={DetailProductAnalysisScreen}
        name="DetailProductAnalysisScreen"
        options={{title: 'Analysis'}}
        initialParams={route}
      />
    </TabTop.Navigator>
  );
};

export default DetailProduct;
