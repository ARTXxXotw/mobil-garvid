import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TextInput,
  Alert,
  RefreshControl,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import IconsForMe from "react-native-vector-icons/MaterialIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomDrawer from "./CustomDrawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HelpScreen from './HelpSreen'
import { Entypo, Feather ,MaterialCommunityIcons } from '@expo/vector-icons';
import ApplicationScreen from "./ApplicationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "react-router-native";
import IndexNavigation from "../Navigation";
import NavigationsBar from '../../src/Navigation/index'
import AppCopy from "./AppCopy";

const Tabs = createStackNavigator()
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Bonss = () => {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>HTML</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>CSS</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://blog.logrocket.com/wp-content/uploads/2021/02/machine-learning-libraries-javascript.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>JS</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>JAVA</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://sass-lang.com/assets/img/styleguide/seal-color.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>SASS</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/271/958/png-clipart-1st-century-logo-brand-electric-motor-jquery-icon-blue-text.png",
          }}
          style={{ width: 70, height: 70, borderRadius: 50, marginRight: 5 }}
        />
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>JQUERY</Text>
          <Text style={{ fontSize: 12 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
            voluptate?
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const SertificateScreen = () => {
  const Bonss2 = () => {
    return (
      <View>
        <Text>hello</Text>
      </View>
    );
  };
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sertificates" component={Bonss} />
      <Tab.Screen name="Settings" component={Bonss2} />
    </Tab.Navigator>
  );
};

const Courses = () => {
  return (
    <View>
      <Text>Courses</Text>
    </View>
  );
};

const ProfilePage = (props) => {
  const [key2, setKey2] = useState();
  const [user, setUser] = useState([]);
  const [loader, setLoader] = useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setLoader(null);
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
       axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        });
    };
    setTimeout(() => {
      keyOlish()
      setLoader(1);
    }, 2000);
  }, []);
  useEffect(() => {
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
 
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        });
    };
    keyOlish();
    setLoader(null);
    setTimeout(() => {
      setLoader(1);
    }, 2000);
  }, []);
  return (
    <ScrollView
      style={{}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loader == null ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
        source={{
          uri: "https://www.kingsubash.com/assets/img/sample-loader.gif",
        }}
        style={{ width: "100%", height: 520 }}
        />
        </View>
      ) : (
        <View>
          {user.map((item) => {
            return (
              <View style={styles.contain}>
                <Text>Balanse: {item.balance}</Text>
                <View style={styles.flex}>
                  {item.image ? (
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.image}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{ textAlign: "center", fontSize: 25, color: "black" }}
                >
                  {item.username}
                </Text>
                {item.description ? (
                  <Text style={{ fontSize: 13, color: "black", marginTop: 20 }}>
                    Description:
                    <Text style={{ fontSize: 16 }}>
                      &nbsp;{item.description}
                    </Text>
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "black",
                      marginTop: 20,
                    }}
                  >
                    No Description!
                  </Text>
                )}
              
                <View></View>
              </View>
            );
          })}
          <Bonss />
        </View>
      )}
    </ScrollView>
  );
};

