import React, {useReducer} from 'react';
import {Platform} from 'react-native';

// Styled
import * as Styled from 'root/src/Styles/custom_hook/Styled_useDateTimePicker';

const SET_TIME = 'SET_TIME';
const SET_SHOWN = 'SET_SHOWN';

const currentTime = new Date(Date.now());

const validateTime = (timeValue) => {
  return timeValue.toString().length == 1 ? `0${timeValue}` : `${timeValue}`;
};

const initialState = {
  time: {
    fullTime: new Date(Date.now()),
    hour: `${validateTime(currentTime.getHours().toString())}`,
    minute: `${validateTime(currentTime.getMinutes().toString())}`,
  },
  isShown: false,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_TIME:
      return {
        ...state,
        time: {
          fullTime: payload,
          hour: `${validateTime(new Date(payload).getHours())}`,
          minute: `${validateTime(new Date(payload).getMinutes())}`,
        },
      };
    case SET_SHOWN:
      return {...state, isShown: payload};
    default:
      throw new Error();
  }
};

export default function useDateTimePicker() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Data time change
  const _onChange = (_, timeValue) => {
    const resualtTime = timeValue || new Date(Date.now());
    if (Platform.OS === 'android') {
      _submit();
      dispatch({type: SET_TIME, payload: resualtTime});
    }
    dispatch({type: SET_TIME, payload: resualtTime});
  };

  const _submit = () => {
    dispatch({type: SET_SHOWN, payload: false});
  };

  const _shownDatePicket = () => {
    dispatch({type: SET_SHOWN, payload: true});
  };

  const _timeComponent = () => {
    if (Platform.OS === 'ios') {
      return (
        state.isShown && (
          <React.Fragment>
            <Styled.DateTimePicker
              value={state.time.fullTime}
              testID="dateTimePicker-iOS"
              display="spinner"
              mode="time"
              onChange={_onChange}
            />
            <Styled.btnSubmit
              onPress={() => {
                _submit();
              }}>
              Submit
            </Styled.btnSubmit>
          </React.Fragment>
        )
      );
    } else if (Platform.OS === 'android') {
      return (
        state.isShown && (
          <React.Fragment>
            <Styled.DateTimePicker
              value={state.time.fullTime}
              testID="dateTimePicker-android"
              display="default"
              mode="time"
              is24Hour={true}
              onChange={_onChange}
            />
          </React.Fragment>
        )
      );
    }
  };

  return [state, {_timeComponent, _shownDatePicket}];
}
