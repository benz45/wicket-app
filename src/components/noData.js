import React from 'react';
import {View} from 'react-native';
import {Colors, Text, IconButton, Paragraph} from 'react-native-paper';

// Component
import {Button} from 'root/src/components/CustomBtn';

// Styles
import styles from 'root/src/styles/styles';

const noData = ({
  icon,
  header,
  description,
  btnTitle,
  btnIcon,
  btnIconSize,
  btnJumpto,
  btnIconColor,
  headerSize,
}) => {
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
        <Button mode="outlined" onPress={btnJumpto && btnJumpto}>
          {btnTitle}
        </Button>
      )}
    </View>
  );
};

export default noData;
