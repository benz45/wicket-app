import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
// Redux action.
import {SetAllStatus} from 'root/src/actions/actions_firebase';

export default function useNotifications() {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: (snapshot) => {
      console.log('onNotification Notification:', snapshot);
      if (!snapshot?.data) {
        return;
      }
      snapshot.userIteraction = true;
      if (Platform.OS == 'ios') {
        snapshot.finish(PushNotificationIOS.FetchResult.NoData);
      }
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
