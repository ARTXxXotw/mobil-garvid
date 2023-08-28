import { View, Text, ScrollView, Image, Button, Linking } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
const Stack = createStackNavigator();
const NewsPage = (props) => {
  const [News, setNews] = useState([]);

  useEffect(() => {
    const News = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
     
       console.log(tokenUser);
      axios
        .get("https://markazback2.onrender.com/api/knowladge", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setNews(res.data);
          console.log(res.data);
        });
    };

    News();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#F0F7FA",
        }}
      >
        {News.map((item) => {
          return (
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                marginTop: 15,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                padding: 10,
              }}
            >
              <AntDesign
                name="banckward"
                onPress={() => {
                  props.navigation.navigate("NewsScreen");
                  const postAsync = async () => {
                    await AsyncStorage.setItem(
                      "newsId",
                      JSON.stringify(item.id)
                    );
                  };
                  postAsync();
                }}
                style={{
                  zIndex: 2,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  color: "black",
                  opacity: 0,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 5,
                  color: "#0087CB",
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 16,
                    fontFamily: "sans-serif-light",
                    fontWeight: "normal",
                    color: "black",
                    paddingBottom: 10,
                  }}
                  numberOfLines={1}
                >
                  {item.description}
                </Text>
                {item.image == null ? (
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                      marginBottom: 10,
                    }}
                    source={{
                      uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                    }}
                  />
                ) : (
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                      marginBottom: 10,
                    }}
                    source={{ uri: `${item.image}` }}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
const NewsScreen = (props) => {
  const [news, setNews] = useState([]);
  const [supportedURL, setSupportedURL] = useState("https://google.com");

  // const supportedURL = "https://google.com";
  const unsupportedURL = "slack://open?team=123456";
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };
  useEffect(() => {
    const ax = async () => {
      var newsid = await AsyncStorage.getItem("newsId");
      var tokenUser = await AsyncStorage.getItem("token");
 
      axios
        .get(`https://markazback2.onrender.com/api/knowladge/${newsid}`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setNews(res.data);
          res.data.map((item) => {
            setSupportedURL(item.link);
          });
        });
    };
    ax();
  }, []);
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#F0F7FA",
        height: "100%",
      }}
    >
      {news.map((item) => {
        return (
          <View>
            {item.image == null ? (
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  marginBottom: 10,
                }}
                source={{
                  uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                }}
              />
            ) : (
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  marginBottom: 10,
                }}
                source={{ uri: `${item.image}` }}
              />
            )}
            <Text
              style={{
                fontSize: 22,
                marginHorizontal: 5,
                color: "black",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: 20,
                fontFamily: "sans-serif-light",
                fontWeight: "normal",
                color: "black",
                paddingBottom: 10,
              }}
            >
              {item.description}
            </Text>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  zIndex: 3,
                }}
              >
                <OpenURLButton url={supportedURL}>
                  Open Supported URL
                </OpenURLButton>
              </View>
              <Text
                style={{
                  marginHorizontal: 5,
                  fontSize: 18,
                  fontFamily: "sans-serif-light",
                  fontWeight: "normal",
                  color: "blue",
                }}
                url={supportedURL}
              >
                {item.link}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
const News = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsPage"
        options={{ headerShown: false }}
        component={NewsPage}
      />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
    </Stack.Navigator>
  );
};
export default News;

// import React, {useCallback} from 'react';
// import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

// const supportedURL = 'https://google.com';

// const unsupportedURL = 'slack://open?team=123456';

// const OpenURLButton = ({url, children}) => {
//   const handlePress = useCallback(async () => {
//     // Checking if the link is supported for links with custom URL scheme.
//     const supported = await Linking.canOpenURL(url);

//     if (supported) {
//       // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//       // by some browser in the mobile
//       await Linking.openURL(url);
//     } else {
//       Alert.alert(`Don't know how to open this URL: ${url}`);
//     }
//   }, [url]);

//   return <Button title={children} onPress={handlePress} />;
// };

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
//       <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;
