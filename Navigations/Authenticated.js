import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Navigations
import Navigation_HomeStack from '../Navigations/Navigation_HomeStack';

// Actions`
import {result_updateDoorStatus} from '../src/actions/actions_firebase';

// Redux
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Authenticated = () => {
  const {isUser, settingStatus} = useSelector((reducer) => {
    return {
      ...reducer.FirebaseReducer.currentUser,
      ...reducer.NotificationReducer,
    };
  });

  useEffect(() => {
    result_updateDoorStatus(settingStatus);
  }, [settingStatus]);

  return isUser ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Navigation_HomeStack"
        component={Navigation_HomeStack}
      />
    </Stack.Navigator>
  ) : null;
};

export default Authenticated;
