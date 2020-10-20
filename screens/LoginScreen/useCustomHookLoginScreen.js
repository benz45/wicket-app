import {useReducer} from 'react';
// Actions
import {useDispatch} from 'react-redux';
// Navigation
import {useNavigation} from '@react-navigation/native';
import {
  loginUser,
  action_loadCurrentUser_firebase,
} from '../../src/actions/actions_firebase';
import Toast from '../../src/toast-paper';
import {Keyboard} from 'react-native';

// Action type
const SET_USERNAME = 'SET_USERNAME';
const SET_PASSWORD = 'SET_USERNAME';
const LOGIN = 'LOGIN';

const InitialState = {
  busy: false,
  username: '',
  password: '',
};

const Reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_USERNAME:
      return {...state, username: payload};
    case SET_PASSWORD:
      return {...state, password: payload};
    case LOGIN:
      return {...state, busy: payload};
    default:
      throw new Error();
  }
};

export default function useCustomHookLoginScreen() {
  const {navigate} = useNavigation();
  const dispatchRedux = useDispatch();
  const [state, dispatch] = useReducer(Reducer, InitialState);

  const _Submit = async () => {
    Keyboard.dismiss();

    if (state.username.trim() === '') {
      return Toast('Username not specified');
    } else if (state.password.trim() === '') {
      return Toast('Password not specified');
    }

    let result = await loginUser(state.username, state.password);
    if (result) {
      dispatchRedux(action_loadCurrentUser_firebase());

      navigate('Authenticated');
    } else {
      Toast('There is no user record corresponding to this identifier.');
    }
  };

  const _setUsername = (value) => {
    dispatch({type: SET_USERNAME, payload: value});
  };
  const _setPassword = (value) => {
    dispatch({type: SET_PASSWORD, payload: value});
  };

  const _navigateToRegister = () => navigate('RegisterSecurity');

  return {
    state,
    dispatch,
    _setUsername,
    _setPassword,
    _Submit,
    _navigateToRegister,
  };
}
