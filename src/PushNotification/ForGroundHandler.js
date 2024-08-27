import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType, AndroidStyle } from '@notifee/react-native';

const ForGroundHandler = () => {
  useEffect(() => {
    // Create a notification channel for Android
    if (Platform.OS === 'android') {
      notifee.createChannel({
        id: 'default-channel-id',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        vibration: true,
      });
    }

    // Notification handling function
    const handleNotification = async (remoteMessage) => {
      const { notification, data } = remoteMessage;
      const title = data?.title || notification?.title;
      const body = data?.body || notification?.body;
      const largeIcon = data?.image || notification?.android?.imageUrl;

      console.log('remoteMessage=====>', remoteMessage);

      // Display the notification
      await notifee.displayNotification({
        id: remoteMessage.messageId,
        title,
        body,
        android: {
          channelId: 'default-channel-id',
          smallIcon: 'ic_launcher', // Your app's small icon
          largeIcon, // Image or icon from data or notification payload
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: largeIcon, // The image URL or resource for the big picture
          },
          importance: AndroidImportance.HIGH,
          vibrationPattern: [300, 500],
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
          },
        },
        data, // Additional data payload for handling press actions
      });
    };

    // Subscribe to foreground messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      await handleNotification(remoteMessage);
    });

    // Handle foreground events like notification presses
    const foregroundListener = notifee.onForegroundEvent(({ type, detail }) => {
      const { notification } = detail;

      if (type === EventType.PRESS) {
        console.log('Foreground notification pressed:', notification);
        // Handle navigation or logic here, e.g., navigate to a specific screen
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the foreground message listener
      foregroundListener(); // Unsubscribe from the foreground event listener
    };
  }, []);

  return null;
};

export default ForGroundHandler;
