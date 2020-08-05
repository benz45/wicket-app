import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {List, Card, Colors, Avatar} from 'react-native-paper';

// Component
import Nodata from '../components/noData';

// Styled
import {View, Text} from '../styles/styled';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {action_deleteNavigation} from '../src/actions/actions_notification';

const SettingsNavigation = () => {
  const dispatch = useDispatch();
  const {
    notificationData,
    colors: {accent},
  } = useSelector((reducer) => {
    return {...reducer.NotificationReducer, ...reducer.ThemeReducer.theme};
  });

  // State
  const [longPress, setLongPress] = useState(false);

  const _removeNotification = (id) => {
    PushNotification.cancelLocalNotifications({id});
    const res = notificationData.filter((x) => x.id !== id);
    dispatch(action_deleteNavigation(res));
  };

  const _rightIcon = (id, repeatType) => {
    return !longPress ? (
      <View justifyContent="center">
        <Text fs={20} size={2} color={accent} fw="bold" pr={20}>
          {repeatType === null ? 'Once' : 'Dialy'}
        </Text>
      </View>
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
        {!!!notificationData.length && (
          <Nodata
            icon="bell-plus-outline"
            header="ADD NOW "
            btnIcon="subdirectory-arrow-right"
            btnIconSize={60}
            btnIconColor={accent}
            headerSize={47}
            description="No data yet. Please increase the data."
          />
        )}
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
                  right={() => _rightIcon(elem.id, elem.repeatType)}
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
