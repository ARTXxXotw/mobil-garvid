import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Components/Home";
import Chat from "../Components/Chat";
import Teachers from "../Components/Teachers";
import Profile from "../Components/Profile";
import { NavigationContainer } from "@react-navigation/native";
import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import News from "../Components/News";

const Tab = createBottomTabNavigator();

const index = ({ navigation }) => {
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator initialRouteName="HorwardDashboard">
      <Tab.Screen
        name="News"
        options={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons name="newspaper" size={24} color="black" />
            ) : (
              <Ionicons name="newspaper-outline" size={24} color="black" />
            );
          },
          // headerRight: () => {
          //   return (
          //     <View style={{ position: "relative", flexDirection: 'row', alignItems: 'center' }}>
          //     <Text>Halilov Adburahim</Text>
          //       <Ionicons
          //         name="newspaper"
          //         onPress={() => alert('Profile')}
          //         style={{
          //           position: "absolute",
          //           top: 5,
          //           right: 10,
          //           backgroundColor: "red",
          //           zIndex: 3,
          //           borderRadius: 50,
          //           opacity: 0,
          //         }}
          //         size={50}
          //         color="black"
          //       />
          //       <Image
          //         style={{
          //           width: 50,
          //           height: 50,
          //           borderRadius: 50,
          //           margin: 10,
          //         }}
          //         source={{
          //           uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
          //         }}
          //       />
          //     </View>
          //   );
          // },
        }}
        component={News}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Entypo name="home" size={23} color={"#000"} />
            ) : (
              <AntDesign name="home" size={23} color={"#000"} />
            );
          },
        }}
        component={Home}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons name="chatbubbles" size={25} color={"#000"} />
            ) : (
              <Ionicons name="chatbubbles-outline" size={25} color={"#000"} />
            );
          },
        }}
        component={Chat}
      />
      <Tab.Screen
        name="Teachers"
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome5 name="chalkboard-teacher" size={23} color="black" />
            ) : (
              <FontAwesome5 name="chalkboard-teacher" size={23} color="black" />
            );
          },
        }}
        component={Teachers}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome name="user-circle" size={23} color={"#000"} />
            ) : (
              <FontAwesome name="user-circle-o" size={23} color={"#000"} />
            );
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default index;
