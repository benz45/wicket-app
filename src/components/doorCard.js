import React from 'react';
import {View} from 'react-native';
import {Text, Card} from 'react-native-paper';

// Components
import StatusSwitch from 'root/src/components/StatusSwitch';
import {MenuDoor} from 'root/src/components/Menu';

// Redux
import {useSelector} from 'react-redux';

const doorCard = () => {
  const {realtimeDatabase, colors} = useSelector((reducer) => {
    return {...reducer.FirebaseReducer, ...reducer.ThemeReducer.theme};
  });

  return (
    <>
      {realtimeDatabase.map((elem) => (
        <View key={elem.no} style={{marginHorizontal: 40}}>
          <Card key={elem.no} style={{borderRadius: 30, marginBottom: 20}}>
            <Card.Title
              title={`${elem.name}`}
              subtitle={elem.description}
              right={() => <MenuDoor {...elem} />}
            />
            <Card.Content />
            <Card.Content style={{alignItems: 'center'}}>
              <Card.Cover
                style={{height: 200, width: 200, borderRadius: 100}}
                source={{uri: elem.image}}
              />
            </Card.Content>
            <Card.Actions
              style={{justifyContent: 'space-between', padding: 17}}>
              <View>
                <Text>
                  <StatusSwitch {...elem} />
                  {'\t'}|{'\t'}
                  <Text style={{color: colors.accent}}>
                    {elem.status ? 'Turn on' : 'Turn off'}
                  </Text>
                </Text>
              </View>
            </Card.Actions>
          </Card>
        </View>
      ))}
    </>
  );
};

export default doorCard;
