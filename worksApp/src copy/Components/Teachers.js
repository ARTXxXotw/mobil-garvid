import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import filter from "lodash.filter";

const Stack = createStackNavigator();

const TeachersPage = (props, key) => {
  const [teachers, setTeachers] = useState([]);
  const [teachers2, setTeachers2] = useState([]);
  const pages = async () => {
    var tokenUser = await AsyncStorage.getItem("token");
    const parseToken = JSON.parse(tokenUser)
    axios
      .get("https://markazback2.onrender.com/auth/teachers", {
        headers: { Authorization: "Bearer " + parseToken },
      })
      .then((res) => {
        setTeachers(res.data);
        setTeachers2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    pages();
  }, []);
  const searchTeach = (text) => {
    const ishlas = teachers.filter(
      (teacher) =>
        teacher.username.includes(text) ||
        teacher.email.includes(text) ||
        teacher.phone_number.includes(text)
    );
    if (text) {
      setTeachers(ishlas);
    } else {
      setTeachers(teachers2);
    }
  };
  return (
    <ScrollView style={{ padding: 5 }} key={key}>
      <TextInput
        style={{
          borderWidth: 1,
          width: "100%",
          height: 40,
          borderRadius: 10,
          paddingLeft: 10,
          borderColor: "gray",
        }}
        placeholder="Search"
        onChangeText={(text) => searchTeach(text)}
      />
      {teachers.map((item) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Teacher");
              AsyncStorage.setItem("OneTeacher", JSON.stringify(item.id));
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {item.image ? (
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 40,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: `${item.image}`,
                  }}
                />
              ) : (
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 40,
                    marginBottom: 10,
                  }}
                  source={{
                    uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                  }}
                />
              )}
              <View
                style={{
                  width: "53%",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "bold", fontSize: 17 }}
                >
                  {item.username}
                </Text>
                <Text numberOfLines={1} style={{ fontSize: 14 }}>
                  {item.email}
                </Text>
              </View>
              <View></View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

// const TeachersPage = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     const page = async () => {
//       const request = axios.CancelToken.source();
//       var tokenUser = await AsyncStorage.getItem("token");
//       var options = {
//         method: "GET",
//         url: "https://markazback2.onrender.com/auth/teachers",
//         params: { q: searchText },
//         headers: {
//           Authorization: "Bearer " + tokenUser,
//         },
//         CancelToken: request.token
//       };
//       axios.request(options).then(res => {
//         console.log('res', res); // hato
//         setData(res.data.results)
//       }).catch(err => {
//         console.log(err);
//       })

//       return () => {
//         request.cancel()
//       }
//     };
//     page()
//   }, [searchText]);

//   return (
//     <View>
//       <TextInput placeholder="search" value={searchText} onChangeText={(text) => {
//         setSearchText(text)
//       }}/>
//       <FlatList
//         data={data}
//         renderItem={({item, index}) => {
//           return (
//             <View>
//               <Text>{item.username}</Text>
//             </View>
//           )
//         }}
//        />
//     </View>
//   )
// };

const OneTeacher = (props) => {
  const [teacher, setTeacher] = useState([]);
  const [following, setFollowing] = useState(null);
  const [followings, setFollowings] = useState();
  const [fullUser, setFullUser] = useState(null);
  const [mapTeacher, setMapTeacher] = useState(null);
  const [mapUser, setMapUser] = useState(null);
  const [forTeacher, setForTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [unfollowId, setUnfollowId] = useState();

  const [teacherSecure, setTeacherSecure] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    const getted = async () => {
      var tokenTeach = await AsyncStorage.getItem("OneTeacher");
      const tokenUser = await AsyncStorage.getItem("token");
      const parseToken = JSON.parse(tokenUser)

      axios
        .get(`https://markazback2.onrender.com/auth/teacher/${tokenTeach}/`, {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          setTeacher(res.data);
          res.data.map((item) => {
            setMapTeacher(item);
          });
          //   axios
          //     .get("https://markazback2.onrender.com/api/follow", {
          //       headers: { Authorization: "Bearer " + tokenUser },
          //     })
          //     .then((res2) => {
          //       axios
          //         .get("https://markazback2.onrender.com/auth/oneuser", {
          //           headers: { Authorization: "Bearer " + tokenUser },
          //         })
          //         .then((res3) => {
          //           var bb = []
          //             res3.data.map(item => {
          //               res2.data.map(item2 => {
          //                 if (item.id === item2.minuser) {
          //                 bb.push(item2)
          //               } else {
          //                 bb.push(null)
          //                 console.log('helo');
          //               }
          //               })
          //             })
          //             setFollowings(bb)
          //         });
          //     });
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`https://markazback2.onrender.com/auth/oneuser`, {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          res.data.map((item) => {
            setFullUser(item);
          });
        });

      axios
        .get("https://markazback2.onrender.com/api/follow", {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          axios
            .get(`https://markazback2.onrender.com/auth/oneuser`, {
              headers: { Authorization: "Bearer " + parseToken },
            })
            .then((res2) => {
              axios
                .get(
                  `https://markazback2.onrender.com/auth/teacher/${tokenTeach}/`,
                  {
                    headers: { Authorization: "Bearer " + parseToken },
                  }
                )
                .then((res3) => {
                  res.data.map((item) => {
                    res2.data.map((item2) => {
                      res3.data.map((item3) => {
                        if (
                          item.minuser == item2.id &&
                          item.topuser == item3.id
                        ) {
                          setFollowings(1);
                          setUnfollowId(item.id);
                        } else {
                          setFollowings(null);
                        }
                      });
                    });
                  });
                });
            });
        });
    };
    setIsLoading(null);
    setTimeout(() => {
      setIsLoading(1);
    }, 2000);
    getted();
  }, []);
  useEffect(() => {
    // console.log('helo');
    const getted = async () => {
      var tokenTeach = await AsyncStorage.getItem("OneTeacher");
      const tokenUser = await AsyncStorage.getItem("token");
      const parseToken = JSON.parse(tokenUser)

      axios
        .get(`https://markazback2.onrender.com/auth/teacher/${tokenTeach}/`, {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          setTeacher(res.data);
          res.data.map((item) => {
            setMapTeacher(item);
          });
          //   axios
          //     .get("https://markazback2.onrender.com/api/follow", {
          //       headers: { Authorization: "Bearer " + tokenUser },
          //     })
          //     .then((res2) => {
          //       axios
          //         .get("https://markazback2.onrender.com/auth/oneuser", {
          //           headers: { Authorization: "Bearer " + tokenUser },
          //         })
          //         .then((res3) => {
          //           var bb = []
          //             res3.data.map(item => {
          //               res2.data.map(item2 => {
          //                 if (item.id === item2.minuser) {
          //                 bb.push(item2)
          //               } else {
          //                 bb.push(null)
          //                 console.log('helo');
          //               }
          //               })
          //             })
          //             setFollowings(bb)
          //         });
          //     });
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`https://markazback2.onrender.com/auth/oneuser`, {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          res.data.map((item) => {
            setFullUser(item);
          });
        });

      axios
        .get("https://markazback2.onrender.com/api/follow", {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          axios
            .get(`https://markazback2.onrender.com/auth/oneuser`, {
              headers: { Authorization: "Bearer " + parseToken },
            })
            .then((res2) => {
              axios
                .get(
                  `https://markazback2.onrender.com/auth/teacher/${tokenTeach}/`,
                  {
                    headers: { Authorization: "Bearer " + parseToken },
                  }
                )
                .then((res3) => {
                  res.data.map((item) => {
                    res2.data.map((item2) => {
                      res3.data.map((item3) => {
                        if (
                          item.minuser == item2.id &&
                          item.topuser == item3.id
                        ) {
                          setFollowings(1);
                          setUnfollowId(item.id);
                        } else {
                          setFollowings(null);
                        }
                      });
                    });
                  });
                });
            });
        });
    };
    setIsLoading(null);
    setTimeout(() => {
      setIsLoading(1);
    }, 2000);
    getted();
  }, []);

  const followingUser = async () => {
    // console.log(mapTeacher.id, 'hello');
    const tokenUser = await AsyncStorage.getItem("token");
    const parseToken = JSON.parse(tokenUser)

    var data = {
      topuser: mapTeacher.id,
      minuser: fullUser.id,
    };
    // console.log(data);
    axios
      .post("https://markazback2.onrender.com/api/follow", data, {
        headers: { Authorization: "Bearer " + parseToken },
      })
      .then((res) => {
        alert("succes");
        setFollowings(1);
      })
      .catch((err) => {
        alert("no!");
        setFollowings(null);
        // console.log(err);
      });
  };

  const unFollowing = async () => {
    const tokenUser = await AsyncStorage.getItem("token");
    const parseToken = JSON.parse(tokenUser)

    axios
      .delete(`https://markazback2.onrender.com/api/follow/${unfollowId}`, {
        headers: { Authorization: "Bearer " + parseToken },
      })
      .then((res) => {
        //  alert('succes')
        setFollowings(null);
      })
      .catch((error) => {
        alert("noooo!");
        setFollowings(1);
      });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isLoading == null ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{
              uri: "https://www.kingsubash.com/assets/img/sample-loader.gif",
            }}
            style={{ width: "100%", height: 520 }}
          />
        </View>
      ) : (
        <View>
          {teacher.map((item) => {
            return (
              <View style={styles.contain}>
                <View style={styles.flex}>
                  {item.image ? (
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.image}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg",
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{ textAlign: "center", fontSize: 25, color: "black" }}
                >
                  {item.username}
                </Text>
                {item.description ? (
                  <Text style={{ fontSize: 13, color: "black", marginTop: 20 }}>
                    Description:
                    <Text style={{ fontSize: 16 }}>
                      &nbsp;{item.description}
                    </Text>
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "black",
                      marginTop: 20,
                    }}
                  >
                    No Description!
                  </Text>
                )}
                <View>
                  {followings == null ? (
                    <Button onPress={() => followingUser()} title="Following" />
                  ) : (
                    <Button
                      onPress={
                        () => unFollowing()
                        //   {
                        //   Alert.alert(
                        //     `You serius unfollowing this teacher: ${item.username}`,
                        //     " ",
                        //     [
                        //       { text: "Yes", onPress: () => unFollowing() },
                        //       { text: "No" },
                        //     ]
                        //   );
                        // }
                      }
                      title="Unfollowing"
                      color={"red"}
                    />
                  )}
                  {/* {following === null ? (
                  <Button onPress={() => followingUser()} title="Following" />
                ) : (
                  <Button
                    onPress={() => {
                      Alert.alert(
                        `You serius unfollowing this teacher: ${item.username}`,
                        " ",
                        [
                          { text: "Yes", onPress: () => setFollowing(null) },
                          { text: "No", onPress: () => setFollowing(1) },
                        ]
                      );
                    }}
                    title="Unfollowing"
                    color={"red"}
                  />
                )} */}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 40,
                  }}
                >
                  <View
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>Following:</Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      20
                    </Text>
                  </View>
                  <View
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Text style={{ fontSize: 15, fontFamily: "" }}>
                      Courses:
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      12
                    </Text>
                  </View>
                  <View
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Text style={{ fontSize: 15, fontFamily: "" }}>
                      Sertificates:
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      3
                    </Text>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "95%",
                      padding: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png",
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        marginRight: 5,
                      }}
                    />
                    <View
                      style={{
                        maxWidth: "85%",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        HTML
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Animi, voluptate?
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "95%",
                      padding: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png",
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        marginRight: 5,
                      }}
                    />
                    <View
                      style={{
                        maxWidth: "85%",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        CSS
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Animi, voluptate?
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "95%",
                      padding: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://blog.logrocket.com/wp-content/uploads/2021/02/machine-learning-libraries-javascript.png",
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        marginRight: 5,
                      }}
                    />
                    <View
                      style={{
                        maxWidth: "85%",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        JS
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Animi, voluptate?
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "95%",
                      padding: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.png",
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        marginRight: 5,
                      }}
                    />
                    <View
                      style={{
                        maxWidth: "85%",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        JAVA
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Animi, voluptate?
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const Teachers = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Teachers" component={TeachersPage} />
      <Stack.Screen name="Teacher" component={OneTeacher} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  contain: {
    width: "100%",
    minHeight: 300,
    padding: 10,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddngVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "gray",
  },
});

export default Teachers;
