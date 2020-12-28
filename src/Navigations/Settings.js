import React from 'react';

// Navigation
import {createStackNavigator} from '@react-navigation/stack';

// Screen setting.
import Setting_Settings from 'root/src/Screens/Settings/Setting_Settings';
import Setting_AboutApp from 'root/src/Screens/Settings/Setting_AboutApp';
import Setting_Update from 'root/src/Screens/Settings/Setting_Update';
import Setting_Notification from 'root/src/Screens/Settings/Setting_Notification';
import Setting_Theme from 'root/src/Screens/Settings/Setting_Theme';
import Setting_AdditionalSetting from 'root/src/Screens/Settings/Setting_AdditionalSetting';
import Setting_Privacy from 'root/src/Screens/Settings/Setting_Privacy';
import Setting_Feedback from 'root/src/Screens/Settings/Setting_Feedback';

// hoc
import {hocSettings as hoc} from 'root/src/hoc';

const hocSettings = hoc(Setting_Settings);
const hocAboutApp = hoc(Setting_AboutApp);
const hocUpdate = hoc(Setting_Update);
const hocNotification = hoc(Setting_Notification);
const hocTheme = hoc(Setting_Theme);
const hocAdditionalSetting = hoc(Setting_AdditionalSetting);
const hocPrivacy = hoc(Setting_Privacy);
const hocFeedback = hoc(Setting_Feedback);

const Stack = createStackNavigator();
const Settings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="settings_settings"
        component={hocSettings}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name="settings_aboutApp"
        component={hocAboutApp}
        options={{title: 'About app'}}
      />
      <Stack.Screen
        name="settings_update"
        component={hocUpdate}
        options={{title: 'Update'}}
      />
      <Stack.Screen
        name="settings_notifications"
        component={Setting_Notification}
        options={{title: 'Notifications'}}
      />
      <Stack.Screen
        name="settings_theme"
        component={hocTheme}
        options={{title: 'Theme'}}
      />
      <Stack.Screen
        name="settings_additionalSetting"
        component={hocAdditionalSetting}
        options={{title: 'Additional settings'}}
      />
      <Stack.Screen
        name="settings_privacy"
        component={hocPrivacy}
        options={{title: 'Privacy'}}
      />
      <Stack.Screen
        name="settings_feedback"
        component={hocFeedback}
        options={{title: 'Services & Feedbase'}}
      />
    </Stack.Navigator>
  );
};

export default Settings;
