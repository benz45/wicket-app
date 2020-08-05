import {createStore, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';

import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'realtimeDatabase',
    'currentUser',
    'theme',
    'notificationData',
    'settingNotification',
    'settingStatus',
    'settingMessage',
    'messages',
    'connections',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
