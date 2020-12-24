// import fetchReducer from './fetchReducer';
import {combineReducers} from 'redux';
import ThemeReducer from 'root/src/reducers/reducer_theme';
import FirebaseReducer from 'root/src/reducers/reducer_firebase';
import NotificationReducer from 'root/src/reducers/reducer_notification';
import AddProductReducer from 'root/src/reducers/reducer_addProduct';
import UserConnectionReducer from 'root/src/reducers/reducer_userConnection';
import CurrentUserReducer from 'root/src/reducers/reducer_currentUser';

export default combineReducers({
  ThemeReducer,
  FirebaseReducer,
  NotificationReducer,
  AddProductReducer,
  UserConnectionReducer,
  CurrentUserReducer,
});
