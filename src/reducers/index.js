// import fetchReducer from './fetchReducer';
import {combineReducers} from 'redux';
import ThemeReducer from './reducer_theme';
import FirebaseReducer from './reducer_firebase';
import NotificationReducer from './reducer_notification';

export default combineReducers({
  ThemeReducer,
  FirebaseReducer,
  NotificationReducer,
});
