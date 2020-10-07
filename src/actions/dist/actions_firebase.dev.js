"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action_connectionChanged = exports.action_setConnection = exports.action_checkConnection = exports.action_userOnline = exports.action_newMessageOnly = exports.action_setMessages = exports.logoutUser = exports.loginUser = exports.action_childRemove_firebase = exports.action_removeDoor = exports.setStatusAll = exports.SetAllStatus = exports.editProduct = exports.result_updateDoorStatus = exports.action_view_updateDoorStatus = exports.action_updateDoorStatus = exports.action_uploadImageDoor = exports.action_addDoor = exports.action_realtimedb_door_firebase_lengthData = exports.action_realtimedb_door_firebase = exports.action_loadCurrentUser_firebase = exports.action_userUpdate = exports.action_registerUser = void 0;

var _database = _interopRequireDefault(require("@react-native-firebase/database"));

var _auth = _interopRequireDefault(require("@react-native-firebase/auth"));

var _storage = _interopRequireDefault(require("@react-native-firebase/storage"));

var actions = _interopRequireWildcard(require("./index"));

var _toastPaper = _interopRequireDefault(require("../toast-paper"));

var _reactNativePushNotification = _interopRequireDefault(require("react-native-push-notification"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = (0, _database["default"])();
/**********************************************************************/
// Auth

var action_registerUser = function action_registerUser(username, password) {
  var email;
  return regeneratorRuntime.async(function action_registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = "".concat(username, "@wicket.com");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _auth["default"])().createUserWithEmailAndPassword(email, password));

        case 4:
          return _context.abrupt("return", {
            error: false,
            message: 'The email address can be used'
          });

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", {
            error: true,
            message: 'The email address is already in use by another account.'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
}; //User Update.


exports.action_registerUser = action_registerUser;

var action_userUpdate = function action_userUpdate(name, ImageProfile) {
  var reference, imageLink, _reference, _imageLink;

  return regeneratorRuntime.async(function action_userUpdate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (!!ImageProfile) {
            _context2.next = 12;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _storage["default"])().ref("user/profile.png"));

        case 4:
          reference = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(reference.getDownloadURL());

        case 7:
          imageLink = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap((0, _auth["default"])().onAuthStateChanged(function (user) {
            if (user) {
              user.updateProfile({
                displayName: name,
                photoURL: imageLink
              });
            }
          }));

        case 10:
          _context2.next = 22;
          break;

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap((0, _storage["default"])().ref("user/".concat(name)));

        case 14:
          _reference = _context2.sent;
          _context2.next = 17;
          return regeneratorRuntime.awrap(_reference.putFile(ImageProfile));

        case 17:
          _context2.next = 19;
          return regeneratorRuntime.awrap(_reference.getDownloadURL());

        case 19:
          _imageLink = _context2.sent;
          _context2.next = 22;
          return regeneratorRuntime.awrap((0, _auth["default"])().onAuthStateChanged(function (user) {
            if (user) {
              user.updateProfile({
                displayName: name,
                photoURL: _imageLink
              });
            }
          }));

        case 22:
          _context2.next = 27;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 24]]);
};
/**********************************************************************/
// First load.
// Action load current user from firebase.


exports.action_userUpdate = action_userUpdate;

var action_loadCurrentUser_firebase = function action_loadCurrentUser_firebase() {
  var user = (0, _auth["default"])().currentUser;
  return function (dispatch) {
    dispatch(actions.firstLoadCurrentUser());
    typeof user !== 'undefined' && !!user ? dispatch(actions.firstLoadCurrentUserSuccess(user)) : dispatch(actions.firstLoadCurrentUserFailrue(null));
  };
}; // Fetching realtime database door from firebase.


exports.action_loadCurrentUser_firebase = action_loadCurrentUser_firebase;

