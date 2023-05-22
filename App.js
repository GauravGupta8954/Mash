// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, TextInput, SafeAreaView, Image, FlatList,PanResponder, Animated } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import * as Notifications from 'expo-notifications';
// import React, { useEffect, useState } from 'react'
// import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
// import { AndroidStyle } from '@notifee/react-native';
// import { Platform } from 'react-native';
// import { NotificationChannel } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import CustomTextInput from './src/custominput';
// import OutlinedTextInput from './src/custominput';
// import AnimatedText from './src/custominput';
// import PushNotification from 'react-native-push-notification';
// import Slider from '@react-native-community/slider'
// import AppIntroSlider from 'react-native-app-intro-slider';
// import Geolocation from '@react-native-community/geolocation';
// import { PermissionsAndroid } from 'react-native';
// //import { useState } from 'react';



// export default function App() {
//   const [backspaceFlag, setBackspaceFlag] = useState(false);
//   const [expiratoinDate, setExpirationDate] = useState('');
//   const [check, setCheck] = useState(false)
//   const [password, setPassword] = useState('')
//   const [value,setValue]=useState(1)
//   const handleExpirationDate = (text) => {
//     let textTemp = text;
//     if (textTemp[0] !== '1' && textTemp[0] !== '0') {
//       textTemp = '';
//     }
//     if (textTemp.length === 2) {
//       if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
//         textTemp = textTemp[0];
//       } else if (text.length === 2 && !backspaceFlag) {
//         textTemp += '/';
//         setBackspaceFlag(true);
//       } else if (text.length === 2 && backspaceFlag) {
//         textTemp = textTemp[0];
//         setBackspaceFlag(false);
//       } else {
//         textTemp = textTemp[0];
//       }
//     }
//     setExpirationDate(textTemp);
//   };


//   const CardExpiryInput = ({ month, year }) => {
//     return (
//       <View>
//         <TextInput placeholder="MM / YY" />
//         <Picker>
//           {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
//             <Picker.Item key={m} label={m.toString()} value={m} />
//           ))}
//         </Picker>
//         <Picker>
//           {Array.from({ length: 10 }, (_, i) => i + new Date().getFullYear()).map((y) => (
//             <Picker.Item key={y} label={y.toString()} value={y} />
//           ))}
//         </Picker>
//       </View>
//     );
//   };






//   async function onDisplayNotification(data) {
//     const channelId = await notifee.createChannel({
//       id: 'important',
//       name: 'Important Notifications',
//       importance: AndroidImportance.HIGH,
//     });
//     console.log(channelId)
//     await notifee.displayNotification({
//       title: data.notification.title,
//       subtitle: '🎃',
//       body: data.notification.body,
//       android: {
//         channelId,
//         color: '#4caf50',
//         actions: [
//           {
//             title: 'Dance 💃',
//             pressAction: { id: 'dance' },
//           },
//           {
//             title: 'Cry 😢',
//             pressAction: { id: 'cry' },
//           },
//         ],
//         content: {
//           html: '<b>Styled HTMLTitle</b><br><i>Styled HTML content</i>',
//         },
//       },
//     });
//   }

//   async function requestUserPermission() {

//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//   }












//   useEffect(() => {
//     if (requestUserPermission()) {
//       messaging().getToken().then(token => {
//         console.log(token)
//         //sendtoken(token);
//         //inputSelect(token)
//         //setIdtoken(token);

//       });
//     }
//     else { console.log("Permission denied status", authStatus) }
//     // Check whether an initial notification is available



//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       title = JSON.stringify(remoteMessage)
//       const jsonObj = JSON.parse(title);
//       onDisplayNotification(remoteMessage)
//     });
//     return unsubscribe;
//   }, [])

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app requires access to your location.',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Location permission granted');
//         getCurrentLocation(); // Fetch the current location
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };
// useEffect(()=>{
//   requestLocationPermission();
// },[])






// const getCurrentLocation = () => {
//   Geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log('Current location:', latitude, longitude);
//     },
//     (error) => {
//       console.warn('Error fetching location:', error);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//   );
// };

