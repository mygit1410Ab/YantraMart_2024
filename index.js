import 'react-native-gesture-handler';
import { AppRegistry, Platform, Linking } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType, AndroidStyle } from '@notifee/react-native';

// Configure notification channels and settings
async function configureNotifications() {
    if (Platform.OS === 'android') {
        // Create a channel for Android
        await notifee.createChannel({
            id: 'default-channel-id',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            vibration: true,
        });
    }
}

// Handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('remoteMessage=====>', remoteMessage);
    const { notification, messageId, data } = remoteMessage;
    const title = data?.title || notification?.title || 'Notification';
    const body = data?.body || notification?.body || 'You have a new message';
    const largeIcon = data?.image || notification?.android?.imageUrl;

    await notifee.displayNotification({
        id: messageId,
        title,
        body,
        android: {
            channelId: 'default-channel-id',
            smallIcon: 'ic_launcher',
            largeIcon,
            style: {
                type: AndroidStyle.BIGPICTURE,
                picture: largeIcon,
            },
            importance: AndroidImportance.HIGH,
            vibrationPattern: [300, 500],
            pressAction: {
                id: 'default', // This should trigger the event when pressed
                launchActivity: 'default', // This ensures the app is launched when pressed
            },
        },
        ios: {
            foregroundPresentationOptions: {
                alert: true,
                badge: true,
                sound: true,
            },
        },
        data,
    });
});

// Handle background events (like notification press)
notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    const clickActionUrl = notification?.data?.click_action;

    if (type === EventType.PRESS && pressAction.id === 'default') {
        console.log('Background notification pressed:', notification);
        if (clickActionUrl) {
            // Open the click_action URL
            Linking.openURL(clickActionUrl).catch(err => console.error('Failed to open URL:', err));
        } else {
            // Handle the case where there's no click_action
            console.log('No click_action URL provided.');
        }
    }
});

// Run the configuration function when the app starts
configureNotifications();

// Register the main component of the app
AppRegistry.registerComponent(appName, () => App);
