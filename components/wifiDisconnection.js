import React from 'react';
import {Colors, Text, IconButton} from 'react-native-paper'

const wifiDisconnection = () => {
  return (
    <>
      <IconButton icon="wifi-off" color={Colors.grey600} size={70} />
      <Text style={{color: Colors.grey600}}>
        Wifi Disconnection Please try again.
      </Text>
    </>
  );
};

export default wifiDisconnection;
