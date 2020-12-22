var PushNotification = require('react-native-push-notification');
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// Redux action.
import {SetAllStatus} from '../../src/actions/actions_firebase';

export default function useNotifications() {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: (snapshot) => {
      console.log('onNotification Notification:', snapshot);

      snapshot.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('onAction NOTIFICATION:', notification);
      notification.action === 'Open all'
        ? SetAllStatus(true)
        : SetAllStatus(false);
    },
    popInitialNotification: true,
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: true,
  });
}
