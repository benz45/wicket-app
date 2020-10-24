import React from 'react';

// Paper
import {List} from 'react-native-paper';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Redux
import {useSelector} from 'react-redux';

import * as Styled from '../../styles/screens/DetailsProduct/Styled_DetailsProductScreen';

import useDetailProductScreen from '../../src/customHook/useDetailProductScreen';

const DetailProductScreen = () => {
  const {navigate} = useNavigation();

  const {accent} = useSelector((store) => store.ThemeReducer.theme.colors);
  const {_keyList, _displayName} = useDetailProductScreen();

  return (
    <React.Fragment>
      {_keyList.map((elem) => (
        <React.Fragment key={elem.no}>
          <Styled.ContainerAvatarImage>
            <Styled.AvatarImage
              source={{
                uri: elem.image,
              }}
            />
          </Styled.ContainerAvatarImage>
          <Styled.ContainerInfo>
            <Styled.Title>{elem.name}</Styled.Title>
            <Styled.ContainerBtn>
              <Styled.BtnHistory>History</Styled.BtnHistory>
              {elem.createdBy == _displayName && (
                <Styled.BtnEdit
                  onPress={() => navigate('DetailProductEditScreen')}>
                  Edit Product
                </Styled.BtnEdit>
              )}
            </Styled.ContainerBtn>
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
              <List.Subheader style={{color: accent}}>Date time</List.Subheader>
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
          </Styled.ContainerInfo>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default DetailProductScreen;
