import React from 'react';

// React Navigation
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import DetailProductScreen from '../screens/DetailsProduct/DetailProductScreen';
import DetailProductEditScreen from '../screens/DetailsProduct/DetailProductEditScreen';

// Toptabs
const Stack = createStackNavigator();

const DetailProduct = ({route: {params}}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DetailProductScreen"
        component={DetailProductScreen}
        initialParams={params}
        options={{title: 'Details'}}
      />
      <Stack.Screen
        name="DetailProductEditScreen"
        component={DetailProductEditScreen}
        initialParams={params}
        options={{title: 'Edit'}}
      />
    </Stack.Navigator>
  );
};

export default DetailProduct;
