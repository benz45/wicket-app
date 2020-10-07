import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {
  Switch,
  Divider,
  Text,
  Caption,
  Avatar,
  IconButton,
} from 'react-native-paper';

// React Navigations
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// Actions
import {setThemeToCacheAndStore} from '../src/actions/actions_cache';
import {useDispatch, useSelector} from 'react-redux';

const SwitchTheme = ({value, fetching}) => {
  const dispatch = useDispatch();
  const [isEnable, setEnable] = useState(false);

  // First load cache
  useEffect(() => {
    setEnable(value);
  }, [fetching]);

  const toggleSwitch = () => {
    setEnable((prevState) => !prevState);
    dispatch(setThemeToCacheAndStore(!isEnable));
  };

  return (
    <Switch onValueChange={toggleSwitch} value={isEnable} style={{flex: 1}} />
  );
};

const CustomDrawer = (props) => {
  const {isCacheTheme, isFetching} = useSelector((res) => res.ThemeReducer);
  const {user} = useSelector((res) => res.FirebaseReducer.currentUser);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        labelStyle={{display: 'none'}}
        label="Veerapan"
        icon={() => (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/logo.png')}
                style={{width: 35, height: 35, marginRight: 5}}
              />
              <View>
                <Text style={{textTransform: 'uppercase', fontSize: 16}}>
                  Wicket
                </Text>
                <Text style={{fontSize: 9}}>Welcome to wicket</Text>
              </View>
            </View>
          </>
        )}
      />
      <DrawerItem
        labelStyle={{display: 'none'}}
        label="Veerapan"
        icon={() => (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image size={38} source={{uri: user.photoURL}} />
              <View style={{marginHorizontal: 20}}>
                <Text>{user.displayName}</Text>
                <Caption>{user.email}</Caption>
              </View>
              <IconButton
                icon="equal"
                color="#757575"
                style={{flex: 1, right: -10}}
              />
            </View>
          </>
        )}
      />

      <DrawerItem
        labelStyle={{display: 'none'}}
        label="Help"
        icon={() => (
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text>Theme</Text>
              <Caption>{!isCacheTheme ? 'Dark' : 'Light'}</Caption>
            </View>
            <SwitchTheme value={isCacheTheme} fetching={isFetching} />
          </View>
        )}
      />
      <Divider style={{color: '#000000', marginBottom: 15}} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
