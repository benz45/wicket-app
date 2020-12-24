import React, {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';

// Components
import StatusSwitch from 'root/src/components/StatusSwitch';
import {MenuDoor} from 'root/src/components/Menu';
import NoData from 'root/src/components/noData';

// Netinfo
import {useNetInfo} from '@react-native-community/netinfo';

// Navigation
import HomebarOptions from 'root/src/Navigations/HomebarOptions';

// Actions
import {useSelector, useDispatch} from 'react-redux';
import {action_realtimedb_door_firebase} from 'root/src/actions/actions_firebase';

// Custom hook
import useCheckDoorConnection from 'root/src/customHook/useCheckDoorConnection';

// Styled
import * as Styled from 'root/src/styles/screens/Styled_HomeScreen';

const NetInfoConnection = () => {
  const netInfo = useNetInfo();

  return netInfo.isConnected ? (
    <Styled.IconConnected />
  ) : (
    <Styled.IconDisConnected />
  );
};

const Disconnected = () => (
  <>
    <Styled.BtnDisconnected />
    <Styled.TextDisconnected>Disconnected</Styled.TextDisconnected>
  </>
);

const Loading = () => (
  <>
    <Styled.ActivityIndicator />
    <Text> Waiting Connection... </Text>
  </>
);

const NetWorkDisconnection = () => (
  <>
    <Styled.BtnNetworkDisconnected />
    <Styled.TextNetworkDisconnected>
      Network disconnected
    </Styled.TextNetworkDisconnected>
  </>
);

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = ({jumpTo}) => {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const {realtimeDatabase, lengthData} = useSelector(
    (reducer) => reducer.FirebaseReducer,
  );

  // Check a door connections.
  useCheckDoorConnection();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      dispatch(action_realtimedb_door_firebase());
      setRefreshing(false);
    });
  }, []);

  return (
    <Styled.MainContainer>
      <Styled.ContainerHead>
        <Styled.HeadLayer>
          <Styled.HomeName>Demo House</Styled.HomeName>
          <NetInfoConnection />
        </Styled.HeadLayer>
        <Styled.ContainerHomeBar>
          <HomebarOptions />
        </Styled.ContainerHomeBar>
      </Styled.ContainerHead>
      {lengthData && (
        <ScrollView
          refreshControl={
            <Styled.RefreshControlStyle
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {realtimeDatabase.map((elem) => (
            <Styled.ContainerCard key={elem.key}>
              <Styled.Card key={elem.key}>
                <Styled.CardTitle
                  title={`${elem.name}`}
                  subtitle={elem.description}
                  right={() => (
                    <MenuDoor
                      createdBy={elem.createdBy}
                      id={elem.key}
                      name={elem.name}
                    />
                  )}
                />
                <Styled.CardContent>
                  <Styled.CardCover
                    source={{
                      uri: elem.image,
                    }}
                  />
                </Styled.CardContent>
                <Styled.CardActions>
                  <Styled.ContainerActionSwitch>
                    {netInfo.isConnected &&
                    typeof elem.arduinoConnection === 'boolean' &&
                    !!elem.arduinoConnection ? (
                      <StatusSwitch id={elem.key} status={elem.status} />
                    ) : netInfo.isConnected &&
                      typeof elem.arduinoConnection === 'boolean' &&
                      !!!elem.arduinoConnection ? (
                      <Disconnected />
                    ) : typeof elem.arduinoConnection == 'string' &&
                      elem.arduinoConnection == 'WAITING_CONNECTION' &&
                      netInfo.isConnected ? (
                      <Styled.ContainerLoading>
                        <Loading />
                      </Styled.ContainerLoading>
                    ) : !netInfo.isConnected ? (
                      <NetWorkDisconnection />
                    ) : null}
                  </Styled.ContainerActionSwitch>
                  <Styled.ContainerShowStatus>
                    <Styled.TextShowStatus>
                      {elem.degree > 10 ? 'OPEN' : 'CLOSE'}
                    </Styled.TextShowStatus>
                  </Styled.ContainerShowStatus>
                </Styled.CardActions>
              </Styled.Card>
            </Styled.ContainerCard>
          ))}
        </ScrollView>
      )}

      {!lengthData && (
        <Styled.ContainerNoData>
          <NoData
            icon="database-plus"
            header="Woo! "
            description="No data yet. Please increase the data."
            headerSize={60}
            btnJumpto={() => jumpTo('product')}
            btnTitle="ADD PRODUCT"
          />
        </Styled.ContainerNoData>
      )}
    </Styled.MainContainer>
  );
};

export default HomeScreen;
