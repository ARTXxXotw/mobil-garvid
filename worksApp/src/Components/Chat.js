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
  ImageBackground,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeRouter, Route, Link, Routes } from 'react-router-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import io from "socket.io-client";
import ChatRooms from "./ChatRooms"
import ChatScreen from "./ChatScreen"
const socket = io.connect("https://markazback2.onrender.com");
const image = { uri: "https://wallpapercave.com/wp/wp6559609.jpg" };
const image2 = { uri: "https://th.bing.com/th/id/R.71901eb2f9942fa442cd6fda7e1fdb09?rik=9JfTTYfc%2boyMXg&pid=ImgRaw&r=0" }; 
// const ChatRooms = () => {
//   const [email, setEmail] = useState("");
//   const [rooms, setRooms] = useState([]);
//   const [name, setName] = useState(null);
//   useEffect(() => {
//     const getEmail = async () => {
//       const token = JSON.parse(await AsyncStorage.getItem("token"));
//       // console.log(token);
//       axios
//         .get("https://markazback2.onrender.com/auth/oneuser", {
//           headers: { Authorization: "Bearer " + token },
//         })
//         .then((res1) => {
//           // console.log(res1.data,"ssssssssssssss");
//           // Swal.fire(res1.data[0].email)
//           let email = res1.data[0].email;
//           socket.emit("authenticate", { email });
//           setEmail(email);
//           // Swal.fire("ishladi")
//           //     socket.emit("authenticate", { email });
//           //         const getRooms = async () => {
//           socket.emit("get_rooms", { email });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };
//     getEmail();
//     socket.on("load_rooms", (data) => {
//       setRooms(data);
//       console.log(data);
//     });
//   }, []);
//   const handlePress = () => {
//     setName('zafar');
//   }
//   return (
//     <ScrollView>
//       {rooms.map((item, key) => {
//         let a = item;
//         if (a !== null) {
//           const [email1, email2] = a.split("_");

//           const displayName = email1 === email ? email2 : email1;
//           return (
//             <TouchableOpacity                 onPress={handlePress}>
//             <Link to="/user">
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   padding: 10,
//                 }}
//               >
//                 <Image
//                   source={{
//                     uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
//                   }}
//                   style={{ width: 70, height: 70, borderRadius: 50 }}
//                 />
//                 <View style={{ width: "70%" }}>
//                   <Text style={{ fontSize: 16 }} numberOfLines={1}>
//                     {displayName}
//                   </Text>
//                 </View>
//               </View>
       
//             </Link>
//             </TouchableOpacity>
//           );
//         }
//       })}
//       <View style={{display:"none"}}>
//       {name && <ChatScreen name={name} />}
//       </View>
//     </ScrollView>
//   );
// };
// const ChatScreen = ({name}) => {
//     return (
//       <View style={{ flex: 1,}}>
//         <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
//           <View style={{ backgroundColor: '#eee', padding: 20, display: "flex", flexDirection: "row" }}>
//             <Link to="/">
//             <Icon name="ios-arrow-back" size={30} />
//             </Link>

//   <Image
//     source={image2}
//     style={{
//       width: 40,
//       height: 40,
//       borderRadius: 70,
//     }}
//   />
//   <Text style={{ fontSize: 18 }}>username</Text>
// </View>

//         <View style={{ flex: 1 }}>
//           <View style={{ flexDirection: 'row', padding: 10 }}>
//             <View style={{ backgroundColor: '#a6a6a6', padding: 10, borderRadius: 10 }}>
//               <Text>{name} </Text>
//             </View>
//           </View>
//           <View style={{ flexDirection: 'row-reverse', padding: 10 }}>
//             <View style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 10 }}>
//               <Text>My message</Text>
//             </View>
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', backgroundColor: '#bfbfbf', justifyContent: 'space-between', padding: 5, height: 62 }}>
//           <TextInput placeholder="Send to" style={{ width: '85%', height: 45,  paddingLeft: 10 }} />
//           {/* <Button title="Send" /> */}
//           <Icon onPress={()=>{Alert.alert("ok")}} name="ios-send" size={30} />
//         </View>
//         </ImageBackground>
//       </View>
//     );
// };

const Chat = () => (
  <NativeRouter>
    <Routes>
      <Route exact path="/" element={<ChatRooms />} />
      <Route path="/user" element={<ChatScreen />} />
    </Routes>
  </NativeRouter>
);


export default Chat;
