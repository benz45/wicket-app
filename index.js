import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import App from 'root/src/App';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from 'root/src/configureStore';
import useNotifications from 'root/src/Hook/useNotifications';

const {store, persistor} = configureStore();
const reduxApp = () => {
  useNotifications();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => reduxApp);
