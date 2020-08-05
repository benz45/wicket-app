// SRC
import * as Type from '../actionsType';
import dataTheme from '../actions/actions_theme';

const initialState = {
  isFetching: true,
  isCacheTheme: false,
  theme: dataTheme.dark,
};

export default (state = initialState, {type, loadTheme, isCache}) => {
  switch (type) {
    case Type.SETTHEME_TO_STORE:
      return {...state, theme: loadTheme, isCacheTheme: isCache};

    case Type.CACHETHEME_FETCHING:
      return {...state}

    case Type.GETTHEME_FROM_CACHE_SUCCESS:
      return Object.assign({
        ...state,
        theme: loadTheme,
        isCacheTheme: isCache,
        isFetching: false,
      });
    default:
      return state;
  }
};

