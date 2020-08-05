import {DefaultTheme, DarkTheme} from 'react-native-paper';

const theme = {
  light: {
    ...DefaultTheme,
    theme: 'light',
    mode: 'exact',
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: '#fafafa',
      accent: '#B388FF',
      text: '#757575',
      button: '#bb86fc',
      tabBackground: '#ffffff',
      tabColor: '#757575',
      tabActiveColor: '#424242',
      error: '#CF4127',
      warning: '#ffcc00',
      barStyle: {
        mode: 'dark-content',
        backgroundColor: '#E0E0E0',
        color: '#212121'
      }
    },
  },
  dark: {
    ...DarkTheme,
    theme: 'dark',
    roundness: 10,
    colors: {
      ...DarkTheme.colors,
      primary: '#616161',
      accent: '#B388FF',
      text: '#fafafa',
      button: '#7C4DFF',
      tabBackground: '#212121',
      tabColor: '#212121',
      tabColor: '#9E9E9E',
      tabActiveColor: '#FAFAFA',
      error: '#CF4127',
      warning: '#ffcc00',
      barStyle: {
        mode: 'light-content',
        backgroundColor: '#000000',
        color: '#fafafa'
      }
    },
  },
};

export default theme;
