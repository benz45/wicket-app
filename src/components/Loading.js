import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';

const Loading = () => {
  return (
    <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#111111'
          }}>
         
            <ActivityIndicator
              animating={true}
              color="#3498db"
              style={{padding: 20}}
              hidesWhenStopped={false}
            />
          <Button mode='text' dark={true} color='#f5f5f5'>
            Checking current user. 
          </Button>
        </View>
    </>
  );
};

export default Loading;
