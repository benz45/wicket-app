import SnackBar from 'react-native-snackbar';

const Toast = (message) => {
  SnackBar.show({
    text: message,
    duration: SnackBar.LENGTH_LONG,
    backgroundColor: '#111111',
    action: {
      text: 'UNDO',
      textColor: '#2196F3',
    },
  });
};

export default Toast;
