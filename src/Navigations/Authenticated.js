import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DetailProduct from 'root/src/Navigations/DetailProduct';
import Navigation_HomeDrawer from 'root/src/Navigations/Navigation_HomeDrawer';
import Notifications from 'root/src/Navigations/Notifications';
import Settings from 'root/src/Navigations/Settings';
import addProduct_informations from 'root/src/screens/AddProductScreens/AddProduct_NameAndDescriptionScreen';
import RegisterUploadProfile from 'root/src/screens/RegisterUploadProfile';
import auth from '@react-native-firebase/auth';
import {LOAD_CURRENT_USER_FIREBASE} from 'root/src/actionsType';

// HOC
import {HOCform} from 'root/src/hoc';

// Actions`
import {
  result_updateDoorStatus,
  action_realtimedb_door_firebase,
} from 'root/src/actions/actions_firebase';

// Redux
import {useSelector, useDispatch} from 'react-redux';

const Stack = createStackNavigator();

// Navaigations
import {useNavigation} from '@react-navigation/native';

const Authenticated = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {isUser, user} = useSelector((store) => store.CurrentUserReducer);
  const {settingStatus} = useSelector((store) => store.NotificationReducer);

  const loadData = () => {
    dispatch(action_realtimedb_door_firebase());
  };

  useEffect(() => {
    if (isUser) {
      loadData();
      if (!!!user.displayName) {
        navigate('RegisterProfile');
      }
    }
  }, [isUser]);

  const onUserChanged = (userValue) => {
    if (!!userValue) {
      console.log(userValue);
      dispatch({type: LOAD_CURRENT_USER_FIREBASE, payload: userValue});
    }
  };

  useEffect(() => {
    const subscriber = auth().onUserChanged(onUserChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    result_updateDoorStatus(settingStatus);
  }, [settingStatus]);

  return isUser && !!user.displayName ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
        component={addProduct_informations}
        options={{title: 'Create new wicket', headerTransparent: true}}
      />
    </Stack.Navigator>
  ) : isUser && !!!user.displayName ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="RegisterProfile"
        component={HOCform(RegisterUploadProfile)}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : null;
};

export default Authenticated;
