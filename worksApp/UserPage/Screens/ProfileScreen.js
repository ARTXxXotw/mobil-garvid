import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Pressable,
  Button,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import ApplicationScreen from "./ApplicationScreen";
import {
  FontAwesome,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";

const Drawer = createDrawerNavigator();
const EditProfile = (props) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={{ padding: 5, flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          {image == null ? (
            <Pressable
              style={{
                width: "70%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={pickImage}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 100,
                }}
              >
                <Image
                  source={{
                    uri: "https://static.thenounproject.com/png/396915-200.png",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View>
                <Text>Select profile image!</Text>
              </View>
            </Pressable>
          ) : (
            <View>
              <MaterialIcons
                onPress={() => {
                  setImage(null);
                }}
                name="cancel"
                size={40}
                color="red"
                style={{
                  width: 50,
                  height: 50,
                  right: 40,
                  top: 10,
                  position: "absolute",
                  zIndex: 10,
                }}
              />
              <Pressable
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={pickImage}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: "50%", height: 165, borderRadius: 100 }}
                />
                <Text>Select profile image!</Text>
              </Pressable>
            </View>
          )}

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 5,
              }}
            >
              <Text style={{ color: "gray" }}>Username</Text>
              <TextInput
                style={{
                  width: "70%",
                  height: 40,
                  borderBottomWidth: 1,
                  borderRadius: 8,
                }}
                placeholder="Username"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 5,
              }}
            >
              <Text style={{ color: "gray" }}>Last name</Text>
              <TextInput
                style={{
                  width: "70%",
                  height: 40,
                  borderBottomWidth: 1,
                  borderRadius: 8,
                }}
                placeholder="Last name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 5,
              }}
            >
              <Text style={{ color: "gray" }}>Email</Text>
              <TextInput
                style={{
                  width: "70%",
                  height: 40,
                  borderBottomWidth: 1,
                  borderRadius: 8,
                }}
                placeholder="Email"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 5,
              }}
            >
              <Text style={{ color: "gray" }}>Description</Text>
              <TextInput
                style={{
                  width: "70%",
                  height: 40,
                  borderBottomWidth: 1,
                  borderRadius: 8,
                }}
                placeholder="Description"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 5,
              }}
            >
              <Text style={{ color: "gray" }}>Phone Number</Text>
              <TextInput
                style={{
                  width: "70%",
                  height: 40,
                  borderBottomWidth: 1,
                  borderRadius: 8,
                }}
                placeholder="Phone Number"
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#A2CFFE",
                  width: "80%",
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const Profile = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          marginTop: 5,
          marginBottom: 30,
          left: 10,
        }}
      >
        <Text style={{ fontSize: 15, marginTop: 5 }}>Current Balance:</Text>
        <View
          style={{
            width: 100,
            height: 30,
            backgroundColor: "#73c2fb",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 5,
            paddingLeft: 5,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>9234$</Text>
          <Ionicons
            name="add"
            size={26}
            color="gray"
            style={{ backgroundColor: "yellow", width: 30, height: 30, paddingLeft: 2 }}
            onPress={() => alert("asd")}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image
          style={{
            width: "50%",
            height: 170,
            borderRadius: 100,
          }}
          source={{
            uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
          }}
        />
      </View>
      <Text style={{ textAlign: "center", fontSize: 25, marginTop: 10 }}>
        Username
      </Text>
      <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
        example@gmial.com
      </Text>
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        My Social Networks:
      </Text>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "50%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <FontAwesome name="telegram" size={35} color="#6CC1E3" />
          <FontAwesome name="instagram" size={35} color="#F56004" />
          <FontAwesome name="youtube-play" size={35} color="#E62117" />
        </View>
      </View>
    </View>
  );
};
const Help = (props) => {
  return (
    <View>
      <Text>Help</Text>
    </View>
  );
};
const Example = () => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox value={isChecked} onValueChange={setChecked} />
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Profile"
        options={{
          headerShown: false,
          drawerIcon: () => {
            return <FontAwesome name="user-circle-o" size={24} color="black" />;
          },
        }}
        component={Profile}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => {
            return <Feather name="edit" size={24} color="black" />;
          },
        }}
        name="EditProfile"
        component={EditProfile}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => {
            return (
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={24}
                color="black"
              />
            );
          },
        }}
        name="Help"
        component={Help}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => {
            return (
              <MaterialCommunityIcons
                name="application-edit"
                size={24}
                color="black"
              />
            );
          },
        }}
        name="ApplicationScreen"
        component={ApplicationScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () => {
            return (
              <MaterialCommunityIcons
                name="application-edit"
                size={24}
                color="black"
              />
            );
          },
        }}
        name="Example"
        component={Example}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

export default ProfileScreen;
