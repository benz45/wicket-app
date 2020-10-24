import React from 'react';
import {View} from 'react-native';
import {Chip} from 'react-native-paper';

// Redux
import {useSelector} from 'react-redux';

// Custom Chip
const CustomChip = (props) => {
  return (
    <Chip
      icon={props.icon}
      mode="contained"
      style={{
        borderRadius: 40,
        alignSelf: 'flex-start',
        marginRight: 8,
      }}
      {...props}>
      {props.label}
    </Chip>
  );
};

const barHome = () => {
  const {realtimeDatabase, lengthData} = useSelector((reducer) => {
    return reducer.FirebaseReducer;
  });
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {lengthData && (
        <>
          <CustomChip
            icon="apps"
            label={`${lengthData ? realtimeDatabase.length : 0} Modules`}
          />
        </>
      )}
    </View>
  );
};

export default barHome;
