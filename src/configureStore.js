import {createStore, applyMiddleware, compose} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';

// Compose
import {composeWithDevTools} from 'redux-devtools-extension';

import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'currentUser',
    'notificationData',
    'settingNotification',
    'settingStatus',
    'settingMessage',
    'messages',
    'connections',
    'allNotification',
    'UserConnectionReducer',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
