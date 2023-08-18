import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Linking,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icons from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SimpleLineIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
// import DropDownPicker from "react-native-dropdown-picker";
import YoutubeIframe from "react-native-youtube-iframe";

const Stack = createStackNavigator();
supportedURL = 'https://markazback2.onrender.com/'

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export default function Home() {
const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Courses"
        component={ViewPage}
        options={{
          headerRight: () => {
            return (
              <FontAwesome5 name="cart-plus" size={26} marginRight={20} color="black" onPress={() => navigation.navigate('postPage')} />
            );
          },
        }}
      />
      <Stack.Screen name="Course" component={ViewPage2} />
      <Stack.Screen name="BonusPage" component={BonusPage} />
      <Stack.Screen name="ThemePage" component={ThemePage} />
      <Stack.Screen name="postPage" component={postPage} />
    </Stack.Navigator>
  );
}

const postPage = () => {
  return(
    <View>
    <Text>ad</Text>
    </View>
  )
}

const ThemePage = () => {
  const [categry, setCtgry] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const pages = async () => {
    var value = await AsyncStorage.getItem("subcategoryy");
    setCtgry(value);
  };
  useEffect(() => {
    axios.get("https://baisan.onrender.com/course/theme/").then((res) => {
      setCategoryData(res.data);
    });
    alert("hjk");
    pages();
  }, []);
  return (
    <View>
      {categoryData.map((item) => {
        if (item.subcategory === categry) {
          return (
            <View
              style={{
                width: "100%",
                backgroundColor: "red",
              }}
            >
              <Text>
                asd
                {item.name}
              </Text>
            </View>
          );
        } else {
          return <Text>haaa</Text>;
        }
      })}
    </View>
  );
};

