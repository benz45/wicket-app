import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
export default function usePushNotification() {
  const _pushNotificationBasic = async ({title = '', message = ''}) => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addNotificationRequest({
        id: 'notificationWithSound',
        title,
        body: message,
        sound: 'customSound.wav',
        badge: 1,
      });
    }
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        foreground: false,
        userInteraction: false,
        title,
        message,
      });
    }
  };

  return {_pushNotificationBasic};
}
