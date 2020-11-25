import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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
  };

  return {_pushNotificationBasic};
}
