import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export const action_registerUser = async (username, password) => {
  try {
    const email = `${username}@wicket.com`;
    const {user} = await auth().createUserWithEmailAndPassword(email, password);
    return {
      error: false,
      message: 'The email address can be used',
      value: user,
    };
  } catch (error) {
    return {
      error: true,
      message: 'The email address is already in use by another account.',
    };
  }
};

//User Update.
export const action_userUpdate = async (email, name, ImageProfile) => {
  try {
    const reference = !!!ImageProfile
      ? await storage().ref(`user/profile.png`)
      : await storage().ref(`user/${email}`);
    if (!!ImageProfile) await reference.putFile(ImageProfile);
    const imageLink = await reference.getDownloadURL();

    return new Promise((res, rej) => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: name,
            photoURL: imageLink,
          });
        }
        res(user);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
