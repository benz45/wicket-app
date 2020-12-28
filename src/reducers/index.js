// import fetchReducer from './fetchReducer';
import {combineReducers} from 'redux';
import ThemeReducer from 'root/src/Reducers/reducer_theme';
import FirebaseReducer from 'root/src/Reducers/reducer_firebase';
import NotificationReducer from 'root/src/Reducers/reducer_notification';
import AddProductReducer from 'root/src/Reducers/reducer_addProduct';
import UserConnectionReducer from 'root/src/Reducers/reducer_userConnection';
import CurrentUserReducer from 'root/src/Reducers/reducer_currentUser';

export default combineReducers({
  ThemeReducer,
  FirebaseReducer,
  NotificationReducer,
  AddProductReducer,
  UserConnectionReducer,
  CurrentUserReducer,
});
