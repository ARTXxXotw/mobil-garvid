import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io from "socket.io-client";
import socketServices from "../server/socketServices";
import { useNavigation, useRoute } from "@react-navigation/native";
const socket = io.connect("https://markazback2.onrender.com");
const Stack = createStackNavigator();

const ChatScreen = (props) => {
  const [email, setEmail] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation()
  useEffect(() => {
    const getEmail = async () => {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      // console.log(token);
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res1) => {
          // console.log(res1.data,"ssssssssssssss");
          // Swal.fire(res1.data[0].email)
          let email = res1.data[0].email;
          socket.emit("authenticate", { email });
          setEmail(email);
          // Swal.fire("ishladi")
          //     socket.emit("authenticate", { email });
          //         const getRooms = async () => {
          socket.emit("get_rooms", { email });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getEmail();
    socket.on("load_rooms", (data) => {
      setRooms(data);
      // console.log(data);
    });
  }, []);
  return (
    <ScrollView>
      {rooms.map((item, key) => {
        let a = item;
        if (a !== null) {
          const [email1, email2] = a.split("_");

          const displayName = email1 === email ? email2 : email1;
          return (
            <TouchableOpacity onPress={() => {
              navigation.navigate('User', { name: displayName })
              // const helo = async() => {
              // await AsyncStorage.setItem('userName', displayName)
              // }
              // helo()
            }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Image
                  source={{
                    uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                  }}
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <View style={{ width: "70%" }}>
                  <Text style={{ fontSize: 16 }} numberOfLines={1}>
                    {displayName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </ScrollView>
  );
};

const UserScreen = () => {
  const [ namePage, setNamePage ] = useState("User")
  const height = Dimensions.get("window");
  const route = useRoute()
  const navigation = useNavigation()
  navigation.setOptions({ title: route.params.name })
  console.log(route);
  useEffect(() => {
    // const asd = await AsyncStorage.getItem('userName')
    // alert(asd)
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, []);

  // onPress={() => {
  //         navigation
  //           .getParent()
  //           .setOptions({ tabBarStyle: { display: "flex" } });
  //         navigation.goBack();
  //       }}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? undefined : "padding"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS == "android" ? 0 : 100}
    >
        <ScrollView style={{ flexGrow: 1, height: '100%' }}>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
          <Text>asdas</Text>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            justifyContent: "space-between",
            padding: 5,
            // position: "absolute",
            // top: height.height / 1.3,
            height: 62,
          }}
        >
          <TextInput
            placeholder="send to "
            style={{
              width: "85%",
              height: 45,
              borderWidth: 1,
              paddingLeft: 10,
            }}
          />
          <Button title="send" />
        </View>
    </KeyboardAvoidingView>
  );
};

const Chat = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  );
};

export default Chat;
