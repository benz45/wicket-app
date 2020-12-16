import database from '@react-native-firebase/database';
import {Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as actions from './index';
import Toast from '../toast-paper';
import PushNotification from 'react-native-push-notification';
import {
  FETCHING_REALTIMEDB_DOOR_FAILRUE,
  FETCHING_REALTIMEDB_DOOR_SUCCESS,
  LOAD_CURRENT_USER_FIREBASE,
} from '../actionsType';

const db = database();

/**********************************************************************/
// First load.

// Action load current user from firebase.
export const action_loadCurrentUser = () => {
  try {
    return (dispatch) => {
      const user = auth().currentUser;
      if (user) {
        dispatch({type: LOAD_CURRENT_USER_FIREBASE, payload: user});
      }
    };
  } catch (err) {
    console.log(err);
  }
};

// Fetching realtime database door from firebase.
export const action_realtimedb_door_firebase = () => {
  return async (dispatch) => {
    await database()
      .ref('door/datas')
      .on('value', (data) => {
        let res = data.val();
        if (!!res) {
          let result = Object.values(res);
          let numChildren = !!data.numChildren();
          dispatch({
            type: FETCHING_REALTIMEDB_DOOR_SUCCESS,
            payload: {value: result, lengthData: numChildren},
          });
        } else {
          dispatch({type: FETCHING_REALTIMEDB_DOOR_FAILRUE});
        }
      });
  };
};

/**********************************************************************/
// Create & upload.
export const action_addDoor = async (
  key,
  name,
  desc,
  status,
  imageLink,
  displayName,
  dateString,
) => {
  try {
    await db.ref(`connections/datas/${key}`).update({
      appConnection: true,
    });

    await db.ref(`door/status/${key}`).set({key, degree: 1});
    await db.ref(`door/images/${key}`).set({key, image: imageLink});
    await db.ref(`door/names/${key}`).set({key, name});
    await db.ref(`door/datas/${key}`).set({
      key,
      name,
      description: desc,
      status: status,
      image: imageLink,
      latestStatusBy: displayName,
      latestStatus: dateString,
      createdDate: dateString,
      arduinoConnection: 'WAITING_CONNECTION',
      createdBy: displayName,
      degree: 1,
    });
    await db.ref(`door/historys/${key}`).push({
      key,
      status: status,
      latestStatusBy: displayName,
      latestStatus: dateString,
    });
    await db.ref(`door/creates/${key}`).set({
      key,
      createdDate: dateString,
      createdBy: displayName,
    });

    return;
  } catch (error) {
    console.error(' action_addDoor', error);
  }
};

export const action_uploadImageDoor = async (uri, key) => {
  try {
    if (Platform.OS === 'android') {
      const reference = storage().ref().child(`door/${key}`);
      await reference.putFile(uri, {
        cacheControl: 'no-store', // disable caching
      });
      const imageLink = await reference.getDownloadURL();
      return imageLink;
    } else if (Platform.OS === 'ios') {
      const reference = storage().ref(`door/${key}`);
      const path = `${uri}`;
      await reference.putFile(path, {
        cacheControl: 'no-store', // disable caching
      });
      const imageLink = await reference.getDownloadURL();
      return imageLink;
    }
  } catch (error) {
    console.error(error.message);
  }
};

/**********************************************************************/
// Update.

// Press update value door status.
export const action_updateDoorStatus = async (key, status, displayName) => {
  // New date
  const newDate = new Date(Date.now());
  const dateString = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}`;
  try {
    await db.ref(`door/datas/${key}`).update({
      latestStatusBy: displayName,
      latestStatus: dateString,
      status: status,
    });
    await db.ref(`door/historys/${key}`).push({
      key,
      status: status,
      latestStatusBy: displayName,
      latestStatus: dateString,
    });
  } catch (error) {
    console.error('action_updateDoorStatus', error.message);
  }
};

// View value befor update door status. call by authenticated file.
export const result_updateDoorStatus = async (settingStatusValue) => {
  try {
    await db.ref('door/status').on('child_changed', (response) => {
      const {key, degree} = response.val();
      db.ref(`door/datas/${key}`).once('value', (snapshot) => {
        const {name, latestStatusBy} = snapshot.val();
        let res = `${name} being ${
          degree < 10 ? 'open' : 'close'
        } by ${latestStatusBy}`;
        if (settingStatusValue === true) {
          PushNotification.localNotification({
            message: res,
          });
        }
      });
    });
  } catch (error) {
    console.log('result_updateDoorStatus = ', error.message);
  }
};

// Edit name & dexcription
export const editProduct = async (key, name, description) => {
  try {
    db.ref(`door/names/${key}`)
      .update({
        name,
      })
      .then(() => {
        db.ref(`door/datas/${key}`).update({
          name: name,
          description: description,
        });
      })
      .then(() => {
        Toast('Edit product succsessful.');
      })
      .catch(() => {
        Toast('Edit product failed.');
      });
  } catch (error) {
    console.log('editProduct', error);
  }
};

export const SetAllStatus = (value) => {
  try {
    db.ref(`connections/datas`).once('value', (snapshot) => {
      Object.values(snapshot.val()).map((elem) => {
        const {appConnection, arduinoConnection, key} = elem;
        if (appConnection && arduinoConnection) {
          db.ref(`door/datas/${key}`)
            .update({
              status: value,
            })
            .then(() => {
              db.ref(`door/status/${key}`).update({
                status: value,
              });
            });
        }
      });
    });
  } catch (error) {
    console.log('SetAllStatus', error.message);
  }
};

export const setStatusAll = async (arrId, boolean) => {
  try {
    for (let key of arrId) {
      await database().ref(`door/status/${key}`).update({
        status: boolean,
      });
    }
  } catch (error) {
    console.log('setStatusAll', error);
  }
};

/**********************************************************************/
// Remove

export const action_removeDoor = async (key) => {
  try {
    const doorPath = db.ref(`door`);
    await db.ref(`connections/datas/${key}`).update({
      appConnection: false,
    });

    await doorPath.child(`/status/${key}`).remove();
    await doorPath.child(`/connections/${key}`).remove();
    await doorPath.child(`/images/${key}`).remove();
    await doorPath.child(`/names/${key}`).remove();
    await doorPath.child(`/datas/${key}`).remove();
    await doorPath.child(`/creates/${key}`).remove();
    await doorPath.child(`/status/${key}`).remove();
    await doorPath.child(`/historys/${key}`).remove();

    await storage().ref().child(`door/${key}`).delete();
  } catch (err) {
    console.log('action_removeDoor', err.message);
  }
};

// Check child remove.
export const action_childRemove_firebase = async () => {
  await database()
    .ref('door/datas')
    .on('child_removed', (snapshot) => {
      let result = snapshot.val();
      Toast(`Remove ${result.name} success.`);
    });
};

/**********************************************************************/
// Login & Logout

export const loginUser = async (username, password) => {
  const email = `${username}@wicket.com`;
  let result = await auth()
    .signInWithEmailAndPassword(email, password)
    .catch(() => console.log('Login failrue'));
  return result;
};

export const logoutUser = async () => {
  try {
    await auth().signOut();
  } catch (err) {
    console.log(err);
  }
};

/**********************************************************************/
// Message

// Get message
// export const action_getMessages = () => {
//   try {
//     return (dispatch) => {
//       database()
//         .ref('messages')
//         .orderByValue()
//         .on('value', (snapshot) => {
//           const value = snapshot.val();
//           if (!!value) {
//             console.log(JSON.stringify(value, 0, 2));
//             dispatch(actions.setMessages(value));
//           }
//         });
//     };
//   } catch (error) {
//     console.log('action_getMessages -> error', error);
//   }
// };

// Set message
export const action_setMessages = async (message) => {
  try {
    const pushData = await database().ref('messages').push();
    pushData.key;
    pushData.set(message);
  } catch (error) {
    console.log('action_setMessage -> error', error);
  }
};

// New messages only.
export const action_newMessageOnly = async (
  mount, // mount = useRef fetching start component.
  mountSettingMessage, // mountSettingMessage = value setting from messages settings notification.
  email, // email = use email represent id to check message user id
) => {
  await database()
    .ref('messages')
    .limitToLast(1)
    .on('child_added', (snapshot) => {
      const message = snapshot.val();
      if (mount) {
        return;
      }
      if (mountSettingMessage) {
        if (email !== message.user._id) {
          PushNotification.localNotification({
            title: message.user.username,
            message: message.text,
            soundName: 'definite.mp3',
          });
          return;
        }
      }
    });
};

export const action_checkConnection = (id) => {
  return new Promise((res, rej) => {
    database()
      .ref(`connections`)
      .once('value', (snapshot) => {
        if (!!!snapshot.val()) {
          rej({message: 'error'});
        }
        res(snapshot.val());
      });
  });
};

export const action_setConnection = async (key, value) => {
  try {
    const connections = db.ref(`connections/datas/${key}/`);
    connections
      .update({
        arduinoConnection: value,
      })
      .then(() => {
        connections.child('appConnection').once('value', (snapshot) => {
          if (snapshot.val())
            db.ref(`door/datas/${key}`).update({arduinoConnection: value});
        });
      });
  } catch (err) {
    console.log('setOfline', err.message);
  }
};

export const action_connectionChanged = () => {
  return async (dispatch) => {
    await database()
      .ref(`connections/datas`)
      .on('value', (snapshot) => {
        const datas = snapshot.val();
        if (!!!datas) {
          return;
        }
        dispatch(actions.setConnectionChacnge(Object.values(datas)));
      });
  };
};
