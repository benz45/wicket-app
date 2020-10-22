import {useReducer, useEffect} from 'react';
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
const SET_PASSWORD = 'SET_PASSWORD';
const ERROR_ALLINPUT = 'ERROR_ALLINPUT';
const ERROR_USERNAME = 'ERROR_USERNAME';
const ERROR_PASSWORD = 'ERROR_PASSWORD';
const ERROR_RESET = 'ERROR_RESET';
const LOGIN = 'LOGIN';

const initialState = {
  busy: false,
  username: '',
  password: '',
  error: {},
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_USERNAME:
      return Object.assign({}, state, {username: payload});
    case SET_PASSWORD:
      return Object.assign({}, state, {password: payload});
    case LOGIN:
      return Object.assign({}, state, {busy: payload});
    case ERROR_USERNAME:
      return Object.assign({}, state, {error: {username: true}});
    case ERROR_PASSWORD:
      return Object.assign({}, state, {error: {password: true}});
    case ERROR_ALLINPUT:
      return Object.assign({}, state, {
        error: {username: true, password: true},
      });
    case ERROR_RESET:
      return Object.assign({}, state, {
        error: {username: false, password: false},
      });

    default:
      throw new Error();
  }
};

export default function useCustomHookLoginScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {navigate} = useNavigation();
  const dispatchRedux = useDispatch();

  // user on press login button.
  const _Submit = async () => {
    Keyboard.dismiss();

    // Validate data input.
    if (state.username.trim() === '' && state.password.trim() === '') {
      dispatch({type: ERROR_ALLINPUT});
      return Toast('Username and Password not specified');
    } else if (state.password.trim() === '') {
      dispatch({type: ERROR_PASSWORD});
      return Toast('Password not specified');
    } else if (state.username.trim() === '') {
      dispatch({type: ERROR_USERNAME});
      return Toast('Username not specified');
    }

    // After validated success to do request data to firebase authentication.
    let result = await loginUser(state.username, state.password);
    if (!result) {
      Toast('There is no user record corresponding to this identifier.');
    } else {
      dispatchRedux(action_loadCurrentUser_firebase());
      navigate('Authenticated');
    }
  };

  // set state username.
  const _setUsername = (value) => {
    dispatch({type: SET_USERNAME, payload: value});
  };

  // set state password.
  const _setPassword = (value) => {
    dispatch({type: SET_PASSWORD, payload: value});
  };

  // Navigate to Register screen.
  const _navigateToRegister = () => () => navigate('RegisterSecurity');

  // Reset error if state username and password changed.
  useEffect(() => {
    if (state.error.username || state.error.password) {
      dispatch({type: ERROR_RESET});
    }
  }, [state.username, state.password]);

  return {
    state,
    dispatch,
    _setUsername,
    _setPassword,
    _Submit,
    _navigateToRegister,
  };
}
