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

const Stack = createStackNavigator();

const ChatScreen = (props) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const socket = io.connect("https://markazback2.onrender.com");
  // const [page, setPage] = useState();
  // const [state1, setState1] = React.useState();
  // const [rooms, setRooms] = useState([]);
  // const [room, setRoom] = useState("");
  // const [email, setEmail] = useState("");
  // const [users, setUsers] = useState([]);
  // const [chats, setChats] = useState([]);
  // const [nameput, Tgnameput] = useState([]);
  // const url = "https://markazback2.onrender.com";
  // useEffect(() => {
  //   const getToken = async () => {
  //     var token = await AsyncStorage.getItem("token");
  //     axios
  //       .get("https://markazback2.onrender.com/auth/oneuser", {
  //         headers: { Authorization: "Bearer " + token },
  //       })
  //       .then((res1) => {
  //         console.log(res1.data);
  //         let email = res1.data[0].email;
  //         socket.emit("authenticate", { email });
  //         setEmail(email);
  //         socket.emit("get_rooms", { email });
  //       })
  //       .catch((err) => {});
  //     axios
  //       .get("https://markazback2.onrender.com/auth/allusers", {
  //         headers: { Authorization: "Bearer " + token },
  //       })
  //       .then((res1) => {
  //         setUsers(res1.data);
  //       });
  //     navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
  //     return () => {
  //       navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
  //     };
  //   };
  //   getToken();
  // }, []);
  // useEffect(() => {
  //   socket.on("load_rooms", (data) => {
  //     setRooms(data);
  //   });
  // }, [socket]);
  // useEffect(() => {
  //   const getToken = async () => {
  //     var token = await AsyncStorage.getItem("token");
  //     axios
  //       .get(`${url}/auth/oneuser/`, {
  //         headers: { Authorization: "Bearer " + token },
  //       })
  //       .then(async (res) => {
  //         // res.data.map((item) => {
  //         //   document.querySelector("#tg_name").value = item.username;
  //         //   document.querySelector("#tg_number").value = item.phone_number;
  //         //   document.querySelector("#tg_email").value = item.email;
  //         // });
  //         await AsyncStorage.setItem("page_user", JSON.stringify(res.data));
  //         console.log(res.data);
  //         setChats(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     socket.on("new_private_room", (data) => {
  //       setRooms((prevRooms) => [...prevRooms, data.roomName]);
  //       Swal.fire(`Новая приватная комната создана: ${data.roomName}`);
  //     });
  //   };
  //   getToken()
  // }, [socket]);
  // const createPrivateRoom = (otheremail) => {
  //   // window.location.reload();
  //   // let email2="piyoz@gmail.com"
  //   socket.emit("create_private_room", {
  //     email1: email,
  //     email2: otheremail,
  //   });
  //   socket.emit("get_rooms", { email });
  //   socket.on("load_rooms", (data) => {
  //     setRooms(data);
  //   });
  //   // getRooms();
  //   // getUsers();
  // };
  // const handleInputChange = async (event) => {
  //   // setSearch(event.target.value);
  //   var token = await AsyncStorage.getItem("token");

  //   const searchRegex = new RegExp(`^${event.target.value}`, "i");
  //   axios
  //     .get("https://markazback2.onrender.com/auth/allusers", {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       const searchdata = res.data.filter((item) => {
  //         return (
  //           searchRegex.test(<Text>{item.username}</Text>) ||
  //           searchRegex.test(<Text>{item.email}</Text>)
  //         );
  //       });

  //       setUsers(searchdata);
  //     });
  // };
  useEffect(() => {
    console.log(socket.on);
    socket.on("load_rooms", (data) => {});
    socketServices.initializeSocket();
  }, [socket]);
  useEffect(() => {
    socketServices.on("received_message", (msg) => {
      console.log("message received in reactNativeApp", msg);
      let cloneArry = [...data];
      setData(cloneArry.concat(msg));
    });
  }, [data]);
  const sendMessage = () => {
    if (!!message) {
      socketServices.emit("send_message", message);
      setMessage("");
      return;
    }
    alert("please enter your message");
  };
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
            Jane Doe
          </Text>
        </View>
      </View>
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
            Jane Doe
          </Text>
        </View>
      </View>
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
            Jane Doe
          </Text>
        </View>
      </View>
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
            Jane Doe
          </Text>
        </View>
      </View>
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
            Jane Doe
          </Text>
        </View>
      </View>
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
          Jane Doe
        </Text>
      </View>
    </View>
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
          Jane Doe
        </Text>
      </View>
    </View>
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
          Jane Doe
        </Text>
      </View>
    </View>
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
          Jane Doe
        </Text>
      </View>
    </View>
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
          Jane Doe
        </Text>
      </View>
    </View>
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
      <Text>asdasdasd</Text>
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
