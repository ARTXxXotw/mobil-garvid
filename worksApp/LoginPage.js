import { StatusBar } from "expo-status-bar";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [state, setState] = useState(null);
  const [username, setUsername] = useState("halilovabdurahim13@gmail.com");
  const [password, setPassword] = useState("0");
  const height = Dimensions.get("window");
  const getLocal = async () => {
    var value = await AsyncStorage.getItem("token");
    if (value) {
      setState(2);
      console.log(value);
    } else {
      setState(null); //null
    }
  };
  useEffect(() => {
    getLocal();
    // console.log(height.height);
  });
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
    var a = await axios.post("https://markazback2.onrender.com/auth/login", {
      email: username,
      password: password,
    });
    a.data.access
      ? (alert("Succes"),
        setState(2),
        await AsyncStorage.setItem("token", a.data.access))
      : alert("Bunday shaxs yoq");

    console.log(a.data);
  };
  return (
        <View>
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
                  // onChange={(event) => setUsername(event.nativeEvent.value)}
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
                  // onChange={(text) => setPassword(text)}
                  onChangeText={handleChangePassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <Text>{username + " " + password}</Text>
            <Button title="Вход" onPress={onSave} />
          </View>
        </View>
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
