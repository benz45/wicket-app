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

const noData = ({jumpTo}) => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.ActivityIndicator}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: Colors.grey600, fontSize: 60}}>Woo! </Text>
        <IconButton
          icon="database-plus"
          color={Colors.grey600}
          size={60}
          style={{marginLeft: -23}}
        />
      </View>
      <Paragraph style={{color: Colors.grey600, marginBottom: 15}}>
        No data yet. Please increase the data.
      </Paragraph>
      <Button mode="outlined" onPress={() => navigate('Stack_addProduct')}>
        Add Produce
      </Button>
    </View>
  );
};

export default noData;