var action_realtimedb_door_firebase = function action_realtimedb_door_firebase() {
  return function _callee(dispatch) {
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap((0, _database["default"])().ref('door/datas').on('value', function (data) {
              var result = data.val();

              if (!!result) {
                var res = Object.values(result);
                dispatch(actions.FETCHING_REALTIMEDB_DOOR_SUCCESS(res));
              } else {
                dispatch(actions.FETCHING_REALTIMEDB_DOOR_FAILRUE());
              }
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.action_realtimedb_door_firebase = action_realtimedb_door_firebase;

var action_realtimedb_door_firebase_lengthData = function action_realtimedb_door_firebase_lengthData() {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap((0, _database["default"])().ref('door/datas').on('value', function (data) {
              var numChildren = !!data.numChildren();
              dispatch(actions.FETCHING_REALTIMEDB_DOOR_LENGTHDATA(numChildren));
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};
/**********************************************************************/
// Create & upload.


exports.action_realtimedb_door_firebase_lengthData = action_realtimedb_door_firebase_lengthData;

var action_addDoor = function action_addDoor(key, name, desc, status, imageLink, displayName, dateString) {
  return regeneratorRuntime.async(function action_addDoor$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          db.ref("door/status/".concat(key)).set({
            key: key,
            status: status
          });
          db.ref("door/images/".concat(key)).set({
            key: key,
            image: imageLink
          });
          db.ref("door/names/".concat(key)).set({
            key: key,
            name: name
          });
          db.ref("door/datas/".concat(key)).set({
            no: key,
            name: name,
            description: desc,
            status: status,
            image: imageLink,
            latestStatusBy: displayName,
            latestStatus: dateString,
            createdDate: dateString,
            arduinoConnection: 3,
            createdBy: displayName
          });
          db.ref("door/creates/".concat(key)).set({
            key: key,
            createdDate: dateString,
            createdBy: displayName
          });
          db.ref("connections/datas/".concat(key)).update({
            appConnection: true
          });
          return _context5.abrupt("return");

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(' action_addDoor', _context5.t0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.action_addDoor = action_addDoor;

var action_uploadImageDoor = function action_uploadImageDoor(uri, key) {
  var reference, imageLink;
  return regeneratorRuntime.async(function action_uploadImageDoor$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          reference = (0, _storage["default"])().ref().child("door/".concat(key));
          _context6.next = 4;
          return regeneratorRuntime.awrap(reference.putFile(uri));

        case 4:
          _context6.next = 6;
          return regeneratorRuntime.awrap(reference.getDownloadURL());

        case 6:
          imageLink = _context6.sent;
          return _context6.abrupt("return", imageLink);

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/**********************************************************************/
// Update.
// Press update value door status.


exports.action_uploadImageDoor = action_uploadImageDoor;

var action_updateDoorStatus = function action_updateDoorStatus(no, status, displayName) {
  // New date
  var newDate = new Date(Date.now());
  var dateString = "".concat(newDate.getDate(), "-").concat(newDate.getMonth(), "-").concat(newDate.getFullYear(), " | ").concat(newDate.getHours(), ":").concat(newDate.getMinutes());

  try {
    return function _callee3(dispatch) {
      return regeneratorRuntime.async(function _callee3$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              dispatch(actions.FETCHING_REALTIMEDB_DOOR_UPDATE());
              db.ref("door/status/".concat(no)).update({
                latestStatusBy: displayName,
                latestStatus: dateString,
                status: status
              }).then(function () {
                db.ref("door/datas/".concat(no)).update({
                  latestStatusBy: displayName,
                  latestStatus: dateString,
                  status: status
                });
              })["catch"](function (error) {
                console.error(error.message);
              });

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      });
    };
  } catch (error) {
    console.error('action_updateDoorStatus', error.message);
  }
}; // Not used.!!
// Fetching (update) realtime database door from firebase.


exports.action_updateDoorStatus = action_updateDoorStatus;

var action_view_updateDoorStatus = function action_view_updateDoorStatus() {
  try {
    return function _callee4(dispatch) {
      return regeneratorRuntime.async(function _callee4$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap((0, _database["default"])().ref('door/datas').on('value', function (data) {
                var result = data.val();
                var res = Object.values(result);
                typeof result !== 'undefined' ? dispatch(actions.FETCHING_REALTIMEDB_DOOR_UPDATE_SUCCESS(res)) : dispatch(actions.FETCHING_REALTIMEDB_DOOR_UPDATE_FAILRUE(null));
              }));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      });
    };
  } catch (error) {
    console.error('action_view_updateDoorStatus', error.message);
  }
}; // View value befor update door status. call by authenticated file.


exports.action_view_updateDoorStatus = action_view_updateDoorStatus;

var result_updateDoorStatus = function result_updateDoorStatus(settingStatusValue) {
  return regeneratorRuntime.async(function result_updateDoorStatus$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(db.ref('door/status').on('child_changed', function (response) {
            var _response$val = response.val(),
                key = _response$val.key,
                status = _response$val.status,
                latestStatusBy = _response$val.latestStatusBy;

            db.ref("door/datas/".concat(key)).once('value', function (snapshot) {
              var _snapshot$val = snapshot.val(),
                  name = _snapshot$val.name;

              var res = "".concat(name, " being ").concat(status ? 'open' : 'close', " by ").concat(latestStatusBy);

              if (settingStatusValue === true) {
                _reactNativePushNotification["default"].localNotification({
                  message: res
                });
              }
            });
          }));

        case 3:
          _context9.next = 8;
          break;

        case 5:
          _context9.prev = 5;
          _context9.t0 = _context9["catch"](0);
          console.log('result_updateDoorStatus = ', _context9.t0.message);

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 5]]);
}; // Edit name & dexcription


exports.result_updateDoorStatus = result_updateDoorStatus;

var editProduct = function editProduct(no, name, description) {
  return regeneratorRuntime.async(function editProduct$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          try {
            db.ref("door/names/".concat(no)).update({
              name: name
            }).then(function () {
              db.ref("door/datas/".concat(no)).update({
                description: description
              });
            }).then(function () {
              (0, _toastPaper["default"])('Edit product succsessful.');
            })["catch"](function () {
              (0, _toastPaper["default"])('Edit product failed.');
            });
          } catch (error) {
            console.log('editProduct', error);
          }

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.editProduct = editProduct;

var SetAllStatus = function SetAllStatus(value) {
  try {
    db.ref("connections/datas").once('value', function (snapshot) {
      Object.values(snapshot.val()).map(function (elem) {
        var appConnection = elem.appConnection,
            arduinoConnection = elem.arduinoConnection,
            no = elem.no;

        if (appConnection && arduinoConnection) {
          db.ref("door/datas/".concat(no)).update({
            status: value
          }).then(function () {
            db.ref("door/status/".concat(no)).update({
              status: value
            });
          });
        }
      });
    });
  } catch (error) {
    console.log('SetAllStatus', error.message);
  }
};

exports.SetAllStatus = SetAllStatus;

var setStatusAll = function setStatusAll(arrId, _boolean) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, no;

  return regeneratorRuntime.async(function setStatusAll$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context11.prev = 4;
          _iterator = arrId[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context11.next = 13;
            break;
          }

          no = _step.value;
          _context11.next = 10;
          return regeneratorRuntime.awrap((0, _database["default"])().ref("door/status/".concat(no)).update({
            status: _boolean
          }));

        case 10:
          _iteratorNormalCompletion = true;
          _context11.next = 6;
          break;

        case 13:
          _context11.next = 19;
          break;

        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context11.t0;

        case 19:
          _context11.prev = 19;
          _context11.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context11.prev = 22;

          if (!_didIteratorError) {
            _context11.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context11.finish(22);

        case 26:
          return _context11.finish(19);

        case 27:
          _context11.next = 32;
          break;

        case 29:
          _context11.prev = 29;
          _context11.t1 = _context11["catch"](0);
          console.log('setStatusAll', _context11.t1);

        case 32:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 29], [4, 15, 19, 27], [20,, 22, 26]]);
};
/**********************************************************************/
// Remove


exports.setStatusAll = setStatusAll;

var action_removeDoor = function action_removeDoor(key) {
  var doorPath;
  return regeneratorRuntime.async(function action_removeDoor$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          doorPath = db.ref("door");
          _context12.next = 4;
          return regeneratorRuntime.awrap(doorPath.child("/status/".concat(key)).remove());

        case 4:
          _context12.next = 6;
          return regeneratorRuntime.awrap(doorPath.child("/connections/".concat(key)).remove());

        case 6:
          _context12.next = 8;
          return regeneratorRuntime.awrap(doorPath.child("/images/".concat(key)).remove());

        case 8:
          _context12.next = 10;
          return regeneratorRuntime.awrap(doorPath.child("/names/".concat(key)).remove());

        case 10:
          _context12.next = 12;
          return regeneratorRuntime.awrap(doorPath.child("/datas/".concat(key)).remove());

        case 12:
          _context12.next = 14;
          return regeneratorRuntime.awrap(doorPath.child("/creates/".concat(key)).remove());

        case 14:
          _context12.next = 16;
          return regeneratorRuntime.awrap(doorPath.child("/status/".concat(key)).remove());

        case 16:
          _context12.next = 18;
          return regeneratorRuntime.awrap((0, _storage["default"])().ref().child("door/".concat(key))["delete"]());

        case 18:
          _context12.next = 20;
          return regeneratorRuntime.awrap(db.ref("connections/datas/".concat(key)).update({
            appConnection: false
          }));

        case 20:
          _context12.next = 25;
          break;

        case 22:
          _context12.prev = 22;
          _context12.t0 = _context12["catch"](0);
          console.log('action_removeDoor', _context12.t0.message);

        case 25:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 22]]);
}; // Check child remove.


exports.action_removeDoor = action_removeDoor;

var action_childRemove_firebase = function action_childRemove_firebase() {
  return regeneratorRuntime.async(function action_childRemove_firebase$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap((0, _database["default"])().ref('door/datas').on('child_removed', function (snapshot) {
            var result = snapshot.val();
            (0, _toastPaper["default"])("Remove ".concat(result.name, " success."));
          }));

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  });
};
/**********************************************************************/
// Login & Logout


exports.action_childRemove_firebase = action_childRemove_firebase;

var loginUser = function loginUser(username, password) {
  var email, result;
  return regeneratorRuntime.async(function loginUser$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          email = "".concat(username, "@wicket.com");
          _context14.next = 3;
          return regeneratorRuntime.awrap((0, _auth["default"])().signInWithEmailAndPassword(email, password)["catch"](function () {
            return console.log('Login failrue');
          }));

        case 3:
          result = _context14.sent;
          return _context14.abrupt("return", result);

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
};

exports.loginUser = loginUser;

var logoutUser = function logoutUser() {
  (0, _auth["default"])().signOut();
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


exports.logoutUser = logoutUser;

var action_setMessages = function action_setMessages(message) {
  var pushData;
  return regeneratorRuntime.async(function action_setMessages$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap((0, _database["default"])().ref('messages').push());

        case 3:
          pushData = _context15.sent;
          pushData.key;
          pushData.set(message);
          _context15.next = 11;
          break;

        case 8:
          _context15.prev = 8;
          _context15.t0 = _context15["catch"](0);
          console.log('action_setMessage -> error', _context15.t0);

        case 11:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // New messages only.


exports.action_setMessages = action_setMessages;

var action_newMessageOnly = function action_newMessageOnly(mount, // mount = useRef fetching start component.
mountSettingMessage, // mountSettingMessage = value setting from messages settings notification.
email // email = use email represent id to check message user id
) {
  return regeneratorRuntime.async(function action_newMessageOnly$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap((0, _database["default"])().ref('messages').limitToLast(1).on('child_added', function (snapshot) {
            var message = snapshot.val();

            if (mount) {
              return;
            }

            if (mountSettingMessage) {
              if (email !== message.user._id) {
                _reactNativePushNotification["default"].localNotification({
                  title: message.user.username,
                  message: message.text,
                  soundName: 'definite.mp3'
                });

                return;
              }
            }
          }));

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  });
}; // User online list


exports.action_newMessageOnly = action_newMessageOnly;

var action_userOnline = function action_userOnline() {
  return new Promise(function (res, rej) {
    (0, _database["default"])().ref('online/user').on('value', function (snapshot) {
      if (!!!snapshot.val()) {
        rej({
          message: 'error'
        });
      }

      res(snapshot.val());
    });
  });
};

exports.action_userOnline = action_userOnline;

var action_checkConnection = function action_checkConnection(id) {
  return new Promise(function (res, rej) {
    (0, _database["default"])().ref("connections").once('value', function (snapshot) {
      if (!!!snapshot.val()) {
        rej({
          message: 'error'
        });
      }

      res(snapshot.val());
    });
  });
};

exports.action_checkConnection = action_checkConnection;

var action_setConnection = function action_setConnection(key, value) {
  var connections;
  return regeneratorRuntime.async(function action_setConnection$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          try {
            connections = db.ref("connections/datas/".concat(key, "/"));
            connections.update({
              arduinoConnection: value
            }).then(function () {
              connections.child('appConnection').once('value', function (snapshot) {
                if (snapshot.val()) db.ref("door/datas/".concat(key)).update({
                  arduinoConnection: value
                });
              });
            });
          } catch (err) {
            console.log('setOfline', err.message);
          }

        case 1:
        case "end":
          return _context17.stop();
      }
    }
  });
};

exports.action_setConnection = action_setConnection;

var action_connectionChanged = function action_connectionChanged() {
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(function _callee5$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return regeneratorRuntime.awrap((0, _database["default"])().ref("connections/datas").on('value', function (snapshot) {
              var datas = snapshot.val();

              if (!!!datas) {
                return;
              }

              dispatch(actions.setConnectionChacnge(Object.values(datas)));
            }));

          case 2:
          case "end":
            return _context18.stop();
        }
      }
    });
  };
};

exports.action_connectionChanged = action_connectionChanged;