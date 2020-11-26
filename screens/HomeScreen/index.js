import React, {useMemo, useRef, useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';

// Components
import StatusSwitch from '../../components/StatusSwitch';
import {MenuDoor} from '../../components/Menu';
import NoData from '../../components/noData';

// Netinfo
import {useNetInfo} from '@react-native-community/netinfo';

// Navigation
import HomebarOptions from '../../Navigations/HomebarOptions';

// Actions
import {useSelector} from 'react-redux';
import {
  action_checkConnection,
  action_setConnection,
} from '../../src/actions/actions_firebase';

// Styled
import * as Styled from '../../styles/screens/Styled_HomeScreen';

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
    <Text> Loading... </Text>
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
  const netInfo = useNetInfo();
  const prevState = useRef([]);
  const {realtimeDatabase, lengthData} = useSelector(
    (reducer) => reducer.FirebaseReducer,
  );

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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Styled.MainContainer>
      <Styled.ContainerHead>
        <Styled.HeadLayer>
          <Styled.HomeName>House-name</Styled.HomeName>
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
                    {netInfo.isConnected && elem.arduinoConnection === true ? (
                      <StatusSwitch {...elem} />
                    ) : netInfo.isConnected &&
                      elem.arduinoConnection == false ? (
                      <Disconnected />
                    ) : elem.arduinoConnection == 3 && netInfo.isConnected ? (
                      <Styled.ContainerLoading>
                        <Loading />
                      </Styled.ContainerLoading>
                    ) : !netInfo.isConnected ? (
                      <NetWorkDisconnection />
                    ) : null}
                  </Styled.ContainerActionSwitch>
                  <Styled.ContainerShowStatus>
                    <Styled.TextShowStatus>
                      {elem.status ? 'OPEN' : 'CLOSED'}
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
