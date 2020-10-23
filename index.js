import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import App from './src/App';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/configureStore';

// PushNotification
var PushNotification = require('react-native-push-notification');

// Redux action.
import {SetAllStatus} from './src/actions/actions_firebase';

const {store, persistor} = configureStore();
const reduxApp = () => {
  PushNotification.configure({
    onNotification: (snapshot) => {
      console.log('Notification:', snapshot);
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
      notification.action === 'Open all'
        ? SetAllStatus(true)
        : SetAllStatus(false);
    },
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
