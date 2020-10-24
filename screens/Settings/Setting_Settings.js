import React from 'react';
import {View, Text} from 'react-native';
import {List, Divider, Searchbar} from 'react-native-paper';

// Navigation
import {useNavigation} from '@react-navigation/native';

const HOClist = (value) => {
  const {navigate} = useNavigation();
  return (
    <List.Item
      title={value.title}
      onPress={() => navigate(value.navg)}
      left={(props) => <List.Icon {...props} icon={value.leftIcon} />}
      right={(props) => <List.Icon {...props} icon="chevron-right" />}
    />
  );
};

const Setting_Settings = () => {
  return (
    <View>
      <HOClist
        navg="settings_aboutApp"
        title="About app"
        leftIcon="information"
      />
      <HOClist navg="settings_update" title="Update" leftIcon="arrow-up-bold" />
      <Divider />
      <HOClist
        navg="settings_notifications"
        title="Notifications"
        leftIcon="bell-ring"
      />
      <HOClist navg="settings_theme" title="Theme" leftIcon="brush" />
      <HOClist
        navg="settings_additionalSetting"
        title="Additional settings"
        leftIcon="dots-horizontal-circle"
      />
      <Divider />
      <HOClist navg="settings_privacy" title="Privacy" leftIcon="eye" />
      <HOClist
        navg="settings_feedback"
        title="Feedback"
        leftIcon="help-circle"
      />
    </View>
  );
};

export default Setting_Settings;
