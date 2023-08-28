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
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import IndexNavigation from "./src copy/Navigation";

export default function LoginPage(props) {
  const [state, setState] = useState(null);
  const [username, setUsername] = useState("mirobidmirkosimov@gmail.com");
  const [password, setPassword] = useState("12345678909");
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get("window");
  const navigation = useNavigation();
  useEffect(() => {
    // AsyncStorage.clear()
    const getLocal = async () => {
      var value = await AsyncStorage.getItem("token");
      if (value) {
        axios
          .get("https://markazback2.onrender.com/auth/oneuser", {
            headers: { Authorization: "Bearer " + value },
          })
          .then((res) => {
            res.data.map((item) => {
              if (item.position == 2) {
                props.navigation.replace("UserScreens");
              } else if (item.position == 4) {
                props.navigation.replace("UserNavigation");
                setIsLoading(true);
              } else {
                console.log(null);
              }
            });
          });
      } else {
        console.log(null);
      }
    };
    getLocal();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const handleChangeUsername = (text) => {
    setUsername(text);
  };
  const handleChangePassword = (text) => {
    setPassword(text);
  };

  // const onSave = async () => {
  //   var data = new FormData();
  //   data.append("email", username);
  //   data.append("password", password);
  //   var a = await axios
  //     .post("https://markazback2.onrender.com/auth/login", {
  //       email: username,
  //       password: password,
  //     })
  //     .then((res) => {
  //       const _postToken = async () => {
  //         await AsyncStorage.setItem("token", res.data.access);
  //       };
  //       setIsLoading(true);
  //       _postToken();
  //       axios
  //         .get("https://markazback2.onrender.com/auth/oneuser", {
  //           headers: { Authorization: "Bearer " + res.data.access },
  //         })
  //         .then((ress) => {
  //           ress.data.map((item) => {
  //             if (item.position == 1) {
  //               AsyncStorage.setItem(
  //                 "pageNumber",
  //                 JSON.stringify(item.position)
  //               );
  //               navigation.replace("UserNavigation");
  //             } else if (item.position == 2) {
  //               AsyncStorage.setItem(
  //                 "pageNumber",
  //                 JSON.stringify(item.position)
  //               );
  //               navigation.replace("UserScreens");
  //             } else {
  //               AsyncStorage.setItem("pageNumber", null);
  //               alert('bunday shaxs yo"q');
  //               setState(null);
  //               setIsLoading(false);
  //             }
  //           });
  //         });
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       // alert('bunday shaxs yo"q');
  //     });
  //   // a.data.access
  //   //   ? (alert("Succes"),
  //   //     setState(2),
  //   //     await AsyncStorage.setItem("token", a.data.access))
  //   //   : alert("Bunday shaxs yoq");

  //   console.log(a.data);
  // };

  const onSave = async () => {
    axios
      .post("https://markazback2.onrender.com/auth/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        const _postToken = async () => {
          await AsyncStorage.setItem("token", res.data.access);
        };
        _postToken();
        axios
          .get("https://markazback2.onrender.com/auth/oneuser", {
            headers: { Authorization: "Bearer " + res.data.access },
          })
          .then((res2) => {
            res2.data.map((item) => {
              if (item.position == 2) {
                alert("Succes");
                props.navigation.replace("UserScreens");
                setIsLoading(true);
              } else if (item.position == 4) {
                alert("Succes");
                props.navigation.replace("UserNavigation");
                setIsLoading(true);
              } else {
                alert("no user");
              }
            });
          })
          .catch((err) => {
            alert("no user");
            setIsLoading(false);
          });
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "height" : "padding"}
      style={{ flex: 1 }}
      // enabled={1000}
    >
      {isLoading == true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="big" color="#0000ff" />
        </View>
      ) : (
        <ScrollView style={{ flexGrow: 1 }}>
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
        </ScrollView>
      )}
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
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
