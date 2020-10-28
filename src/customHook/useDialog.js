import React, {useReducer} from 'react';
import * as Styled from '../../styles/custom_hook/Styled_useDialog';

// Navigations
import {useNavigation, TabActions} from '@react-navigation/native';

const initialState = {
  isDialog: false,
  dialog: {
    type: '',
    icon: '',
    title: '',
    description: '',
  },
};

const SET_DAILOG = 'SET_DAILOG';
const HIDE_DIALOG = 'HIDE_DIALOG';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case HIDE_DIALOG:
      return Object.assign({}, initialState);
    case SET_DAILOG:
      return Object.assign({}, state, {
        isDialog: true,
        dialog: {
          type: payload.type,
          icon: payload.icon,
          title: payload.title,
          description: payload.description,
        },
      });
    default:
      throw new Error();
  }
};

export default function useDialog() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();

  /**
   * Used is property function.
   * @property `success` `warning` `error` `hide`
   *
   * @example _setDialog().success()
   */
  const _setDialog = () => {
    const props = {
      success: {
        type: 'isDialogSuccess',
        icon: 'checkbox-marked-circle-outline',
      },
      warning: {
        type: 'isDialogWarning',
        icon: 'progress-clock',
      },
      error: {
        type: 'isDialogError',
        icon: 'close',
      },
    };

    /* Dispatch property dialog. */
    const cbProps = ({title = '', description = ''}, {type, icon}) => {
      dispatch({type: SET_DAILOG, payload: {type, title, description, icon}});
    };

    return {
      /**
       * Used is property function.
       * @property `title` `description`
       *
       * @example _setDialog().success({title: '', description: ''})
       */
      success: (val) => cbProps(val, props.success),

      /**
       * Used is property function.
       * @property `title` `description`
       *
       * @example _setDialog().warning({title: '', description: ''})
       */
      warning: (val) => cbProps(val, props.warning),

      /**
       * Used is property function.
       * @property `title` `description`
       *
       * @example _setDialog().error({title: '', description: ''})
       */
      error: (val) => cbProps(val, props.error),

      /**
       * Used is property function.
       *
       * @example _setDialog().hide()
       */
      hide: () => dispatch({type: HIDE_DIALOG}),
    };
  };

  /**
   * Used is property. (JSX)
   * @property `navigation`
   *
   * @example <_dialogComponent navigation={[ Router => <String>, Text button => <String>]} />
   */
  const _dialogComponent = (props) => {
    const _jumpTo = () => {
      _setDialog().hide();
      const jumpToAction = TabActions.jumpTo(props.navigation[0]);
      navigation.dispatch(jumpToAction);
    };

    return (
      <Styled.Portals>
        <Styled.Dialog visible={state.isDialog}>
          <Styled.DialogContent>
            <Styled.Icon icon={state.dialog.icon} />
            <Styled.TextHead>{state.dialog.title}</Styled.TextHead>
            <Styled.TextDescription>
              {state.dialog.description}
            </Styled.TextDescription>
          </Styled.DialogContent>
          <Styled.DialogActions>
            {!!props.navigation && (
              <Styled.Btn onPress={() => _jumpTo()}>
                {props.navigation[1]}
              </Styled.Btn>
            )}
            <Styled.Btn onPress={() => _setDialog().hide()}>Done</Styled.Btn>
          </Styled.DialogActions>
        </Styled.Dialog>
      </Styled.Portals>
    );
  };

  return {
    _setDialog,
    _dialogComponent,
  };
}
