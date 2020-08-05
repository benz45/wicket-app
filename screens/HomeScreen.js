import React, {useMemo, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';
import {
  Button,
  Card,
  Text,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// Components
import StatusSwitch from '../components/StatusSwitch';
import {MenuDoor} from '../components/Menu';
import NoData from '../components/noData';

// Netinfo
import {useNetInfo} from '@react-native-community/netinfo';

// Navigation
import HomebarOptions from '../Navigations/HomebarOptions';

// Actions
import {useSelector} from 'react-redux';
import {
  action_checkConnection,
  action_setConnection,
  action_connectionChanged,
} from '../src/actions/actions_firebase';

// Styled
import {View} from '../styles/styled';

const HomeScreen = ({jumpTo}) => {
  const netInfo = useNetInfo();
  const netConnection = netInfo.isConnected;
  const prevState = useRef([]);
  const {realtimeDatabase, lengthData, colors} = useSelector((reducer) => {
    return {...reducer.FirebaseReducer, ...reducer.ThemeReducer.theme};
  });

  useEffect(() => {
    // Assuming user is logged in
    const {uid, photoURL, displayName, email} = auth().currentUser;

    const reference = database().ref(`/online/user/${uid}`);

    // Set the /users/:userId value to true
    reference.set({
      photoURL,
      email,
      displayName,
      uid,
    });

    // Remove the node whenever the client disconnects.
    reference.onDisconnect().remove();
  }, [netInfo]);

  useMemo(() => {
    const _setPrev = async () => {
      await action_checkConnection().then((res) => {
        const arrState = res.states;
        prevState.current = Object.values(arrState);
      });
    };
    _setPrev();
    const _loopCheckConnection = () => {
      setTimeout(() => {
        action_checkConnection().then(async (res) => {
          const arrStates = await Object.values(res.states);

          const offline = await arrStates.filter((elem) => {
            for (let i of prevState.current) {
              if (elem.state == i.state) {
                return elem.no;
              }
            }
          });

          // find array if connnection app.
          const newArrThatConnectApp = await offline.filter((elem) => {
            for (let i of realtimeDatabase) {
              if (elem.no == i.no) {
                return elem.no;
              }
            }
          });

          await newArrThatConnectApp.map((elem) =>
            action_setConnection(elem.no, false),
          );
          prevState.current = arrStates;

          _loopCheckConnection();
        });
      }, 20000);
    };
    _loopCheckConnection();
  }, []);

  const subTitle = (id) => {
    if (id && netConnection) {
      return 'Connected';
    } else if (!id && netConnection) {
      return 'Module disconnected';
    } else if (id == 3 && netConnection) {
      return 'Loading...';
    } else if (!netInfo.isConnected) {
      return 'Network disconnected';
    }
  };

  return (
    <View flex={1} pb={80}>
      <View ph={30}>
        <View flexDirection="row">
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 23,
              }}>
              House-name
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            {netInfo.isConnected ? (
              <IconButton icon="shield-check" size={22} color="#58B924" />
            ) : (
              <IconButton icon="alert-circle" size={22} color="#CF4127" />
            )}
          </View>
        </View>
        <ScrollView
          style={{
            marginBottom: 16,
          }}>
          <HomebarOptions />
        </ScrollView>
      </View>
      {lengthData && (
        <ScrollView>
          {realtimeDatabase.map((elem) => (
            <View key={elem.no} mh={30}>
              <Card
                key={elem.no}
                style={{
                  borderRadius: 30,
                  marginBottom: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                }}>
                <Card.Title
                  title={`${elem.name}`}
                  subtitle={`${subTitle(elem.arduinoConnection)}`}
                  right={() => <MenuDoor {...elem} />}
                />
                <Card.Content />
                <Card.Content
                  style={{
                    alignItems: 'center',
                  }}>
                  <Card.Cover
                    style={{
                      height: 200,
                      width: 200,
                      borderRadius: 100,
                    }}
                    source={{
                      uri: elem.image,
                    }}
                  />
                </Card.Content>
                <Card.Actions
                  style={{
                    justifyContent: 'space-between',
                    padding: 17,
                  }}>
                  <View fd="row" ai="center">
                    {netInfo.isConnected && elem.arduinoConnection === true ? (
                      <StatusSwitch {...elem} />
                    ) : netInfo.isConnected &&
                      elem.arduinoConnection == false ? (
                      <>
                        <Button
                          icon="alert-circle-outline"
                          color={colors.warning}
                          style={{
                            marginHorizontal: -20,
                          }}
                        />
                        <Text>Disconnected</Text>
                      </>
                    ) : elem.arduinoConnection == 3 && netInfo.isConnected ? (
                      <View ai="center" fd="row">
                        <ActivityIndicator
                          animating={true}
                          size={16}
                          color={colors.warning}
                          style={{
                            marginRight: 10,
                          }}
                        />
                        <Text> Loading... </Text>
                      </View>
                    ) : !netInfo.isConnected ? (
                      <>
                        <Button
                          icon="alert-circle-outline"
                          color={colors.error}
                          style={{
                            marginHorizontal: -20,
                          }}
                        />
                        <Text> Network disconnected </Text>
                      </>
                    ) : null}
                  </View>
                  <View fd="row">
                    <Text> Status {`\t`} </Text>
                    <Text
                      style={{
                        color: colors.accent,
                        borderBottomColor: colors.accent,
                        borderBottomWidth: 1,
                      }}>
                      {elem.status ? 'Turn on' : 'Turn off'}
                    </Text>
                  </View>
                </Card.Actions>
              </Card>
            </View>
          ))}
        </ScrollView>
      )}
      {!lengthData && (
        <NoData
          icon="database-plus"
          header="Woo! "
          description="No data yet. Please increase the data."
          btnNavigate="Stack_addProduct"
          headerSize={60}
          btnTitle="ADD PRODUCT"
        />
      )}
    </View>
  );
};

export default HomeScreen;
