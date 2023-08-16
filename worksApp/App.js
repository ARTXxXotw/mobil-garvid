// import { StatusBar } from "expo-status-bar";
// import {
//   Button,
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navigator from "./src/Navigation/index";
// import { NavigationContainer } from "@react-navigation/native";

// export default function App() {
//   const [state, setState] = useState(null);
//   const [username, setUsername] = useState("halilovabdurahim13@gmail.com");
//   const [password, setPassword] = useState("0");
//   const height = Dimensions.get("window");
//   const getLocal = async () => {
//     var value = await AsyncStorage.getItem("token");
//     if (value) {
//       setState(2);
//       console.log(value);
//     } else {
//       setState(null); //null
//     }
//   };
//   useEffect(() => {
//     getLocal();
//     // console.log(height.height);
//   });
//   const handleChangeUsername = (text) => {
//     setUsername(text);
//   };
//   const handleChangePassword = (text) => {
//     setPassword(text);
//   };

//   const onSave = async () => {
//     var data = new FormData();
//     data.append("email", username);
//     data.append("password", password);
//     var a = await axios.post("https://markazback2.onrender.com/auth/login", {
//       email: username,
//       password: password,
//     });
//     a.data.access
//       ? (alert("Succes"),
//         setState(2),
//         await AsyncStorage.setItem("token", a.data.access))
//       : alert("Bunday shaxs yoq");

//     console.log(a.data);
//   };
//   return (
//     <View style={styles.container}>
//       {state === null ? (
//         <View>
//           <View
//             style={{
//               minHeight: "100%",
//               marginTop: 70,
//               padding: 10,
//             }}
//           >
//             {height.height > 640 ? (
//               <Image
//                 style={{ width: "100%", height: 200 }}
//                 source={require("./img/HowardLogo.png")}
//               />
//             ) : (
//               <Image
//                 style={{ width: "100%", height: 170 }}
//                 source={require("./img/HowardLogo.png")}
//               />
//             )}
//             <View style={{ marginTop: 50 }}>
//               <View style={{ marginTop: 10 }}>
//                 <Text style={{ fontSize: 17, marginLeft: 2 }}>Login</Text>
//                 <TextInput
//                   style={{
//                     width: "100%",
//                     height: 40,
//                     borderWidth: 1,
//                     borderColor: "dodgerblue",
//                     borderRadius: 5,
//                     paddingLeft: 10,
//                     fontSize: 17,
//                   }}
//                   // onChange={(event) => setUsername(event.nativeEvent.value)}
//                   onChangeText={handleChangeUsername}
//                 />
//               </View>
//               <View style={{ marginTop: 10, marginBottom: 20 }}>
//                 <Text style={{ fontSize: 17, marginLeft: 2 }}>Password</Text>
//                 <TextInput
//                   style={{
//                     width: "100%",
//                     height: 40,
//                     borderWidth: 1,
//                     borderColor: "dodgerblue",
//                     borderRadius: 5,
//                     paddingLeft: 10,
//                     fontSize: 17,
//                   }}
//                   // onChange={(text) => setPassword(text)}
//                   onChangeText={handleChangePassword}
//                   secureTextEntry={true}
//                 />
//               </View>
//             </View>
//             <Text>{username + " " + password}</Text>
//             <Button title="Вход" onPress={onSave} />
//           </View>
//         </View>
//       ) : (
//         // <View style={styles.container}>
//         <NavigationContainer>
//           <Navigator />
//         </NavigationContainer>
//         // </View>
//       )}
//       <StatusBar style='default' />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // alignItems: 'center',
//     justifyContent: "center",
//     // paddingVertical: 10,
//   },
// });

