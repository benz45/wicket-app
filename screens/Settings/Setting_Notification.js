import React from 'react';
import {View} from 'react-native';
import {List, Card} from 'react-native-paper';

// Component
import Switch from '../../components/CustomSwitch';

const hocView = (Components) => (props) => {
  return (
    <View style={{marginHorizontal: 30, marginVertical: 20}}>
      <Components {...props} />
    </View>
  );
};

const CardSettings = hocView(() => {
  return (
    <Card>
      <List.Item
        title="Notification"
        left={() => <List.Icon icon="bell-ring" />}
        right={() => <Switch callbackValue={(value) => test(value)} />}
      />
      <List.Item
        title="All Event"
        right={() => <Switch callbackValue={(value) => test(value)} />}
      />
      <List.Item
        title="Status"
        right={() => <Switch callbackValue={(value) => test(value)} />}
      />
      <List.Item
        title="Messages"
        right={() => <Switch callbackValue={(value) => test(value)} />}
      />
    </Card>
  );
})

const Setting_Notification = () => {
  const test = (props) => {
    console.log(props);
  };

  return (
    <>
     
      <CardSettings />
      
    </>
  );
};

export default Setting_Notification;
