import React, {useEffect} from 'react';

// Navigations
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../Navigations/Settings';
import AddProduct from '../Navigations/AddProduct';
import DetailProduct from '../Navigations/DetailProduct';
import AppBar from './AppBar';
import Notifications from './Notifications';

// Actions
import {
  action_realtimedb_door_firebase,
  action_realtimedb_door_firebase_lengthData,
} from '../src/actions/actions_firebase';
import {useDispatch} from 'react-redux';

// Screen
import AnalysisScreen from '../screens/AnalysisScreen';

const Stack = createStackNavigator();
const MainScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(action_realtimedb_door_firebase());
      await dispatch(action_realtimedb_door_firebase_lengthData());
    };
    loadData();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Stack_AppBar"
        component={AppBar}
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
        name="Stack_analysis"
        component={AnalysisScreen}
        options={{title: 'Analysis', headerShown: false}}
      />
      <Stack.Screen
        name="Stack_detailProductScreen"
        component={DetailProduct}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Stack_addProduct"
        component={AddProduct}
        options={{title: 'Back'}}
      />
    </Stack.Navigator>
  );
};

export default MainScreen;
