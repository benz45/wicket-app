// Routes
import authenticated from './Authenticated';
import authentication from './Authentication';
import loginScreen from '../screens/LoginScreen';
import registerScreen from '../screens/RegisterScreen';
import registerUploadProfileScreen from '../screens/RegisterUploadProfile';
import registerComplateScreen from '../screens/RegisterComplateScreen';
import navigation_homeDrawer from './Navigation_HomeDrawer';
import navigation_notifications from './Notifications';
import navigation_settings from './Settings';
import navigation_detailProduct from './DetailProduct';
import addProduct_informations from '../screens/AddProductScreens/AddProduct_NameAndDescriptionScreen';

export default function NavigationRoute() {
  const routes = {
    authenticated: {
      name: 'AUTHENTICATED',
      component: authenticated,
      child: {
        navigationHomeDrawer: {
          name: 'NAVIGATION_HOME_DRAWER',
          component: navigation_homeDrawer,
        },
        notifications: {
          name: 'NOTIFICATIONS',
          component: navigation_notifications,
        },
        settings: {
          name: 'SETTINGS',
          component: navigation_settings,
        },
        detailProduct: {
          name: 'DETAIL_PRODUCT',
          component: navigation_detailProduct,
        },
        addProductInformations: {
          name: 'ADD_PRODUCT_INFORMATIONS',
          component: addProduct_informations,
        },
      },
    },
    authentication: {
      name: 'AUTHENTICATION',
      component: authentication,
      child: {
        login: {
          name: 'LOGIN',
          component: loginScreen,
        },
        register: {
          name: 'REGISTER',
          component: registerScreen,
        },
        registerProfile: {
          name: 'REGISTER_PROFILE',
          component: registerUploadProfileScreen,
        },
        registerComplate: {
          name: 'REGISTER_COMPLATE',
          component: registerComplateScreen,
        },
      },
    },
  };

  return routes;
}
