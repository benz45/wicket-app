import React, {useState, useEffect} from 'react';
import {BackHandler} from 'react-native';

// Component
import Nodata from '../components/noData';

// Styled
import * as Styled from '../styles/screens/Styled_NotificationScreen';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// React Novigations
import {useIsFocused, CommonActions} from '@react-navigation/native';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {action_deleteNavigation} from '../src/actions/actions_notification';
import {VALIDATION_DATE_NOTIFICATION} from '../src/actionsType';

const Notification_Screen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {notificationData, colors} = useSelector((reducer) => {
    return {...reducer.NotificationReducer, ...reducer.ThemeReducer.theme};
  });
  //Focused page.
  const isFocused = useIsFocused();

  // Back handle button.
  const backAction = () => {
    if (isFocused) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'notifications'}],
        }),
      );
    }
    navigation.goBack();
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  // Update a date if original date < date now and dispatch to store.
  useEffect(() => {
    if (notificationData.length) {
      const validationDate = notificationData.map((elem) => {
        if (elem.fireDate < new Date(Date.now())) {
          const date = new Date(elem.fireDate).getTime() + 60 * 60 * 24 * 1000;
          elem.fireDate = date;
        }
        return elem;
      });

      dispatch({
        type: VALIDATION_DATE_NOTIFICATION,
        payload: validationDate,
      });
    }

    return () => backHandler.remove();
  }, []);

  useEffect(() => {}, []);

  // State long press.
  const [longPress, setLongPress] = useState(false);

  // Remove data notification.
  const _removeNotification = (id) => {
    PushNotification.cancelLocalNotifications({id});
    const res = notificationData.filter((x) => x.id !== id);
    dispatch(action_deleteNavigation(res));
  };

  // Replace date to string from notificationDate.
  const _replace_dateInCard = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  };

  // Replace and validate repeat to string from notificationDate.
  const _replace_repeatIncard = (repeatType) => {
    return repeatType === null ? 'Once' : 'Dialy';
  };

  // Turn off icon trash.
  const _cancel_removeNotification = () => setLongPress(false);

  // If notificationData is not yet a data to do set turn off icon trash.
  useEffect(() => {
    if (!notificationData.length) _cancel_removeNotification();
  }, [notificationData]);

  return (
    <Styled.Container onPress={_cancel_removeNotification}>
      <Styled.ScrollView>
        {!!!notificationData.length && <Styled.NoHaveDataNotification />}

        {notificationData.map((elem) => (
          <Styled.CardContainerLongPress
            onPress={_cancel_removeNotification}
            onLongPress={() => setLongPress((prev) => !prev)}>
            <Styled.Card>
              <Styled.InCard>
                <Styled.CardDetail>
                  <Styled.DateText>
                    {_replace_dateInCard(elem.fireDate)}
                  </Styled.DateText>
                  <Styled.TimeText>{elem.time}</Styled.TimeText>
                  <Styled.DescriptionText>
                    {elem.message}
                  </Styled.DescriptionText>
                </Styled.CardDetail>
                <Styled.CardRepeat>
                  {!longPress ? (
                    <Styled.RepeatNormalText>
                      {_replace_repeatIncard(elem.repeatType)}
                    </Styled.RepeatNormalText>
                  ) : (
                    <Styled.RepeatLongText
                      onPress={() => _removeNotification(elem.id)}>
                      <Styled.Trash />
                    </Styled.RepeatLongText>
                  )}
                </Styled.CardRepeat>
              </Styled.InCard>
            </Styled.Card>
          </Styled.CardContainerLongPress>
        ))}
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default Notification_Screen;
