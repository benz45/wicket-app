import React from 'react';
import {View} from 'react-native';

// Redux
import {useSelector} from 'react-redux';

export default function NotificationList() {
  const {allNotification} = useSelector((res) => res.NotificationReducer);
  console.log(JSON.stringify(allNotification, 0, 2));
  return (
    <View style={{flex: 1, alignSelf: 'center'}}>
      {/* {!!allNotification && !!allNotification.length && allNotification.map(elem => (
        <Text key={elem.sentTime}>{elem.notification.body}</Text>
      ))} */}
    </View>
  );
}
