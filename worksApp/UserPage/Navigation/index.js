import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import NewsScreen from "../Screens/NewsScreen";
import ChatScreen from "../Screens/ChatScreen";
import TeacherScreen from "../Screens/TeacherScreen";
import { Image, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialIcons, AntDesign, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const UserNavigation = (props) => {
  const [state, setstate] = useState();
  useEffect(() => {
    const getted = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          res.data.map((item) => {
            setstate(item);
            console.log(item.username);
          });
        });
    };
    getted();
  }, []);
  return (
    <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        // options={{
        //   headerRight: () => {
        //     return (
        //       <View
        //         style={{
        //           width: "35%",
        //           marginRight: 10,
        //           flexDirection: "row",
        //           justifyContent: "space-between",
        //           alignItems: "center",
        //         }}
        //         onPress={() => props.navigation.navigate('Profile')}
        //       >
        //         <Text style={{ fontSize: 18 }}>{state.username}</Text>
        //         <Image
        //           source={{
        //             uri: state.image
        //               ? "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
        //               : `https://markazback2.onrender.com/${state.image}`,
        //           }}
        //           style={{ width: 45, height: 45, borderRadius: 50 }}
        //         />
        //       </View>
        //     );
        //   },
        // }}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="newspaper" size={24} color="black" />
            ) : (
              <Ionicons name="newspaper-outline" size={24} color="black" />
            ),
        }}
        name="News"
        component={NewsScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color={"black"} />
            ),
        }}
        name="Course"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbox-ellipses" size={24} color="black" />
            ) : (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
              />
            ),
        }}
        name="Chat"
        component={ChatScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={24} color="black" />
              ) : (
              <FontAwesome name="user-circle-o" size={24} color="black" />
            ),
          headerRight: () => {
            return (
              <MaterialIcons
                name="logout"
                size={30}
                color={"#000"}
                style={{ marginRight: 10 }}
                onPress={() => {
                  AsyncStorage.clear();
                  props.navigation.navigate("LoginScreen");
                }}
              />
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
      {/*<Tab.Screen name="Teachers" component={TeacherScreen} />*/}
    </Tab.Navigator>
  );
};

export default UserNavigation;
