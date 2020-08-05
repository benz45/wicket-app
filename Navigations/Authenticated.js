import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Navigations
import RegisterComplateScreen from '../screens/RegisterComplateScreen';

// Component
import MainPage from '../Navigations/MainPage';

// Actions`
import {result_updateDoorStatus} from '../src/actions/actions_firebase';

// Redux
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Authenticated = () => {
  const {isUser} = useSelector(
    (reducer) => reducer.FirebaseReducer.currentUser,
  );

  result_updateDoorStatus();
  return (
    <>
      {isUser ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainPage" component={MainPage} />
          {/* <Stack.Screen
            name="Register-ComplateScreen"
            component={RegisterComplateScreen}
          /> */}
        </Stack.Navigator>
      ) : null}
    </>
  );
};

export default Authenticated;
