import React from 'react';
import {View} from 'react-native';
import {
  Colors,
  Text,
  IconButton,
  Paragraph,
  BottomNavigation,
} from 'react-native-paper';

// Navigations
import {useNavigation} from '@react-navigation/native';

// Component
import {Button} from '../components/CustomBtn';

// Styles
import styles from '../styles/styles';

const noData = ({
  icon,
  header,
  description,
  btnNavigate,
  btnTitle,
  btnIcon,
  btnIconSize,
  btnIconColor,
  headerSize,
}) => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.ActivityIndicator}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: Colors.grey600, fontSize: headerSize}}>
          {header}
        </Text>
        <IconButton
          icon={icon}
          color={Colors.grey600}
          size={headerSize}
          style={{marginLeft: -23}}
        />
      </View>
      <Paragraph style={{color: Colors.grey600, marginBottom: 15}}>
        {description}
      </Paragraph>
      {btnIcon && (
        <IconButton icon={btnIcon} color={btnIconColor} size={btnIconSize} />
      )}
      {btnTitle && (
        <Button mode="outlined" onPress={() => navigate(btnNavigate)}>
          {btnTitle}
        </Button>
      )}
    </View>
  );
};

export default noData;
