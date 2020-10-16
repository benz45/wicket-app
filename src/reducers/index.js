// import fetchReducer from './fetchReducer';
import {combineReducers} from 'redux';
import ThemeReducer from './reducer_theme';
import FirebaseReducer from './reducer_firebase';
import NotificationReducer from './reducer_notification';
import AddProductReducer from './reducer_addProduct';

export default combineReducers({
  ThemeReducer,
  FirebaseReducer,
  NotificationReducer,
  AddProductReducer,
});
