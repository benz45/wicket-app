// import fetchReducer from './fetchReducer';
import {combineReducers} from 'redux';
import ThemeReducer from './reducer_theme';
import FirebaseReducer from './reducer_firebase';
import NotificationReducer from './reducer_notification';
import AddProductReducer from './reducer_addProduct';
import UserConnectionReducer from './reducer_userConnection';

export default combineReducers({
  ThemeReducer,
  FirebaseReducer,
  NotificationReducer,
  AddProductReducer,
  UserConnectionReducer,
});
