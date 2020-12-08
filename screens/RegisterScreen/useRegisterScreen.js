import {useReducer} from 'react';

// Redux
import {useDispatch} from 'react-redux';
import {LOAD_CURRENT_USER_FIREBASE} from '../../src/actionsType';

// React Navigation
import {useNavigation} from '@react-navigation/native';

// Component
import Toast from '../../src/toast-paper';

// Firebase
import {action_registerUser} from '../../src/actions/actions_auth';

const SET_USERNAME = 'SET_USERNAME';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_CPASSWORD = 'SET_CPASSWORD';

const ERROR_USERNAME = 'ERROR_USERNAME';
const ERROR_PASSWORD = 'ERROR_PASSWORD';
const ERROR_CPASSWORD = 'ERROR_CPASSWORD';

const REGISTER = 'REGISTER';

const initialState = {
  busy: false,
  username: '',
  password: '',
  cpassword: '',
  error: {},
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_USERNAME:
      return {...state, username: payload, error: {username: false}};
    case SET_PASSWORD:
      return {...state, password: payload, error: {password: false}};
    case SET_CPASSWORD:
      return {...state, cpassword: payload, error: {cpassword: false}};
    case ERROR_USERNAME:
      return {...state, busy: false, error: {username: true}};
    case ERROR_PASSWORD:
      return {...state, busy: false, error: {password: true}};
    case ERROR_CPASSWORD:
      return {...state, busy: false, error: {cpassword: true}};
    case REGISTER:
      return {...state, busy: payload};
    default:
      throw new Error();
  }
};

export default function useRegisterScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {navigate} = useNavigation();
  const dispatchRedux = useDispatch();

  const _setUsername = (value) => {
    dispatch({type: SET_USERNAME, payload: value});
  };

  const _setPassword = (value) => {
    dispatch({type: SET_PASSWORD, payload: value});
  };

  const _setCPassword = (value) => {
    dispatch({type: SET_CPASSWORD, payload: value});
  };

  const _navigateToLogin = () => () => navigate('Login');
  const _navigateToRegisterProfile = () => {
    const {username} = state;
    navigate('RegisterProfile', {username});
  };

  const _register = async () => {
    dispatch({type: REGISTER, payload: true});

    if (state.username.trim() === '') {
      dispatch({type: ERROR_USERNAME});
      return Toast('Username not specified');
    } else if (state.password.trim() === '') {
      dispatch({type: ERROR_PASSWORD});
      return Toast('Password not specified');
    } else if (state.password.length < 6) {
      dispatch({type: ERROR_PASSWORD});
      return Toast('Password must over 6-24 character');
    } else if (state.cpassword.trim() === '') {
      dispatch({type: ERROR_CPASSWORD});
      return Toast('Confirm password not specified');
    }

    if (state.password !== state.cpassword) {
      dispatch({type: ERROR_CPASSWORD});
      return Toast('Password mismatch');
    }

    // Check existing name.
    const res = await action_registerUser(state.username, state.password);

    if (res.error) {
      await dispatch({type: ERROR_USERNAME, payload: true});
      await Toast(res.message);
    } else {
      await dispatch({type: REGISTER, payload: false});
      await dispatchRedux({
        type: LOAD_CURRENT_USER_FIREBASE,
        payload: res.value,
      });
      await _navigateToRegisterProfile();
    }
  };

  return {
    state,
    dispatch,
    _setUsername,
    _setPassword,
    _setCPassword,
    _navigateToLogin,
    _register,
  };
}
