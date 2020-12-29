import React, {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';

// Components
import StatusSwitch from 'root/src/Components/StatusSwitch';
import {MenuDoor} from 'root/src/Components/Menu';
import NoData from 'root/src/Components/noData';

// Navigation
import HomebarOptions from 'root/src/Navigations/HomebarOptions';

// Actions
import {useSelector, useDispatch} from 'react-redux';
import {action_realtimedb_door_firebase} from 'root/src/Actions/actions_firebase';

// Custom hook
import useCheckDoorConnection from 'root/src/Hook/useCheckDoorConnection';

// Styled
import * as Styled from 'root/src/Styles/Screens/Styled_HomeScreen';

const NetInfoConnection = () => {
  const {isNetInfo} = useSelector(({NetInfoReducer}) => NetInfoReducer);

  return isNetInfo ? <Styled.IconConnected /> : <Styled.IconDisConnected />;
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
  const {isNetInfo} = useSelector(({NetInfoReducer}) => NetInfoReducer);
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
                    {isNetInfo &&
                    typeof elem.arduinoConnection === 'boolean' &&
                    !!elem.arduinoConnection ? (
                      <StatusSwitch id={elem.key} status={elem.status} />
                    ) : isNetInfo &&
                      typeof elem.arduinoConnection === 'boolean' &&
                      !!!elem.arduinoConnection ? (
                      <Disconnected />
                    ) : typeof elem.arduinoConnection == 'string' &&
                      elem.arduinoConnection == 'WAITING_CONNECTION' &&
                      isNetInfo ? (
                      <Styled.ContainerLoading>
                        <Loading />
                      </Styled.ContainerLoading>
                    ) : !isNetInfo ? (
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
