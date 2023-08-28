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
  Alert,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState, useRef,useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io from "socket.io-client";
//   import socketServices from "../server/socketServices";
import { useNavigation, useRoute } from "@react-navigation/native";
const socket = io.connect("https://markazback2.onrender.com");
const Stack = createStackNavigator();
import { Feather, Ionicons,AntDesign } from "@expo/vector-icons";

const ChatScreen = (props) => {
  const [email, setEmail] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getEmail = async () => {
      const tokenUser = await AsyncStorage.getItem("token")
      // console.log(token);
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
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
            <TouchableOpacity
              onPress={() => {
                // const email =email
                navigation.navigate("User", {
                  name: displayName,
                  room: item,
                  email: email,
                });
                const room = item;

                socket.emit("join_room", { email, room });
                // const helo = async() => {
                // await AsyncStorage.setItem('userName', displayName)
                // }
                // helo()
              }}
            >
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
      <TouchableOpacity
        onPress={() => {
          console.log(email);
        }}
      >
      </TouchableOpacity>
    </ScrollView>
  );
};

const UserScreen = () => {
  const [namePage, setNamePage] = useState("User");
  const [idMessageEdit, setIdMessageEdit] = useState("");
  const [currentMessage, setCurrentMessage] = useState("sms");
  const [messageList, setMessageList] = useState([]);
  const [styles, setStyles] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const height = Dimensions.get("window");
  const route = useRoute();
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  navigation.setOptions({ title: route.params.name });
  console.log(route);
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, []);

  useEffect(() => {
    // const email=route.params.email
    // socket.emit("get_rooms", { email });
    // console.log(1);
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      // let uniqueChars = [...new Set(data)];
      // setMessageList(uniqueChars);
      socket.on("load_messages", (data) => {
        let uniqueChars = [...new Set(data)];
        setMessageList(uniqueChars);
        // console.log(data,"load messages");
      });
      // socket.emit("join_room", { email, room });
      // console.log(data," receive_message");
      // console.log(messageList,"usestate");
    });
  }, [socket]);

  useEffect(() => {
    const get = async () => {
      await socket.on("load_messages", (data) => {
        let uniqueChars = [...new Set(data)];
        setMessageList(uniqueChars);
        // console.log(data,"load messages");
      });
    };
    get();
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [socket]);

  const sendMessage = async () => {
    
    if (styles===true) {
        const token = JSON.parse(await AsyncStorage.getItem("token"));
        // var formdata = new FormData();
        // formdata.append("message",currentMessage);
        var data = {
          message:currentMessage
        }
        console.log(token);
        axios
          .put(`https://markazback2.onrender.com/auth/messages/${idMessageEdit}`,data, {
            headers: { Authorization: "Bearer " + token },
          })
          .then((res1) => {
            Alert.alert("ishladi")
const get = async () => {
           await  socket.on("load_messages", (data) => {
               setMessageList(data)
              // console.log(data,"load messages");
            }); }
            get()
          })
          .catch((err) => {
            console.log(err);
            Alert.alert("ishlamadi")
            Alert.alert(idMessageEdit)
          });
    }
    if (styles===false) {
      if (currentMessage !== "") {
        const room = route.params.room;
        const email = route.params.email;
        const messageData = {
          room: room,
          author: email,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
  
        socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
  
        console.log(messageData);
        console.log(currentMessage);
      }
    }

  };
  return (
    <View style={{ paddingBottom: styles == true ? 90 : 50, }}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/d2/bf/d3/d2bfd3ea45910c01255ae022181148c4.jpg",
        }}
        resizeMode="cover"
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={{ flexGrow: 1, height: "100%" }}
        >
          {messageList.map((item) => {
            return (

              <View style={{ marginBottom: 10, marginTop: 20 }}>
                {(() => {
                  if (item.author === route.params.email) {
                    return (
                      <View
                        style={{
                          backgroundColor: "cornflowerblue",
                          width: "50%",
                          // height: 50,
                          flex: 1,
                          justifyContent: "center",
                          padding: 10,
                          borderRadius: 15,
                          marginLeft: "50%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "white",
                            height: "auto",
                            paddingBottom: 10,
                          }}
                        >
                          {item.message}
                        </Text>
                        <Text
                          style={{
                            position: "absolute",
                            color: "white",
                            fontSize: 12,
                            bottom: 0,
                            right: 10,
                          }}
                        >
                          {item.time}
                          { "id:" +item.id}
                        </Text>
                        <TouchableOpacity onPress={() => {
                          if (styles===true) {
                            setStyles(false)
                          }else if (styles===false) {
                            setStyles(true)
                          }
                          setIdMessageEdit(item.id)
                          }}>
                        <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
          
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          backgroundColor: "blue",
                          width: "50%",
                          // height: 50,
                          flex: 1,
                          justifyContent: "center",
                          padding: 10,
                          borderRadius: 15,
                          // marginLeft: "50%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "white",
                            height: "auto",
                            paddingBottom: 10,
                          }}
                        >
                          {item.message}
                        </Text>
                        <Text
                          style={{
                            position: "absolute",
                            color: "white",
                            fontSize: 12,
                            bottom: 0,
                            right: 10,
                          }}
                        >
                          {item.time  }
                          {""}
                          { "id:" +item.id}
                        </Text>
                      </View>
                    );
                  }
                })()}
              </View>


            );
          })}
 
        </ScrollView>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          height: styles == true ? 90 : 50,
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {styles == true ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              height: 40,
              backgroundColor: "white",
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Text>ertyu</Text>
            <Feather name="x" onPress={() => setStyles(false)} size={24} color="black" />
          </View>
        ) : (
          <Text style={{height: 1,}}>asd</Text>
        )}
        <View style={{flexDirection: 'row',}}>
        <TextInput
        style={{ borderWidth: 2, width: "80%", height: 50, paddingLeft: 10 }}
        placeholder="send message"
        onChangeText={(text) => setCurrentMessage(text)}
        />
        <View
          style={{
            width: "20%",
            height: 50,
            borderWidth: 2,
            backgroundColor: "dodgerblue",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
          <Ionicons
          name="send"
          onPress={() => sendMessage()}
            size={30}
            color="white"
          />
          </View>
        </View>
      </View>
      </View>
  );
};

const Chat = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen
        name="User"
        options={{
          headerStyle: {
            backgroundColor: "silver",
          },
        }}
        component={UserScreen}
      />
    </Stack.Navigator>
  );
};

export default Chat;
