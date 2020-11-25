import styled from 'styled-components';
import {Platform, Dimensions} from 'react-native';
import {BottomNavigation as BottomNavigationPaper} from 'react-native-paper';

export const BottomNavigation = styled(BottomNavigationPaper).attrs(
  (props) => ({
    // Custom height bar platform ios.
    barStyle: {
      [Platform.OS === 'ios' &&
      Dimensions.get('window').height > 667 &&
      'height']: 70,
      backgroundColor: props.theme.colors.tabBackground,
    },
    inactiveColor: props.theme.colors.tabColor,
    activeColor: props.theme.colors.tabActiveColor,
  }),
)``;
