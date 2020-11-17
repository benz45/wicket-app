import React from 'react';
import {AppRegistry, Platform, LogBox} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import App from './src/App';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/configureStore';

// PushNotification
var PushNotification = require('react-native-push-notification');
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// Redux action.
import {SetAllStatus} from './src/actions/actions_firebase';

const {store, persistor} = configureStore();
const reduxApp = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: (snapshot) => {
      console.log('onNotification Notification:', snapshot);

      if (Platform.OS === 'ios') {
        snapshot.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('onAction NOTIFICATION:', notification);
      notification.action === 'Open all'
        ? SetAllStatus(true)
        : SetAllStatus(false);
    },
    popInitialNotification: true,
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: true,
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => reduxApp);
