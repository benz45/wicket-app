import React, {useState, useEffect} from 'react';

// Component
import Nodata from '../components/noData';

// Styled
import * as Styled from '../styles/screens/Styled_NotificationScreen';

// Cloud messaging
import PushNotification from 'react-native-push-notification/';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  action_deleteNavigation,
  action_setNavigation,
} from '../src/actions/actions_notification';

const Notification_Screen = () => {
  const dispatch = useDispatch();
  const {
    notificationData,
    colors: {accent, primary},
  } = useSelector((reducer) => {
    return {...reducer.NotificationReducer, ...reducer.ThemeReducer.theme};
  });

  useEffect(() => {
    if (notificationData.length) {
      const validationDate = notificationData.map((elem) => {
        if (elem.fireDate < new Date(Date.now())) {
          elem.fireDate = new Date(
            new Date(elem.fireDate).getTime() + 60 * 60 * 24 * 1000,
          );
        }
        return elem;
      });
      console.log(validationDate);
      // dispatch(action_setNavigation(validationDate));s
    }
  }, []);

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

  return (
    <Styled.Container onPress={() => setLongPress(false)}>
      <Styled.ScrollView>
        {!!!notificationData.length && (
          <Nodata
            icon="bell-plus-outline"
            header="ADD NOW "
            btnIcon="subdirectory-arrow-right"
            btnIconSize={60}
            btnIconColor={accent}
            headerSize={47}
            description="No data yet. Please increase the data."
          />
        )}

        {notificationData.map((elem) => (
          <Styled.CardContainerLongPress
            onLongPress={() => setLongPress((prev) => !prev)}>
            <Styled.Card>
              <Styled.InCard>
                <Styled.CardDetail>
                  <Styled.DateText color={primary}>
                    {_replace_dateInCard(elem.fireDate)}
                  </Styled.DateText>
                  <Styled.TimeText>{elem.time}</Styled.TimeText>
                  <Styled.DescriptionText color={accent}>
                    {elem.message}
                  </Styled.DescriptionText>
                </Styled.CardDetail>
                <Styled.CardRepeat>
                  {!longPress ? (
                    <Styled.RepeatNormalText color={accent}>
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
