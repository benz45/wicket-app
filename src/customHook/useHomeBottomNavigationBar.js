import {useReducer, useMemo} from 'react';
import {Platform} from 'react-native';
import {BottomNavigation} from 'react-native-paper';

// HOC
import {hocHeader} from '../../src/hoc';

// Screens
import HomeScreen from '../../screens/HomeScreen';
import MessageScreen from '../../screens/MessageScreen';
// AddProductScreen have a two screen is add picture and key, add name and descriptions.
import Navigation_AddProduct from '../../screens/AddProductScreens/AddProductScreen';
import NotificationList from '../../screens/NotificationList';
import ProfileScreen from '../../screens/ProfileScreen';

const home = hocHeader(HomeScreen);
const message = MessageScreen;
const addProduct = Navigation_AddProduct;
const notificationList = hocHeader(NotificationList);
const profile = ProfileScreen;

const SET_INDEX = 'SET_INDEX';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_INDEX:
      state.routes[payload].badge = false;
      return {
        ...state,
        index: payload,
        routes: [...state.routes],
      };
    default:
      throw new Error();
  }
};

export default function useHomeBottomNavigationBar() {
  let android = Platform.OS == 'android';
  function objs(key, title, icon, badge) {
    this.key = key;
    this.title = title;
    this.icon = icon;
    this.badge = badge;
  }
  let routes = [];
  routes.push(new objs('home', 'Home', 'home', false));
  routes.push(new objs('message', 'Message', 'facebook-messenger', false));
  routes.push(new objs('product', 'Product', 'plus-circle', false));
  if (android)
    routes.push(new objs('notificationList', 'Notification', 'bell', false));
  routes.push(new objs('profile', 'Profile', 'account', false));

  let initialStateTest = new Object();
  initialStateTest.index = 0;
  initialStateTest.routes = routes;

  const [state, dispatch] = useReducer(reducer, initialStateTest);

  const _handleIndexChange = (val) => {
    dispatch({type: SET_INDEX, payload: val});
  };

  const _renderScene = useMemo(() => {
    return BottomNavigation.SceneMap({
      home: home,
      message: message,
      product: addProduct,
      notificationList: notificationList,
      profile: profile,
    });
  }, []);

  return {state, _renderScene, _handleIndexChange};
}
