import React from 'react';

// React Navigation
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import DetailProductScreen from 'root/src/Screens/DetailsProduct/DetailProductScreen';
import DetailProductEditScreen from 'root/src/Screens/DetailsProduct/DetailProductEditScreen';
import HistoryScreen from 'root/src/Screens/HistoryScreen';

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
      <Stack.Screen
        name="Stack_History"
        component={HistoryScreen}
        options={{title: 'History'}}
      />
    </Stack.Navigator>
  );
};

export default DetailProduct;
