import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [course, setCourse] = useState([]);
  const [sertificat, setSertificat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getItem = async () => {
      var tokenUser = await AsyncStorage.getItem("token");
      axios
        .get("https://markazback2.onrender.com/api/course", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setCourse(res.data);
          axios
            .get("https://markazback2.onrender.com/api/cours_types", {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res2) => {
              var aa = [];
              for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < res2.data.length; j++) {
                  if (res.data[i].course_type == res2.data[j].id) {
                    res.data[i].course_typename = res2.data[j].name;
                  }
                }
              }
              setSertificat(res.data);
            });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getItem();
  }, []);

  const searchCourse = async(text) => {
    var tokenUser = await AsyncStorage.getItem("token");
    course.map(item => {
      if (text.includes(item.course_typename)) {
        console.log(item.course_typename);
      }
    })
  }

  return (
    <View style={{ marginBottom: 100 }}>
      {isLoading == true ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 100,
            }}
            size="big"
            color="#0000ff"
          />
        </View>
      ) : (
        <View>
          <View style={{ width: "100%", marginTop: 10 }}>
            <TextInput
              placeholder="Поиск.."
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#D9D9D9",
                borderRadius: 8,
                paddingHorizontal: 10,
                color: "black",
              }}
              onChangeText={(text) => searchCourse(text)}
            />
          </View>
          <FlatList
            style={{ marginTop: 10 }}
            data={course}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={{ width: "50%", margin: 1 }}>
                <View
                  style={{
                    position: "absolute",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    top: 60,
                    // left: 60,
                    zIndex: 10,
                    width: "90%",
                  }}
                >
                  <Text
                    style={{ fontSize: 20, color: "white", fontWeight: 100 }}
                    numberOfLines={1}
                  >
                    {item.course_typename}
                  </Text>
                </View>
                {/*item.image == null ? (
                  <Image
                    style={{ width: "100%", height: 150 }}
                    source={{
                      uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                    }}
                  />
                ) : (
                  <Image
                    style={{ width: "100%", height: 150 }}
                    source={{
                      uri: "https://markazback2.onrender.com" + item.image,
                    }}
                  />
                  )*/}
                <View style={{ margin: 1 }}>
                  <Image
                  // blurRadius={5}
                    style={{ width: "95%", height: 185 }}
                    source={require("../../img/Course.png")}
                  />
                </View>

                <View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#1A2AB426",
                        padding: 5,
                        width: "30%",
                        height: 40,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                      }}
                    >
                      <Text>Купить</Text>
                    </View>
                    <Text style={{ width: "50%", textAlign: "center" }}>
                      -500.000-
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
});

export default HomeScreen;
