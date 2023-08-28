import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

const url = "https://markazback2.onrender.com/";

const HelpPage = ({navigation, key}) => {
  const [Help, setHelp] = useState([]);

  useEffect(() => {
    // alert('uyf')
    const Help1 = async () => {
      const tokenUser = await AsyncStorage.getItem("token");

      axios
        .get("https://markazback2.onrender.com/api/help/", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setHelp(res.data);
          console.log(res.data);
        });
    };
    Help1();
  }, []);
  const [collapsed, setCollapsed] = React.useState();
  const toggleExpand = () => {
    setCollapsed(!collapsed);
  };
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View>
        <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>Здравствуйте, чем мы можем вам помочь?</Text>
        <View
          style={{
            // flexDirection: "row",
            // flexWrap: "wrap",
            // justifyContent: "space-between",
            padding: 10,
            width: "100%",
          }}
        >
          <FlatList
          // key={key}
            data={Help}
            numColumns={2}
            renderItem={({ item }) => (
              <View
                style={{ width: "50%", margin: 1, elevation: 2, padding: 5 }}
              >
                <Image
                  source={{
                    uri: "https://cdn2.iconfinder.com/data/icons/web-mobile-1/64/information_web_mobile_info_button_help_faq-512.png",
                  }}
                  style={{ width: "100%", height: 145 }}
                />
                <Text style={{ textAlign: 'center' }}>{item.title}</Text>
                <AntDesign
                name="banckward"
                onPress={() => {
                  navigation.navigate("HelpScreen");
                  const postAsync = async () => {
                    // alert(item.id);
                    await AsyncStorage.setItem(
                      "helpId",
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
                  // backgroundColor: "red",
                  color: "black",
                  opacity: 0,
                }}
              />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          {/*
          Help.map(item => {
            return (
              <View style={{ width: '50%',margin: 1, elevation: 2, padding: 5 }}>
              <Image
                source={{
                  uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                }}
                style={{ width: "100%", height: 150 }}
              />
              <Text>{item.title}</Text>
            </View>              
            )
          })
        */}
        </View>
      </View>
      {/* <View
        style={{
          marginTop: 10,
          padding: 7,
          // backgroundColor:'blue'
        }}
      >
        {Help.map((item) => {
          return (
            <View
              style={{
                width: "100%",
                // height: 40,
                // backgroundColor: "white",
                borderRadius: 10,
                marginTop: 5,
                elevation: 1,
                // shadowColor: "#C1DEF0",
              }}
            >
                <AntDesign
                  name="banckward"
                  onPress={() => {
                    props.navigation.navigate("HelpScreen");
                    const postAsync = async () => {
                      // alert(item.id);
                      await AsyncStorage.setItem(
                        "helpId",
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
                    // backgroundColor: "red",
                    color: "black",
                    opacity: 0,
                  }}
                />
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
                  source={{
                    uri: `${item.image}`,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 15,
                  paddingTop: 5,
                  color: "dodgerblue",
                }}
              >
                {item.title} ?...
              </Text>
            </View>
          );
        })}
      </View> */}
    </ScrollView>
  );
};
const HelpScreen = (props) => {
  const [help, setHelp] = useState([]);
  useEffect(() => {
    const hj = async () => {
      var helpid = await AsyncStorage.getItem("helpId");
      var tokenUser = await AsyncStorage.getItem("token"); 

      axios
        .get(`https://markazback2.onrender.com/api/help/${helpid}`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setHelp(res.data);
        });
    };
    hj();
  }, []);
  return (
    <ScrollView
      style={{
        padding: 10,
      }}
    >
      {help.map((item) => {
        return (
          <Text
            style={{
              color: "black",
              fontSize: 17,
            }}
          >
            {item.title}
            {item.description}
          </Text>
        );
      })}
    </ScrollView>
  );
};
const HelpScreen2 = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HelpPage"
        options={{ headerShown: false }}
        component={HelpPage}
      />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
    </Stack.Navigator>
  );
};

export default HelpScreen2;
