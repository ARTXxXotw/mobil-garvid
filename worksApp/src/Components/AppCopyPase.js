// import { View, Text } from "react-native";
// import React, { useEffect } from "react";
// import App from "../../App";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// const AppCopyPase = () => {
//   const navigation = useNavigation();
//   // useEffect(() => {
//   //   alert('ghjasd')
//   //   navigation.getParent()?.setOptions({
//   //     tabBarStyle: {
//   //       display: "none",
//   //     },
//   //   });
//   //   return () =>
//   //     navigation.getParent()?.setOptions({
//   //       tabBarStyle: undefined,
//   //     });
//   // }, [navigation]);
//   //   const navigation = useNavigation();
//   //   useEffect(() => {
//   //     AsyncStorage.clear();
//   //     navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
//   //     // return () => {
//   //     //   navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
//   //     // };
//   //   }, []);
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "yellow",
//       }}
//     >
//       <Text>asd</Text>
//     </View>
//   );
// };

// export default AppCopyPase;


import React, {useEffect} from 'react';
import {Text, View, StyleSheet, BackHandler, Alert, Button} from 'react-native';

const AppCopyPase = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
    <Button title='asd' onPress={() =>  {
      BackHandler.exitApp()
      AsyncStorage.clear()
    }} />
      <Text style={styles.text}>Click Back button!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppCopyPase;