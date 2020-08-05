import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as actions from './index';
import Toast from '../toast-paper';
import PushNotification from 'react-native-push-notification';
/**********************************************************************/
// Auth

export const action_registerUser = async (username, password) => {
  const email = `${username}@wicket.com`;
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    return {error: false, message: 'The email address can be used'};
  } catch (error) {
    return {
      error: true,
      message: 'The email address is already in use by another account.',
    };
  }
};

//User Update.
export const action_userUpdate = async (name, ImageProfile) => {
  try {
    if (!!!ImageProfile) {
      const reference = await storage().ref(`user/profile.png`);
      const imageLink = await reference.getDownloadURL();
      await auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: name,
            photoURL: imageLink,
          });
        }
      });
    } else {
      const reference = await storage().ref(`user/${name}`);
      await reference.putFile(ImageProfile);
      const imageLink = await reference.getDownloadURL();
      await auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: name,
            photoURL: imageLink,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**********************************************************************/
// First load.

// Action load current user from firebase.
export const action_loadCurrentUser_firebase = () => {
  const user = auth().currentUser;
  return (dispatch) => {
    dispatch(actions.firstLoadCurrentUser());
    typeof user !== 'undefined' && !!user
      ? dispatch(actions.firstLoadCurrentUserSuccess(user))
      : dispatch(actions.firstLoadCurrentUserFailrue(null));
  };
};

// Fetching realtime database door from firebase.
export const action_realtimedb_door_firebase = () => {
  return async (dispatch) => {
    await database()
      .ref('door/datas')
      .on('value', (data) => {
        let result = data.val();
        if (!!result) {
          let res = Object.values(result);
          dispatch(actions.FETCHING_REALTIMEDB_DOOR_SUCCESS(res));
        } else {
          dispatch(actions.FETCHING_REALTIMEDB_DOOR_FAILRUE());
        }
      });
  };
};

export const action_realtimedb_door_firebase_lengthData = () => {
  return async (dispatch) => {
    await database()
      .ref('door/datas')
      .on('value', (data) => {
        let numChildren = !!data.numChildren();
        dispatch(actions.FETCHING_REALTIMEDB_DOOR_LENGTHDATA(numChildren));
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
    const db = await database();
    db.ref(`door/status/${key}`).set({key, status});
    db.ref(`door/images/${key}`).set({key, image: imageLink});
    db.ref(`door/names/${key}`).set({key, name});
    db.ref(`door/datas/${key}`).set({
      no: key,
      name,
      description: desc,
      status: status,
      image: imageLink,
      latestStatus: dateString,
      createdDate: dateString,
      arduinoConnection: 3,
      createdBy: displayName,
    });
    db.ref(`door/creates/${key}`).set({
      key,
      createdDate: dateString,
      createdBy: displayName,
    });

    db.ref(`connections/datas/${key}`).update({
      appConnection: true,
    });
    return;
  } catch (error) {
    console.error(' action_addDoor', error);
  }
};

export const action_uploadImageDoor = async (uri, key) => {
  try {
    const reference = storage().ref().child(`door/${key}`);
    await reference.putFile(uri);
    const imageLink = await reference.getDownloadURL();
    return imageLink;
  } catch (error) {
    console.error(error.message);
  }
};

/**********************************************************************/
// Update.

// Press update value door status.
export const action_updateDoorStatus = (no, status) => {
  // New date
  const newDate = new Date(Date.now());
  const dateString = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()} | ${newDate.getHours()}:${newDate.getMinutes()}`;
  try {
    return async (dispatch) => {
      dispatch(actions.FETCHING_REALTIMEDB_DOOR_UPDATE());
      const db = await database();
      db.ref(`door/status/${no}`)
        .update({
          latestStatus: dateString,
          status: status,
        })
        .then(() => {
          db.ref(`door/datas/${no}`).update({
            latestStatus: dateString,
            status: status,
          });
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
  } catch (error) {
    console.error('action_updateDoorStatus', error.message);
  }
};

// Not used.!!
// Fetching (update) realtime database door from firebase.
export const action_view_updateDoorStatus = () => {
  try {
    return async (dispatch) => {
      await database()
        .ref('door/datas')
        .on('value', (data) => {
          let result = data.val();
          let res = Object.values(result);
          typeof result !== 'undefined'
            ? dispatch(actions.FETCHING_REALTIMEDB_DOOR_UPDATE_SUCCESS(res))
            : dispatch(actions.FETCHING_REALTIMEDB_DOOR_UPDATE_FAILRUE(null));
        });
    };
  } catch (error) {
    console.error('action_view_updateDoorStatus', error.message);
  }
};

// View value befor update door status.
export const result_updateDoorStatus = async () => {
  const db = await database();
  try {
    await db.ref('door/status').on('child_changed', (response) => {
      const {key, status} = response.val();
      db.ref(`door/datas/${key}`).once('value', (snapshot) => {
        const {name} = snapshot.val();
        let res = `${name} being ${status ? 'open' : 'close'}`;
        Toast(res);
      });
    });
  } catch (error) {
    console.log('result_updateDoorStatus = ', error.message);
  }
};

// Edit name & dexcription
export const editProduct = async (no, name, description) => {
  try {
    const db = await database();
    db.ref(`door/names/${no}`)
      .update({
        name,
      })
      .then(() => {
        db.ref(`door/datas/${no}`).update({
          description,
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

export const setStatusAll = async (arrId, boolean) => {
  try {
    for (let no of arrId) {
      await database().ref(`door/status/${no}`).update({
        status: boolean,
      });
      await database().ref(`door/datas/${no}`).update({
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
    const db = await database();
    const doorPath = db.ref(`door`);

    await doorPath.child(`/status/${key}`).remove();
    await doorPath.child(`/connections/${key}`).remove();
    await doorPath.child(`/images/${key}`).remove();
    await doorPath.child(`/names/${key}`).remove();
    await doorPath.child(`/datas/${key}`).remove();
    await doorPath.child(`/creates/${key}`).remove();
    await doorPath.child(`/status/${key}`).remove();

    await storage().ref().child(`door/${key}`).delete();
    await db.ref(`connections/datas/${key}`).update({
      appConnection: false,
    });
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

export const logoutUser = () => {
  auth().signOut();
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

// User online list
export const action_userOnline = () => {
  return new Promise((res, rej) => {
    database()
      .ref('online/user')
      .on('value', (snapshot) => {
        if (!!!snapshot.val()) {
          rej({message: 'error'});
        }
        res(snapshot.val());
      });
  });
};

export const action_checkConnection = (id) => {
  return new Promise((res, rej) => {
    database()
      .ref(`connections`)
      .on('value', (snapshot) => {
        if (!!!snapshot.val()) {
          rej({message: 'error'});
        }
        res(snapshot.val());
      });
  });
};

export const action_setConnection = async (key, value) => {
  try {
    const db = await database();
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