//   const slides = [
//     {
//       key: 1,
//       title: 'Title 1',
//       text: 'Description.\nSay something cool',
//       image: require('./assets/food1.jpg'),
//       backgroundColor: '#ffffff',
//     },
//     {
//       key: 2,
//       title: 'Title 2',
//       text: 'Other cool stuff',
//       image: require('./assets/food2.jpg'),
//       backgroundColor: 'rgba(0, 0, 0, .2)',
//     },
//     {
//       key: 4,
//       title: 'Rocket guy',
//       text: 'I\'m already out of descriptions\n  ',
//       image: require('./assets/food3.jpg'),
//       backgroundColor: '#ffffff',
//     },
//     {
//       key: 5,
//       title: 'Rocket guy',
//       text: 'I\'m already out of descriptions\n  ',
//       image: require('./assets/food4.jpg'),
//       backgroundColor: '#ffffff',
//     },
//     {
//       key: 6,
//       title: 'Rocket guy',
//       text: 'I\'m already out of descriptions\n  ',
//       image: require('./assets/food5.jpg'),
//       backgroundColor: '#ffffff',
//     },
//     {
//       key: 7,
//       title: 'Rocket guy',
//       text: 'I\'m already out of descriptions\n  ',
//       image: require('./assets/food6.jpg'),
//       backgroundColor: '#ffffff',
//     },
//     {
//       key: 8,
//       title: 'Rocket guy',
//       text: 'I\'m already out of descriptions  ',
//       image: require('./assets/food7.jpg'),
//       backgroundColor: '#ffffff',
//     }
//   ];

//   // const Slider = () => {
//   //   const renderNextButton = () => {
//   //     return (
//   //       <View style={{ borderRadius: 10, backgroundColor: 'black', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
//   //         <Text style={{ color: 'white' }}>Next</Text>
//   //       </View>
//   //     );
//   //   };
//   //   const renderDoneButton = () => {
//   //     return (
//   //       <View style={{ borderRadius: 10, backgroundColor: 'black', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
//   //         <Text style={{ color: 'white' }}>Done</Text>
//   //       </View>
//   //     );
//   //   };
//   //   const [showRealApp, setShowRealApp] = useState(false);

//   //   const renderItem = ({ item }) => {
//   //     return (
//   //       <View style={styles.slide}>
//   //         <Text style={styles.title}>{item.title}</Text>
//   //         <Image source={item.image} style={styles.image} />
//   //         <Text style={styles.text}>{item.text}</Text>
//   //       </View>
//   //     );
//   //   }

//   //   const onDone = () => {
//   //     setShowRealApp(true);
//   //   }

//   //   if (showRealApp) {
//   //     return <App />;
//   //   } else {
//   //     return <AppIntroSlider
//   //       renderItem={renderItem}
//   //       data={slides}
//   //       onDone={onDone}
//   //       bottomButton={true}
//   //       renderDoneButton={renderDoneButton}
//   //       renderNextButton={renderNextButton}
//   //       activeDotStyle={{ backgroundColor: "#8585C5" }}
//   //     />;
//   //   }
//   // }




//   const styles = StyleSheet.create({
//     sliderContainer: {
//       height: 10,
//       backgroundColor: '#ddd',
//       borderRadius: 5,
//       marginHorizontal: 20,
//     },
//     thumb: {
//       position: 'absolute',
//       width: 20,
//       height: 20,
//       backgroundColor: 'white',
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: '#aaa',
//       shadowColor: '#aaa',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.5,
//       shadowRadius: 2,
//       elevation: 3,
//       top: -5,
//     },
//   });