import { StatusBar } from "expo-status-bar";
import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigator from "./src/Navigation/index";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [state, setState] = useState(null);
  const [username, setUsername] = useState("halilovabdurahim13@gmail.com");
  const [password, setPassword] = useState("0");
  const height = Dimensions.get("window");
  const getLocal = async () => {
    // await AsyncStorage.clear()
    var value = await AsyncStorage.getItem("pageNumber");
    // alert(value);
    setState(value ? value : null);
    // if (value) {
    //   setState(2);
    //   console.log(value);
    // } else {
    //   setState(null); //null
    // }
  };
  useEffect(() => {
    getLocal();
    // console.log(height.height);
  });
  const handleChangeUsername = (text) => {
    setUsername(text);
  };
  const handleChangePassword = (text) => {
    setPassword(text);
  };

  const onSave = async () => {
    var data = new FormData();
    data.append("email", username);
    data.append("password", password);
    var a = await axios
      .post("https://markazback2.onrender.com/auth/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        AsyncStorage.setItem('token', JSON.stringify(res.data.access))
        axios
          .get("https://markazback2.onrender.com/auth/oneuser", {
            headers: { Authorization: "Bearer " + res.data.access },
          })
          .then((ress) => {
            ress.data.map((item) => {
              if (item.position == 1) {
                AsyncStorage.setItem(
                  "pageNumber",
                  JSON.stringify(item.position)
                );
                setState(item.position);
              } else if (item.position == 2) {
                AsyncStorage.setItem(
                  "pageNumber",
                  JSON.stringify(item.position)
                );
                setState(item.position);
              } else {
                AsyncStorage.setItem("pageNumber", null);
                alert('bunday shaxs yo"q');
                setState(null);
              }
            });
          });
      });
    // a.data.access
    //   ? (alert("Succes"),
    //     setState(2),
    //     await AsyncStorage.setItem("token", a.data.access))
    //   : alert("Bunday shaxs yoq");

    console.log(a.data);
  };
  return (
    <View style={styles.container}>
      {state == null ? (
        <View>
          <View
            style={{
              minHeight: "100%",
              marginTop: 70,
              padding: 10,
            }}
          >
            {height.height > 640 ? (
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("./img/HowardLogo.png")}
              />
            ) : (
              <Image
                style={{ width: "100%", height: 170 }}
                source={require("./img/HowardLogo.png")}
              />
            )}
            <View style={{ marginTop: 50 }}>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 17, marginLeft: 2 }}>Login</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    borderColor: "dodgerblue",
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 17,
                  }}
                  onChangeText={handleChangeUsername}
                />
              </View>
              <View style={{ marginTop: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 17, marginLeft: 2 }}>Password</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    borderColor: "dodgerblue",
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 17,
                  }}
                  onChangeText={handleChangePassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <Text>{username + " " + password}</Text>
            <Button title="Вход" onPress={onSave} />
          </View>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: 700,
            flex: 1,
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          {state == 1 ? (
            <View
              style={{
                width: "100%",
                height: 700,
                flex: 1,
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text>4</Text>
            </View>
          ) : (
            <NavigationContainer>
            <KeyboardAvoidingView behavior="height" style={{flex:1}}>
            <Navigator />
            </KeyboardAvoidingView>
            </NavigationContainer>
          )}
        </View>
      )}
      {/*{state === null ? (
        <View>
          <View
            style={{
              minHeight: "100%",
              marginTop: 70,
              padding: 10,
            }}
          >
            {height.height > 640 ? (
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("./img/HowardLogo.png")}
              />
            ) : (
              <Image
                style={{ width: "100%", height: 170 }}
                source={require("./img/HowardLogo.png")}
              />
            )}
            <View style={{ marginTop: 50 }}>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 17, marginLeft: 2 }}>Login</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,
                    borderWidth: 1,
                    borderColor: "dodgerblue",
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 17,
                  }}
                  onChangeText={handleChangeUsername}
                />
              </View>
              <View style={{ marginTop: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 17, marginLeft: 2 }}>Password</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 40,


borderWidth: 1,
                    borderColor: "dodgerblue",
                    borderRadius: 5,
                    paddingLeft: 10,
                    fontSize: 17,
                  }}
                  onChangeText={handleChangePassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <Text>{username + " " + password}</Text>
            <Button title="Вход" onPress={onSave} />
          </View>
        </View>
      ) : (
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      )}*/}
      <StatusBar style="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
    // paddingVertical: 10,
  },
});
