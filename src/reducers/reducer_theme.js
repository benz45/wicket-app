// SRC
import * as Type from '../actionsType';
import dataTheme from '../actions/actions_theme';

const initialState = {
  sysDefault: true,
  darkMode: false,
  theme: dataTheme.light,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case Type.SET_THEME:
      return {
        ...state,
        theme: payload === 'dark' ? dataTheme.dark : dataTheme.light,
      };
    case Type.SET_THEME_SYSDEFAULT:
      return {...state, sysDefault: !state.sysDefault};
    case Type.SET_THEME_DARKMODE:
      return {
        ...state,
        sysDefault: false,
        darkMode: payload,
        theme: payload ? dataTheme.dark : dataTheme.light,
      };

    default:
      return state;
  }
};