const EditProfile = (props) => {
  
  const [user, setUser] = useState([]);
  const [date, setDate] = useState(new Date()); //this full time
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty"); // datatime
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMap, setUserMap] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
 
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setUser(res.data);
          res.data.map((item) => {
            setUserMap(item);
            setUsername(item.username);
            setLast_name(item.last_name);
            setPhone_number(item.phone_number);
            setAdress(item.address);
            setDescription(item.description);
            setUserEmail(item.email);
          });
        });
    };
    keyOlish();
  }, []);
  const handleChangeData2 = (text) => {
    setLast_name(text);
  };
  const handleChangeData3 = (text) => {
    setUsername(text);
  };
  const handleChangeData4 = (text) => {
    setPhone_number(text);
  };
  const handleChangeData5 = (text) => {
    setAdress(text);
  };
  const handleChangeData6 = (text) => {
    setDescription(text);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    console.log(result.uri, "this is result");
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    let fTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes();
    setText(fDate);
  };

  const showMode = (currentMoe) => {
    setShow(true);
    setMode(currentMoe);
  };

  const postData = async () => {
    var data2 = {
      last_name: last_name,
      username: username,
      phone_number: phone_number,
      address: adress,
      description: description,
      image: image,
      email: "halilovabdurahim13@gmail.com",
    };
    const tokenUser = await AsyncStorage.getItem("token");
 
    axios
      .put(
        `https://markazback2.onrender.com/auth/oneuser/${userMap.id}/`,
        data2,
        { headers: { Authorization: "Bearer " + tokenUser } }
      )
      .then((res) => {
        Alert.alert("Succes", "You edited profile!", [
          { text: "ok", onPress: () => props.navigation.navigate("Profile") },
        ]);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
    console.log(tokenUser);
  };

  return (
    <ScrollView
      style={{ padding: 10 }}
      onScroll={(e) => console.log(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      <View style={{ paddingBottom: 30 }}>
        {user.map((item) => {
          return (
            <View>
              <View>
                {image == null ? (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: `${userMap.image}` }}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: "yellow",
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: "red",
                      }}
                    />
                  </View>
                )}
                <IconsForMe
                  name="photo-camera"
                  onPress={() => pickImage()}
                  style={{
                    fontSize: 35,
                    backgroundColor: "dodgerblue",
                    padding: 10,
                    borderRadius: 30,
                    width: 55,
                    height: 55,
                    color: "white",
                    top: -58,
                    left: 202,
                  }}
                />
              </View>
              <Text>Last Name</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                placeholder={item.last_name}
                onChangeText={handleChangeData2}
              />
              <Text>Username</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                placeholder={item.username}
                onChangeText={handleChangeData3}
              />
              <Text>Phone Number</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                placeholder={item.phone_number}
                keyboardType="numeric"
                onChangeText={handleChangeData4}
              />
              <Text>Address</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                placeholder={item.address}
                keyboardType="email-address"
                onChangeText={handleChangeData5}
              />
              <Text>Description</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 5,
                  paddingLeft: 5,
                }}
                placeholder={item.description}
                onChangeText={handleChangeData6}
              />
             <Button title="Puted" onPress={postData} type="submit" />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};


const PageLoginn = (props) => {
  const [state, setState] = useState(null);
  const [username, setUsername] = useState("alibeliy777777@gmail.com");
  const [password, setPassword] = useState("bel1y4442");
  const height = Dimensions.get("window");
  // const getLocal = async () => {
  //   // await AsyncStorage.clear()
  //   var value = await AsyncStorage.getItem("pageNumber");
  //   // alert(value);
  //   setState(value ? value : null);
  // };
  // useEffect(() => {
  //   getLocal();
  //   // console.log(height.height);
  // });
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
        AsyncStorage.setItem("token", JSON.stringify(res.data.access));
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
                props.navigation.replace("IndexNavigation");
              } else if (item.position == 2) {
                AsyncStorage.setItem(
                  "pageNumber",
                  JSON.stringify(item.position)
                );
                props.navigation.replace("Navigation");
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
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "height" : "padding"}
      style={{ flex: 1 }}
      // enabled={1000}
    >
      {state == null ? (
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
                source={require("../../img/HowardLogo.png")}
              />
            ) : (
              <Image
                style={{ width: "100%", height: 170 }}
                source={require("../../img/HowardLogo.png")}
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
                flex: 1,
              }}
            >
              <IndexNavigation />
            </View>
          ) : (
            <NavigationContainer>
              <NavigationsBar />
            </NavigationContainer>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
const Pageee = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Login" options={{ headerShown: false }} component={PageLoginn} />
    </Tabs.Navigator>
  );
};

