import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native'
import BASEURL from '../api/baseurl';
import URLs from '../api/urls';
import axios from 'axios';




const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    // console.log("android permissions=======>")
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      // console.log(permission)
    } catch (error) {
      console.error(error)
    }
  }
};

export const requestUserPermission = async () => {
  try {
    checkApplicationPermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await getFcmToken();
    }
  } catch (error) {
    console.log('Error requesting permission:', error);
  }
}

const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('Old FCM Token:', fcmToken);

    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.log('New FCM Token:', fcmToken);

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('fcmToken', fcmToken);
      // Make the POST request to register the new token
      await axios.post(`${BASEURL.URL}${URLs.Post_FCM_Tocken}`, {
        currentToken: fcmToken,
      })
        .then(response => {
          console.log('Token registered successfully:', response.data);
        })
        .catch(error => {
          console.log('Error registering token:', error);
        });
    }
  } catch (error) {
    console.log('Error retrieving or storing FCM Token:', error);
  }
};


// export const NotificationSecvices = async () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('unsubscribe.....', remoteMessage)
//   });

//   await messaging().getInitialNotification().then(remoteMessage => {
//     if (!remoteMessage) {
//       console.log(remoteMessage)
//     }
//   })
// }

