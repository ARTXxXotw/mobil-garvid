import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io from "socket.io-client";
import socketServices from "../server/socketServices";
const socket = io.connect("https://markazback2.onrender.com");
const Stack = createStackNavigator();

const ChatScreen = (props) => {
  const [email, setEmail] = useState("");
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getEmail = async () => {
      const token =  JSON.parse( await AsyncStorage.getItem('token'))
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
        console.log(err)
      });
    };
    getEmail()
    socket.on("load_rooms", (data) => {
      setRooms(data);
      console.log(data);
    });
  }, []);
  return (
    <ScrollView>
      {/*<View style={{ flexDirection: "row" }}>
        <TextInput onChangeText={text => setMessage(text)} value={message} style={{ borderWidth: 1, width: "75%" }} />
        <Button title="send" onPress={sendMessage} />
      </View>
      {
        data.map((val, i) => {
          return (
            <Text style={{ fontSize: 19, marginBottom: 8, fontWeight: 'bold' }}>{val}</Text>
          )
        })
      }*/}
                   {rooms.map((item,key) => {
                let a = item;
                if (a !== null) {
                  const [email1, email2] = a.split("_");
           
                  const displayName = email1 === email ? email2 : email1;
                  return(
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
                    <View style={{ width: "60%" }}>
                      <Text style={{ fontSize: 20 }} numberOfLines={1}>
                     {displayName}
                      </Text>
                    </View>
                  </View>
                  )
}})}

    </ScrollView>
  );
};

const UserScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, []);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation
            .getParent()
            .setOptions({ tabBarStyle: { display: "flex" } });
          navigation.goBack();
        }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <Text></Text>
    </View>
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
