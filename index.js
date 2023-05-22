import { registerRootComponent } from 'expo';

import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee ,{ EventType,AndroidImportance }  from '@notifee/react-native';
            messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    onDisplayNotification(remoteMessage)
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
            });

            messaging().onNotificationOpenedApp(async (remoteMessage) => {
                
               // onDisplayNotification(remoteMessage)

                console.log(
                    'Notification caused app to open from background state:',
                    remoteMessage.notification,
                );
                navigation.navigate(remoteMessage.data.type);
            });
            messaging().setBackgroundMessageHandler(async remoteMessage => {
                if (remoteMessage.notification) {
                    return false;
                  }
                //onDisplayNotification(remoteMessage)
                const notification = remoteMessage.notification;
  if (notification) {
    // Disable Firebase SDK's default notification
    remoteMessage.notification = null;

    const { title, body } = notification;
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    //   importance: AndroidImportance.HIGH,
    // });
    await notifee.displayNotification({
      title,
      body,
      android: {
        //channelId,
        color: '#4caf50',
        actions: [
          {
            title: 'Dance 💃',
            pressAction: { id: 'dance' },
          },
          {
            title: 'Cry 😢',
            pressAction: { id: 'cry' },
          },
        ],
        content: {
          html: '<b>Styled HTMLTitle</b><br><i>Styled HTML content</i>',
        },
      }
    });
  }


                console.log('Message handled in the background!', remoteMessage);
            });


            async function onDisplayNotification(data) {
                const channelId = await notifee.createChannel({
                    id: 'important',
                    name: 'Important Notifications',
                    importance: AndroidImportance.HIGH,
                  });
                  console.log(channelId)
                await notifee.displayNotification({
                    title: data.notification.title,
                    subtitle: '🎃',
                    body: data.notification.body,
                    android: {
                      channelId,
                      color: '#4caf50',
                      actions: [
                        {
                          title: 'Dance 💃',
                          pressAction: { id: 'dance' },
                        },
                        {
                          title: 'Cry 😢',
                          pressAction: { id: 'cry' },
                        },
                      ],
                      content: {
                        html: '<b>Styled HTMLTitle</b><br><i>Styled HTML content</i>',
                      },
                    },
                  });
                  //data.notification = null;
                }

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
