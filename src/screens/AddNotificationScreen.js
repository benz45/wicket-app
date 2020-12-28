import React from 'react';

// Styled
import * as Styled from 'root/src/Styles/Screens/Styled_AddNotificationScreen';

// Custom hook
import useAddNotificationScreen from 'root/src/Hook/useAddNotificationScreen';
import useDateTimePicker from 'root/src/Hook/useDateTimePicker';
import useDialog from 'root/src/Hook/useDialog';

const AddNotificationScreen = () => {
  const {
    state,
    _turnOnRadioRepeat,
    _addNoti,
    _setName,
    _dialogRadioRepeat,
  } = useAddNotificationScreen();

  const [{time}, {_timeComponent, _shownDatePicket}] = useDateTimePicker();

  const {_dialogComponent, _setDialog} = useDialog();

  const _submitAddNoti = () => {
    _addNoti({fullTime: time.fullTime, hour: time.hour, minute: time.minute})
      .then(() => {
        _setDialog().success({
          title: 'Insert success',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',
        });
      })
      .catch(() => {
        _setDialog().warning();
      });
  };

  return (
    <Styled.MainContainer>
      {/* Input for Name Notification. */}
      <Styled.TextInput
        value={state.name}
        label="Name Notification"
        onChange={(e) => _setName(e.nativeEvent.text)}
      />

      {/* Time selector */}
      <Styled.ContainerTime onPress={() => _shownDatePicket()}>
        <Styled.TimeText>{`${time.hour} : ${time.minute}`}</Styled.TimeText>
      </Styled.ContainerTime>

      {/* Selector a repeat. */}
      <Styled.ContainerRepeat>
        <Styled.RepeatText>Repeat</Styled.RepeatText>
        <Styled.ContainerDialogRepeat onPress={() => _turnOnRadioRepeat()}>
          <Styled.RepeatTypeText>
            {(state.repeat == 'day' && 'Daily') ||
              (state.repeat == 'once' && 'Once') ||
              (state.repeat == 'time' && 'Time 1s (Test)')}
          </Styled.RepeatTypeText>
          <Styled.ChevonRightIcon />
        </Styled.ContainerDialogRepeat>
      </Styled.ContainerRepeat>

      {/* Validation button add notification. */}
      <Styled.btnAddNoti
        disabled={state.name ? false : true}
        onPress={() => _submitAddNoti()}>
        Add Notification
      </Styled.btnAddNoti>

      {/* Open native dateTime picker. */}
      <_timeComponent />

      {/* Radio repeat component */}
      <_dialogRadioRepeat />

      {/* Dialog component */}
      <_dialogComponent navigation={['notifications', 'Notifications']} />
    </Styled.MainContainer>
  );
};

export default AddNotificationScreen;
