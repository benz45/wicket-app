import React from 'react';
import {View, Text} from 'react-native';

// Paper
import {Card, Title, List} from 'react-native-paper';

// Component
import {Button} from '../../components/CustomBtn';
import PaperButton from '../../components/CustomButton';

// Navigation
import {useRoute, useNavigation} from '@react-navigation/native';

// Redux
import {useSelector} from 'react-redux';

const DetailProductScreen = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const {
    realtimeDatabase,
    currentUser: {user},
  } = useSelector((store) => store.FirebaseReducer);
  const {accent} = useSelector((store) => store.ThemeReducer.theme.colors);

  // Validate data.
  const newData = realtimeDatabase.filter((find) => {
    return find.no == params.no;
  });

  return (
    <View>
      {newData.map((elem) => (
        <Card>
          <Card.Cover
            source={{uri: elem.image}}
            style={{alignSelf: 'stretch'}}
          />
          <Card.Content>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 30,
                  paddingTop: 8,
                }}>
                <View style={{marginVertical: 12, alignItems: 'center'}}>
                  <Title>{elem.name}</Title>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 12,
                }}>
                <PaperButton
                  mode="contained"
                  uppercase={false}
                  style={{marginHorizontal: 6, paddingHorizontal: 22}}>
                  {`${elem.status ? 'Turn On' : 'Turn Off'}`}
                </PaperButton>

                {params.createdBy == user.displayName && (
                  <Button
                    mode="outlined"
                    uppercase={false}
                    style={{marginHorizontal: 6}}
                    onPress={() => navigate('DetailProductEditScreen')}>
                    Edit Product
                  </Button>
                )}
              </View>
              <View>
                <List.Section>
                  <List.Subheader style={{color: accent}}>Info</List.Subheader>
                  <List.Item
                    title="Description"
                    description={elem.description}
                    left={() => <List.Icon icon="card-bulleted" />}
                  />
                  <List.Item
                    title="Product key"
                    description={elem.no}
                    left={() => <List.Icon icon="key" />}
                  />
                  <List.Item
                    title="Created by"
                    description={elem.createdBy}
                    left={() => <List.Icon icon="account-star" />}
                  />
                </List.Section>
                <List.Section>
                  <List.Subheader style={{color: accent}}>
                    Date time
                  </List.Subheader>
                  <List.Item
                    title="Created On"
                    description={elem.createdDate}
                    left={() => <List.Icon icon="calendar-import" />}
                  />
                  <List.Item
                    title="Latest status"
                    description={elem.latestStatus}
                    left={() => <List.Icon icon="update" />}
                  />
                </List.Section>
              </View>
            </View>
          </Card.Content>
          <Card.Actions></Card.Actions>
        </Card>
      ))}
    </View>
  );
};

export default DetailProductScreen;