const BonusPage = (props) => {
  const [courseid, setCourseid] = useState();
  const [category, setCategory] = useState([]);
  const [playing, setPlaying] = useState([]);
  useEffect(() => {
    const keyOlish = async () => {
      const courseId2 = await AsyncStorage.getItem("courseId");
      const tokenUser = await AsyncStorage.getItem("token");
    const parseToken = JSON.parse(tokenUser)

      axios
        .get(
          `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
          {
            headers: { Authorization: "Bearer " + parseToken },
          }
        )
        .then((res) => {
          console.log(res.data.one, "wqeretyui");
          const ishlas = res.data.all.filter((item) => (item ? item : "null"));
          setCategory(ishlas);
        });
    };
    keyOlish();
  }, []);
  return (
    <ScrollView>
      <View>
        {category.map((item) => {
          return (
            <View>
              {item.theme.map((item2) => {
                return (
                  <SafeAreaView style={{ width: "100%", marginTop: 10 }}>
                    <YoutubeIframe
                      width={"100%"}
                      height={200}
                      play={playing}
                      videoId={"l3zipB6nek8"}
                    />
                    <Text style={{ fontSize: 20, color: "black" }}>
                      {item2.name}
                    </Text>
                  </SafeAreaView>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const ViewPage = (props) => {
  const [course, setCourse] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const onRefresh = React.useCallback(() => {
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
    const parseToken = JSON.parse(tokenUser)
      
      // axios
      //   .get("https://markazback2.onrender.com/auth/oneuser", {
      //     headers: { Authorization: "Bearer " + tokenUser },
      //   })
      //   .then((ress) => {
      //     axios
      //       .get(`https://markazback2.onrender.com/api/mycourse/${item1.id}`, {
      //         headers: { Authorization: "Bearer " + tokenUser },
      //       })
      //       .then((res) => {
      //         axios
      //           .get("https://markazback2.onrender.com/api/course", {
      //             headers: { Authorization: "Bearer " + tokenUser },
      //           })
      //           .then((res2) => {
      //             var aa = [];
      //             ress.data.map((item1) => {
      //               res.data.map((item) => {
      //                 console.log(item, "asdasd");
      //                 res2.data.map((item2) => {
      //                   if (item.course === item2.id) {
      //                     aa.push(item2);
      //                     console.log(item2, "fghjk");
      //                   } else {
      //                     aa.push(null);
      //                   }
      //                 });
      //               });
      //               setCourse(aa);
      //             });
      //           });
      //       });
      //   });
      //   axios
      //     .get("https://markazback2.onrender.com/auth/oneuser", {
      //       headers: { Authorization: "Bearer " + tokenUser },
      //     })
      //     .then((res) => {
      //       var ism = 2;
      //       res.data.map((response) => {
      //         ism = response;
      //         console.log(response);
      //       });
      //       axios
      //         .get(`https://markazback2.onrender.com/api/mycourse/${ism.id}`, {
      //           headers: { Authorization: "Bearer " + tokenUser },
      //         })
      //         .then((res3) => {
      //           if (res3.data.length() < 0) {
      //             console.log('res3.data');
      //           } else {
      //             console.log(res3.data);
      //           }
      //           // res.data.map((item) => {
      //           //   res2.data.map((item2) => {
      //           //     res3.data.map((item3) => {
      //           //       console.log(item3);
      //           //       if (item3.course == item2.id) {
      //           //         console.log(item2, "yess");
      //           //       } else {
      //           //         // console.log("nooo");
      //           //         alert("vbhnjasd");
      //           //       }
      //           //     });
      //           //   });
      //           // });
      //         });
      //     });
      // };
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          res.data.map((item) => {
            axios
              .get(`https://markazback2.onrender.com/api/mycourse/${item.id}`, {
                headers: { Authorization: "Bearer " + parseToken },
              })
              .then((res2) => {
                // if (res2.data) {
                //   console.log(res2.data);
                // } else {
                //   console.log('no data!');
                // }
                res2.data.length < 1 ? setCourse(null) : setCourse(res2.data);
              });
          });
        });
    };
    setIsLoading(null);
    setRefreshing(true);
    setTimeout(() => {
      setIsLoading(1);
      setRefreshing(false);
    }, 2000);
    keyOlish();
  }, []);

  const getted = async (key) => {
    await AsyncStorage.setItem("courseId", JSON.stringify(key));
    // alert(key)
  };
  useEffect(() => {
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
    const parseToken = JSON.parse(tokenUser)

      // axios
      //   .get("https://markazback2.onrender.com/auth/oneuser", {
      //     headers: { Authorization: "Bearer " + tokenUser },
      //   })
      //   .then((ress) => {
      //     axios
      //       .get(`https://markazback2.onrender.com/api/mycourse/${item1.id}`, {
      //         headers: { Authorization: "Bearer " + tokenUser },
      //       })
      //       .then((res) => {
      //         axios
      //           .get("https://markazback2.onrender.com/api/course", {
      //             headers: { Authorization: "Bearer " + tokenUser },
      //           })
      //           .then((res2) => {
      //             var aa = [];
      //             ress.data.map((item1) => {
      //               res.data.map((item) => {
      //                 console.log(item, "asdasd");
      //                 res2.data.map((item2) => {
      //                   if (item.course === item2.id) {
      //                     aa.push(item2);
      //                     console.log(item2, "fghjk");
      //                   } else {
      //                     aa.push(null);
      //                   }
      //                 });
      //               });
      //               setCourse(aa);
      //             });
      //           });
      //       });
      //   });
      //   axios
      //     .get("https://markazback2.onrender.com/auth/oneuser", {
      //       headers: { Authorization: "Bearer " + tokenUser },
      //     })
      //     .then((res) => {
      //       var ism = 2;
      //       res.data.map((response) => {
      //         ism = response;
      //         console.log(response);
      //       });
      //       axios
      //         .get(`https://markazback2.onrender.com/api/mycourse/${ism.id}`, {
      //           headers: { Authorization: "Bearer " + tokenUser },
      //         })
      //         .then((res3) => {
      //           if (res3.data.length() < 0) {
      //             console.log('res3.data');
      //           } else {
      //             console.log(res3.data);
      //           }
      //           // res.data.map((item) => {
      //           //   res2.data.map((item2) => {
      //           //     res3.data.map((item3) => {
      //           //       console.log(item3);
      //           //       if (item3.course == item2.id) {
      //           //         console.log(item2, "yess");
      //           //       } else {
      //           //         // console.log("nooo");
      //           //         alert("vbhnjasd");
      //           //       }
      //           //     });
      //           //   });
      //           // });
      //         });
      //     });
      // };
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + parseToken },
        })
        .then((res) => {
          res.data.map((item) => {
            axios
              .get(`https://markazback2.onrender.com/api/mycourse/${item.id}`, {
                headers: { Authorization: "Bearer " + parseToken },
              })
              .then((res2) => {
                console.log(res2.data);
                // if (res2.data) {
                //   console.log(res2.data);
                // } else {
                //   console.log('no data!');
                // }
                res2.data.length < 1 ? setCourse(null) : setCourse(res2.data);
              });
          });
        });
    };
    setIsLoading(null);
    setRefreshing(true);
    setTimeout(() => {
      setIsLoading(1);
      setRefreshing(false);
    }, 2000);
    keyOlish();
  }, []);
  return (
    <ScrollView
      style={{}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isLoading === null ? (
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
        <SafeAreaView>
          {course == null ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                }}
                style={{ width: "100%", height: 300 }}
              />
              <Text>No Course</Text>
              <View style={{ position: 'relative' }}>
                <Button title='Course sotib olish' />
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
              </View>
            </View>
          ) : (
            <View>
              {course.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("Course");
                      getted(item.id);
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        backgroundColor: "#fff",
                      }}
                    >
                      {item.image == null ? (
                        <View
                          style={{
                            flexDirection: "row",
                            padding: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{
                              uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                            }}
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 100,
                              shadowColor: "#000",
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            padding: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: `${item.image}` }}
                            style={{ width: "100%", height: 200 }}
                          />
                        </View>
                      )}
                      <Text style={{ fontSize: 17, padding: 10 }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "65%",
                          padding: 10,
                        }}
                      >
                        <View>
                          <Text style={{ color: "gray", fontSize: 15 }}>
                            Kurs hajmi:
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                            }}
                          >
                            {item.planned_time}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ color: "gray", fontSize: 15 }}>
                            Price:
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                            }}
                          >
                            {item.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

const ViewPage2 = (props) => {
  const [courseid, setCourseid] = useState();
  const [category, setCategory] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: "Apple", value: "apple" },
  //   { label: "Banana", value: "banana",onpress: () => {alert('he')} },
  // ]);
  // useEffect(() => {
  //   axios.get('https://baisan.onrender.com/course/ /').then(res => {
  //     // const res2 = res.data.filter(item => item.id == courseid)
  //     if (res.data.id == courseid) {
  //       // console.log(res.data);
  //       setCategory(res.data)
  //     } else {
  //       setCategory(null)
  //     }
  //   })
  //   getted()
  // }, [])
  useEffect(() => {
    const keyOlish = async () => {
      const courseId2 = await AsyncStorage.getItem("courseId");
      const tokenUser = await AsyncStorage.getItem("token");
    const parseToken = JSON.parse(tokenUser)

      axios
        .get(
          `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
          {
            headers: { Authorization: "Bearer " + parseToken },
          }
        )
        .then((res) => {
          const ishlas = res.data.all.filter((item) => (item ? item : "null"));
          setCategory(ishlas);

          // if (res.data.all) {
          //   console.log("null");
          // } else {
          //   console.log(res.data.all, "res.data.all2");
          // }
        });
      // const tokenUser = await AsyncStorage.getItem("token");
      // var value = await AsyncStorage.getItem("courseId");
      // // setCourseid(value);
      // console.log(value, 'valueeeee');
      // console.log(tokenUser);
      // axios
      //   .get(
      //     `https://markazback2.onrender.com/api/course_data_category/course/${value}/`,
      //     {
      //       headers: { Authorization: "Bearer " + tokenUser },
      //     }
      //   )
      //   .then((res) => {
      //     setCategory(res.data.all);
      //   });
    };
    keyOlish();
  }, []);
  const posted2 = async (key) => {
    await AsyncStorage.setItem("keyCategorys", JSON.stringify(key));
  };
  return (
    <ScrollView style={{ backgroundColor: "white", paddingTop: 10 }}>
      <View
        style={
          category == ""
            ? { display: "block" }
            : { display: "none", padding: 10 }
        }
      >
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/004/968/529/original/search-no-results-found-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-with-editable-stroke-line-outline-linear-vector.jpg",
          }}
          style={{ width: "100%", height: 250 }}
        />
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 30 }}>
          No results this type!
        </Text>
      </View>
      <View>
        {category.map((item) => {
          return (
            <TouchableOpacity
              style={
                item == ""
                  ? { display: "none" }
                  : { display: "block", margin: 10 }
              }
              onPress={() => {
                props.navigation.navigate(BonusPage);
                posted2(item.id);
              }}
            >
              {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              /> */}
              <View
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "dodgerblue",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
