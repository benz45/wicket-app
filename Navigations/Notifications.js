import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {List, Text, Switch, FAB, IconButton} from 'react-native-paper';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  action_settingNotification,
  action_settingStatus,
  action_settingMessage,
} from '../src/actions/actions_notification';

// Navigate
import {useNavigation} from '@react-navigation/native';

// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import NotificationScreen from '../screens/NotificationScreen';
import AddNotificationScreen from '../screens/AddNotificationScreen';

const hocView = (Components) => (props) => {
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1, marginHorizontal: 30, marginVertical: 20}}>
      <Components {...props} />
      <FAB
        style={{position: 'absolute', alignSelf: 'center', bottom: 20}}
        icon="plus"
        onPress={() => navigate('addNotifications')}
      />
    </View>
  );
};

const TabTop = createMaterialTopTabNavigator();
const Setting_Notification = () => {
  const dispatch = useDispatch();
  const {colors} = useSelector((reducer) => reducer.ThemeReducer.theme);
  const {
    notificationData,
    settingNotification,
    settingStatus,
    settingMessage,
  } = useSelector((reducer) => reducer.NotificationReducer);
  const [handlePress, setHandlePress] = useState(false);
  const [notification, setNotification] = useState(settingNotification);
  const [status, setStatus] = useState(settingStatus);
  const [messages, setMessages] = useState(settingMessage);

  const _setNotification = () => {
    setNotification((prev) => !prev);
    dispatch(action_settingNotification(!notification));
  };
  const _setStatus = () => {
    setStatus((prev) => !prev);
    dispatch(action_settingStatus(!status));
  };
  const _setMessages = () => {
    setMessages((prev) => !prev);
    dispatch(action_settingMessage(!messages));
  };
  const _handlePress = () => setHandlePress((prevState) => !prevState);

  useEffect(() => {
    if (!settingNotification) {
      PushNotification.abandonPermissions();
    }
    if (settingNotification) {
      PushNotification.requestPermissions();
    }
  }, [settingNotification]);
  return (
    <>
      <List.Section>
        <List.Accordion
          title="Settings"
          titleStyle={{
            alignSelf: 'flex-end',
            fontSize: 13,
            color: colors.primary,
          }}
          left={() => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconButton
                  icon="bell-circle"
                  size={30}
                  color={colors.accent}
                />
                <Text style={{fontSize: 20, color: colors.accent}}>
                  Natifications
                </Text>
              </View>
            );
          }}
          expanded={handlePress}
          onPress={() => _handlePress()}>
          <List.Item
            title="Notification"
            right={() => (
              <Switch
                value={settingNotification}
                onValueChange={_setNotification}
              />
            )}
          />
          <List.Item
            title="Status"
            right={() => (
              <Switch
                disabled={!settingNotification}
                value={settingStatus}
                onValueChange={_setStatus}
              />
            )}
          />
          <List.Item
            title="Messages"
            right={() => (
              <Switch
                disabled={!settingNotification}
                value={settingMessage}
                onValueChange={_setMessages}
              />
            )}
          />
        </List.Accordion>
      </List.Section>
      {/* <Divider style={{marginBottom: 15}} /> */}
      <TabTop.Navigator
        tabBarOptions={{indicatorStyle: {backgroundColor: colors.accent}}}>
        <TabTop.Screen
          name="notifications"
          component={hocView(NotificationScreen)}
        />
        <TabTop.Screen
          name="addNotifications"
          component={AddNotificationScreen}
        />
      </TabTop.Navigator>
    </>
  );
};

export default Setting_Notification;

// const Stack = createStackNavigator();
// const Setting_Notification = () => {
//   const icons = (props, value) => {

//     return (
//       <Icons name={props} onPress={()=> console.log("icons -> value", value)} size={25} style={{marginHorizontal: 15}} />
//     );
//   };
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="notifications"
//         component={hocView(NotificationScreen)}
//         options={{title: 'Notification'}}
//       />
//       <Stack.Screen
//         options={{
//           headerLeft: (value) => icons('window-close', value),
//           headerRight: (value) => icons('check', value),
//           headerTitleAlign: 'center',
//           title: 'Add Navigation',
//         }}
//         name="addNotifications"
//         component={AddNotificationScreen}
//       />
//     </Stack.Navigator>
//   );
// };