//   const thumbImage = require('./assets/circle.jpg');
//   return (
//     <View style={{ marginTop: 200 }}>
//       {/* <Slider/> */}
//       {/* <FlatList
//         data={slides}
//         horizontal={true}
//         renderItem={({ item }) => {
//           //console.log(item)
//           return (
//             <View style={{ shadowColor:'black',elevation:5, margin: 10,borderTopLeftRadius: 10, borderTopRightRadius: 10  }}>
//             <View style={{ borderRadius: 10,   }}>
//               <Image source={item.image} style={{ height:100,width:175,borderTopLeftRadius: 10, borderTopRightRadius: 10,}} />
//               </View>
//              <View style={{width:175,backgroundColor:"white",height:100,}}>
//               <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20,margin:2 }}>{item.title}</Text>
//               <Text style={{ color: 'black' ,margin:2 }}>{item.text}</Text>
//               </View>

//             </View>);
//         }}
//       /> */}
//       <Slider
//           maximumValue={100}
//           minimumValue={0}
//           minimumTrackTintColor="#8585C5"
//           maximumTrackTintColor="#000000"
//           step={1}
//           value={value}
//           //thumbTintColor={pageViewPositionSlider.thumbColor}
//           onValueChange={
//             (t) => setValue(t)

//           }
//           //style={{  transform: [{ scaleY: 4 }] }}
//          // thumbImage={thumbImage}
//    style={{width: 200, height: 40}} 

//         />
//       <Text style={{fontSize:20,marginLeft:'5%'}}>{value}</Text>
//       <StatusBar style='dark' />
//     </View>
//   );
// }

// const pageViewPositionSlider = {
//   trackColor: '#8585C5',
//   thumbColor: '#8585C5',
//   style: {
//     width: '100%',
//   },
//   opacity: 0.5
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingHorizontal: 16,
//     // paddingTop: 32,
//   },
//   slide: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//   },
//   image: {
//     width: 320,
//     height: 320,
//     marginVertical: 32,
//   },
//   text: {
//     color: "black",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: 22,
//     color: "#8585C5",
//     textAlign: "center",
//   },
//   paginationContainer: {
//     position: "absolute",
//     bottom: 16,
//     left: 16,
//     right: 16,
//   },
//   paginationDots: {
//     height: 16,
//     margin: 16,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 4,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginHorizontal: 24,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 20,
//     marginHorizontal: 8,
//     borderRadius: 24,
//     backgroundColor: "black",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });





// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// //import Geolocation from 'react-native-geolocation-service';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// const LocationScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       if (result === RESULTS.GRANTED) {
//         // Permission granted, fetch the location
//         fetchLocation();
//       } else {
//         setError('Location permission denied');
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   };

//   const fetchLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//       },
//       (error) => {
//         setError('Error fetching location: ' + error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   return (
//     <View>
//       {location ? (
//         <View>
//           <Text>Latitude: {location.latitude}</Text>
//           <Text>Longitude: {location.longitude}</Text>
//         </View>
//       ) : (
//         <Text>{error}</Text>
//       )}
//       <Button title="Fetch Location" onPress={fetchLocation} />
//     </View>
//   );
// };

// export default LocationScreen;




import React from 'react';
import { View, StyleSheet,Text,Image, Button} from 'react-native';
import Lottie from 'lottie-react-native'
import { useState } from 'react';




const Appii = () => {

  const [show, setShow] = useState(true)
  
  return (
    <View style={styles.container}>
      {/* <Lottie
        source={require('./src/lottie/call-center.json')}
        loop
        autoPlay
        style={{ width: 300, height: 300 }}
      /> */}
      {show ? <Lottie
        source={require('./src/lottie/truck.json')}
        loop={false}
        autoPlay
        style={{ width: "100%", height: "60%", alignSelf: 'center' }}
      /> : <Text></Text>}

    </View>
  );
};









const App = () => {
const [visible,setVisible]=useState(true)
// setTimeout(() =>
//    { setVisible(false)}, 10000 )
   
  return (
    
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {visible? <Appii/> :
      <View>
    <Image source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQObNMkqAV-9oKH9KdPydWZtCcrSYmdNCe_yw&usqp=CAU',
        }} 
        style={{height:400,width:310}}/>

    <Button title='press' onPress={()=>{setVisible(true)}}/>
    </View>
      } 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 150,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default App;
//2366876555 