export default function Profile() {
  const [setts, setSetts] = useState();
  const page = () => {
    return (
      <View
        style={{
          fontSize: 28,
          backgroundColor: "red",
          position: "absolute",
          top: 100,
          left: 50,
        }}
      >
        <Text>hallasd</Text>
      </View>
    );
  };
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            drawerIcon: ({ color }) => (
              <FontAwesome name="user-circle-o" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-sharp" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Sertificates"
          component={SertificateScreen}
          options={{
            drawerIcon: ({ color }) => (
              <IconsForMe name="star-border" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Help"
          component={HelpScreen}
          options={{
            drawerIcon: ({ focused }) => (
              focused ? <Entypo name="help-with-circle" size={24} color="black" /> : <Feather name="help-circle" size={24} color="black" />
            ),
          }}
        />
        <Drawer.Screen
        name="ApplicationScreen"
        component={ApplicationScreen}
        options={{
          drawerIcon: ({ focused }) => (
            focused ? <MaterialCommunityIcons name="application-edit" size={24} color="black" /> : <MaterialCommunityIcons name="application-edit-outline" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
          name="LogOut"
          component={AppCopy}
          options={{
            headerShown: false,
            drawerIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="application-edit"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="application-edit-outline"
                  size={24}
                  color="black"
                />
              ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  contain: {
    width: "100%",
    minHeight: 300,
    padding: 10,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});

// const handleChangeUsername = (text) => {
//   setUsername(text);
// };
// {
//     "first_name": "Shoha",
//     "last_name": "",
//     "username": "djadmin",
//     "image": "/static/Users/301319502_156100240406943_8678168300128687251_n.jpg",
//     "phone_number": null,
//     "birthday": null,
//     "balance": null,
//     "adress": null,
//     "description": null
// }

// filter: drop-shadow(10px 8px 6px #ff0055)

// [{ "address": null, "balance": 0, "date_joined": "2023-07-29T17:12:58.000Z", "description": null, "email": "halilovabdurahim13@gmail.com", "id": 2, "image": null, "is_active": true, "is_staff": false, "is_superuser": false, "last_login": "2023-07-30T12:12:34.425Z", "last_name": null, "password": "mlBBqwerty", "phone_number": null, "position": 3, "time_create": "2023-07-29T17:12:58.000Z", "time_update": "2023-07-29T17:12:58.000Z", "username": "abdurahim" }]

{
  /* <View>
        {
          image == null ? (
            <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'center' }}>
              <Image source={{ uri: `https://markazback2.onrender.com${user.image}`, }} style={{ width: 150, height: 150, borderRadius: 100 }} />
            </View>
          ) : user.image == null ? (
            <Text>No Img</Text>
          ) : (
            <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'center' }}>
              <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100 }} />
            </View>
          )
        }
        <IconsForMe name='photo-camera'
          onPress={() => pickImage()}
          style={{
            fontSize: 35, backgroundColor: 'dodgerblue',
            padding: 10, borderRadius: 30, width: 55, height: 55, color: 'white',
            top: -58,
            left: 202,
          }} />
      </View> */
}

// {
//   show && (
//     <DateTimePicker
//       testID="dateTimePicker"
//       value={date}
//       mode={mode}
//       is24Hour={true}
//       display="default"
//       onChange={onChange}
//     />)
// }
//   <View style={{ marginBottom: 10 }}>
//   <Text>Selected Birthday: {text}</Text>
//   <Button title="Select Data" onPress={() => showMode('date')} />
// </View>

// import { Modal } from 'react-native';
// import ImageViewer from 'react-native-image-zoom-viewer';
// const images = [{
//   // Simplest usage.
//   url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

//   // width: number
//   // height: number
//   // Optional, if you know the image size, you can set the optimization performance

//   // You can pass props to <Image />.
//   props: {
//     // headers: ...
//   }
// }, {
//   url: '',
//   props: {
//     // Or you can set source directory.
//     source: require('../../assets/image/BG.png')
//   }
// }]

//   <Modal visible={true} transparent={true}>
//   <ImageViewer imageUrls={images} />
// </Modal>
