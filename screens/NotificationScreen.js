import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {List, Card, Colors, Avatar, Switch} from 'react-native-paper';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {action_deleteNavigation} from '../src/actions/actions_notification';

const SettingsNavigation = () => {
  const dispatch = useDispatch();
  const {notificationData} = useSelector(
    (reducer) => reducer.NotificationReducer,
  );

  // State
  const [longPress, setLongPress] = useState(false);

  const _removeNotification = (id) => {
    PushNotification.cancelLocalNotifications({id});
    const res = notificationData.filter((x) => x.id !== id);
    dispatch(action_deleteNavigation(res));
  };

  const _rightIcon = (id) => {
    return !longPress ? (
      <Switch style={{alignSelf: 'center', right: 10}} />
    ) : (
      <TouchableOpacity
        onPress={() => _removeNotification(id)}
        style={{alignSelf: 'center'}}>
        <Avatar.Icon
          style={{right: 10, backgroundColor: '#660000'}}
          icon="delete-empty"
          size={39}
          color={Colors.red500}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => setLongPress(false)}
          activeOpacity={1}
          style={{paddingVertical: 20, flex: 1}}>
          {notificationData.map((elem) => (
            <TouchableOpacity
              onLongPress={() => setLongPress(true)}
              delayLongPress={500}
              activeOpacity={0.7}>
              <Card style={{marginVertical: 10, paddingVertical: 7}}>
                <List.Item
                  title={elem.time}
                  titleStyle={{fontSize: 23}}
                  description={elem.message}
                  right={() => _rightIcon(elem.id)}
                />
              </Card>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsNavigation;
