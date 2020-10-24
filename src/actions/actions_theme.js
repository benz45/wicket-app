import {DefaultTheme, DarkTheme} from 'react-native-paper';

const font = {
  headOver: 34,
  head: {
    size: 24,
    letterSpacing: 0,
    fontWeight: 400,
  },
  subHead: {
    size: 20,
    letterSpacing: 0.15,
    fontWeight: 500,
  },
  subTitle: {
    size: 16,
    letterSpacing: 0.15,
    fontWeight: 400,
  },
  body: {
    size: 14,
    letterSpacing: 0.25,
    fontWeight: 400,
  },
  button: {
    size: 14,
    letterSpacing: 1.25,
    fontWeight: 500,
  },
  caption: {
    size: 12,
    letterSpacing: 0.4,
    fontWeight: 400,
  },
};

const theme = {
  light: {
    ...DefaultTheme,
    theme: 'light',
    mode: 'exact',
    roundness: 10,
    font,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2196F3',
      accent: '#90CAF9',
      text: '#000000de',
      subText: '#0009',
      button: '#2196F3',
      tabBackground: '#ffffff',
      tabColor: '#757575',
      tabActiveColor: '#424242',
      error: '#F44336',
      warning: '#ffcc00',
      barStyle: {
        mode: 'dark-content',
        backgroundColor: '#E0E0E0',
        color: '#212121',
      },
    },
  },
  dark: {
    ...DarkTheme,
    theme: 'dark',
    roundness: 10,
    font,
    colors: {
      ...DarkTheme.colors,
      primary: '#2196F3',
      accent: '#90CAF9',
      text: '#fafafa',
      subText: '#fff9',
      button: '#2196F3',
      tabBackground: '#212121',
      tabColor: '#212121',
      tabColor: '#9E9E9E',
      tabActiveColor: '#FAFAFA',
      error: '#F44336',
      warning: '#ffcc00',
      barStyle: {
        mode: 'light-content',
        backgroundColor: '#000000',
        color: '#fafafa',
      },
    },
  },
};

export default theme;
