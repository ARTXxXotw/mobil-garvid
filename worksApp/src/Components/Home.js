import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icons from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  SimpleLineIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
// import DropDownPicker from "react-native-dropdown-picker";
import YoutubeIframe from "react-native-youtube-iframe";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";

const Stack = createStackNavigator();
supportedURL = "https://markazback2.onrender.com/";

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
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Courses"
        component={ViewPage}
        options={{
          headerRight: () => {
            return (
              <FontAwesome5
                name="cart-plus"
                size={26}
                marginRight={20}
                color="black"
                onPress={() => navigation.navigate("postPage")}
              />
            );
          },
        }}
      />
      <Stack.Screen name="Course" component={ViewPage2} />
      <Stack.Screen name="BonusPage" component={BonusPage} />
      <Stack.Screen name="ThemePage" component={ThemePage} />
      <Stack.Screen name="postPage" component={postPage} />
      <Stack.Screen name="EditCourse" component={EditPage} />
      <Stack.Screen name="postCategory" component={postCategory} />
      <Stack.Screen name="AddTheme" component={AddTheme} />
    </Stack.Navigator>
  );
}

const postCategory = () => {
  const [state, setState] = useState();
  const [name, setName] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const gett = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      const value = await AsyncStorage.getItem("courseId");
      // console.log(value);
      axios
        .get(`https://markazback2.onrender.com/api/course`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          var aa = [];
          res.data.ma((item) => {
            if (item.course == value) {
              aa.push(item);
            }
          });
          setState(aa);
        });
    };
    gett();
  }, []);

  const postData = async () => {
    const tokenUser = await AsyncStorage.getItem("token");
    const value = await AsyncStorage.getItem("courseId");
     axios
      .post(
        `https://markazback2.onrender.com/api/course_data_category`,
        {
          name: name,
          course: value,
        },
        {
          headers: { Authorization: "Bearer " + tokenUser },
        }
      )
      .then((res) => {
        alert('category qo"shildi');
        navigation.navigate("Course");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text style={{ fontSize: 18, paddingBottom: 10 }}>Add new category</Text>
      <TextInput
        placeholder="write here!"
        style={{
          borderWidth: 1,
          borderColor: "gray",
          width: "100%",
          height: 50,
          borderRadius: 8,
          paddingLeft: 10,
        }}
        onChangeText={(text) => setName(text)}
      />
      <View style={{ width: "100%", marginTop: 10 }}>
        <Button title="Post category" onPress={() => postData()} />
      </View>
    </View>
  );
};

const postPage = () => {
  const [courseType, setCourseType] = useState("");
  const [courseType2, setCourseType2] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [selecteCourse, setSelecteCourse] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [planned_time, setPlanned_time] = useState("");
  const [course_type, setCourse_type] = useState("");
  const [author, setAuth] = useState("");
  const [image, setImage] = useState(null);
  const [selectid, setSelectid] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const keyOlish = async () => {
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .get("https://markazback2.onrender.com/api/cours_types", {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        const courseTypes = res.data.map((item) => item.name);
        const courseTypes2 = res.data.map((item) => item.id);
        setCourseType(courseTypes);
        setCourseType2(courseTypes2);
        console.log(courseTypes, "asd");
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://markazback2.onrender.com/auth/oneuser", {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        res.data.map((item) => {
          setUser(item.id);
        });
      });
  };
  useEffect(() => {
    keyOlish();
  }, []);
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result.uri, "this is result");
    if (!result.canceled) {
      setImage(result.uri);
    }
  };
  const postEd = async () => {
    var Formsssss = {
      name: name,
      description: description,
      price: price,
      planned_time: planned_time,
      course_type: selectid,
      author: user,
      image: image,
      sertificat_id: 1,
    };
    // console.log(selectid, 'k');
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .post("https://markazback2.onrender.com/api/course", Formsssss, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        alert("Course Added Successfully");
        navigation.navigate("Courses");
      })
      .catch((err) => {
        alert("Ma'lumot yetarli emas!");
      });
  };
  const searchApi = async (key) => {
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .get("https://markazback2.onrender.com/api/cours_types", {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        res.data.map((item, key2) => {
          if (key == key2) {
            setSelectid(item.id);
            console.log(item.id);
          }
        });
      });
  };
  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView style={{ width: "100%", padding: 10 }}>
        <Text>name</Text>
        <TextInput
          placeholder="name"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          onChangeText={(text) => setName(text)}
        />
        <Text>description</Text>
        <TextInput
          placeholder="description"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          onChangeText={(text) => setDescription(text)}
        />
        <Text>price</Text>
        <TextInput
          placeholder="price"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />
        <Text>planned_time</Text>
        <TextInput
          placeholder="planned_time"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          keyboardType="numeric"
          onChangeText={(text) => setPlanned_time(text)}
        />
        {/* <Text>sertificat_description</Text>
        <TextInput
          placeholder="sertificat_description"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          onChangeText={(text) => setser(text)}
        />*/}
        <Text>cours_types</Text>
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SelectDropdown
            // onBlur={() => searchApi()}
            data={courseType}
            onSelect={(selectedItem, index) => {
              searchApi(index);
              setSelecteCourse(index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        <Text>image</Text>
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => pickImage()} style={{ width: "100%" }}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 150,
                  borderWidth: 2,
                  borderColor: "red",
                }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 150,
                  backgroundColor: "gray",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Add image</Text>
              </View>
            )}
          </Pressable>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Button
            style={{ marginBottom: 20 }}
            title="Add"
            onPress={() => postEd()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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

const BonusPage = ({ navigation }) => {
  const [courseid, setCourseid] = useState();
  const [category, setCategory] = useState([]);
  const [playing, setPlaying] = useState([]);
  useEffect(() => {
    const keyOlish = async () => {
      const courseId2 = await AsyncStorage.getItem("courseId");
      const tokenUser = await AsyncStorage.getItem("token");

      axios
        .get(
          `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
          {
            headers: { Authorization: "Bearer " + tokenUser },
          }
        )
        .then((res) => {
          const ishlas = res.data.all.filter((item) => (item ? item : null));
          setCategory(ishlas);
          ishlas.map((item) => {
            console.log(item.theme);
            if (item.theme.length == 0) {
              setCategory(null);
            } else {
              console.log("item2");
              item.theme.map((item2) => {
                setCategory(item2);
                console.log(item2, "itemm");
              });
            }
          });
        });
    };
    keyOlish();
  }, []);
  return (
    <ScrollView>
      {category === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
            }}
          />
          <Text>No Theme!</Text>
          <View style={{ width: "70%" }}>
            <Button
              title="Add Theme!"
              onPress={() => navigation.navigate("AddTheme")}
            />
          </View>
        </View>
      ) : (
        <View>
          {category.map((item) => {
            return (
              <View>
                {item.theme == null ? (
                  <View>
                    <Text>No Theme!</Text>
                  </View>
                ) : (
                  <ScrollView>
                    <Text>hj</Text>
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
                  </ScrollView>
                )}
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const EditPage = () => {
  const [courseType, setCourseType] = useState("");
  const [courseType2, setCourseType2] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [selecteCourse, setSelecteCourse] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [planned_time, setPlanned_time] = useState("");
  const [course_type, setCourse_type] = useState("");
  const [author, setAuth] = useState("");
  const [image, setImage] = useState(null);
  const [selectid, setSelectid] = useState(null);
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const getted = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      const key = await AsyncStorage.getItem("courseId");
      axios
        .get(`https://markazback2.onrender.com/api/course/${key}`, {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          setCourse(res.data);
          res.data.map((item) => {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
            setPlanned_time(item.planned_time);
            setImage(item.image);
            // setCourseType(item.courseType)
          });
        });
      axios
        .get("https://markazback2.onrender.com/api/cours_types", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          const courseTypes = res.data.map((item) => item.name);
          const courseTypes2 = res.data.map((item) => item.id);
          setCourseType(courseTypes);
          setCourseType2(courseTypes2);
          console.log(courseTypes, "asd");
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          res.data.map((item) => {
            setUser(item.id);
          });
        });
    };
    getted();
  }, []);
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result.uri, "this is result");
    if (!result.canceled) {
      setImage(result.uri);
      console.log(result);
    }
  };
  const searchApi = async (key) => {
    const tokenUser = await AsyncStorage.getItem("token");
    axios
      .get("https://markazback2.onrender.com/api/cours_types", {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        res.data.map((item, key2) => {
          if (key == key2) {
            setSelectid(item.id);
            console.log(item.id);
          }
        });
      });
  };
  const postEd = async () => {
    const key = await AsyncStorage.getItem("courseId");
    var Formsssss = {
      name: name,
      description: description,
      price: price,
      planned_time: planned_time,
      image: image,
      course_type: selectid,
      author: key,
    };
    const tokenUser = await AsyncStorage.getItem("token");
    // console.log(key, 'k');

    axios
      .put(`https://markazback2.onrender.com/api/course/${key}`, Formsssss, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        alert("Course Added Successfully");
        navigation.navigate("Courses");
      })
      .catch((err) => {
        alert("Ma'lumot yetarli emas!");
      });
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView style={{ width: "100%", padding: 10 }}>
        <Text>name</Text>
        <TextInput
          placeholder="name"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text>description</Text>
        <TextInput
          placeholder="description"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <Text>price</Text>
        <TextInput
          placeholder="price"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
          value={price}
        />
        <Text>planned_time</Text>
        <TextInput
          placeholder="planned_time"
          style={{
            paddingLeft: 10,
            borderRadius: 8,
            width: "100%",
            height: 40,
            borderWidth: 1,
          }}
          keyboardType="numeric"
          onChangeText={(text) => setPlanned_time(text)}
          value={planned_time}
        />
        <Text>cours_types</Text>
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SelectDropdown
            data={courseType}
            onSelect={(selectedItem, index) => {
              searchApi(index);
              setSelecteCourse(index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        <Text>image</Text>
        <View
          style={{
            flexDirection: "row",
            padding: 5,
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => pickImage()} style={{ width: "100%" }}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 150,
                  borderWidth: 2,
                  borderColor: "red",
                }}
              />
            ) : (
              <Image
                source={{ uri: `${image}` }}
                style={{
                  width: "100%",
                  height: 150,
                  borderWidth: 2,
                  borderColor: "red",
                }}
              />
            )}
          </Pressable>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Button
            style={{ marginBottom: 20 }}
            title="Add"
            onPress={() => postEd()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const ViewPage = () => {
  const [course, setCourse] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [courseName, setCourseName] = useState("");
  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          var aa = [];
          res.data.map((item) => {
            axios
              .get(`https://markazback2.onrender.com/api/course`, {
                headers: { Authorization: "Bearer " + tokenUser },
              })
              .then((res2) => {
                res2.data.map((item2) => {
                  console.log(item.id);
                  if (item.id == item2.author) {
                    console.log(item2);
                    aa.push(item2);
                  }
                  axios
                    .get(`https://markazback2.onrender.com/api/cours_types`, {
                      headers: { Authorization: "Bearer " + tokenUser },
                    })
                    .then((ress) => {
                      console.log(ress.data);
                      ress.data.map((itemm) => {
                        if (item2.sertificat_id == itemm.id) {
                          setCourseName(itemm.name);
                        }
                      });
                    });
                });
                // res2.data.length < 1 ? setCourse(null) : setCourse(res2.data);
              });
          });
          setCourse(aa);
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
  };
  useEffect(() => {
    setIsLoading(null);
    setRefreshing(true);
    // const keyOlish = async () => {
    //   const tokenUser = await AsyncStorage.getItem("token");
    //   axios
    //     .get("https://markazback2.onrender.com/auth/oneuser", {
    //       headers: { Authorization: "Bearer " + tokenUser },
    //     })
    //     .then((res) => {
    //       var aa = [];
    //       axios
    //         .get(`https://markazback2.onrender.com/api/course`, {
    //           headers: { Authorization: "Bearer " + tokenUser },
    //         })
    //         .then((res2) => {
    //           res.data.map((item) => {
    //             res2.data.map((item2) => {
    //               if (item.id == item2.author) {
    //                 aa.push(item2);
    //               }
    //               console.log(item.id);
    //               axios
    //                 .get(`https://markazback2.onrender.com/api/cours_types`, {
    //                   headers: { Authorization: "Bearer " + tokenUser },
    //                 })
    //                 .then((ress) => {
    //                   ress.data.map((itemm) => {
    //                     if (item2.sertificat_id == itemm.id) {
    //                       setCourseName(itemm.name);
    //                     }
    //                   });
    //                 });
    //             });
    //             // res2.data.length < 1 ? setCourse(null) : setCourse(res2.data);
    //           });
    //         });
    //       setCourse(aa);
    //     })
    //     .finally(() => {
    //       setIsLoading(1);
    //       setRefreshing(false);
    //     });
    // };
    const keyOlish = async () => {
      const tokenUser = await AsyncStorage.getItem("token");
      axios
        .get("https://markazback2.onrender.com/auth/oneuser", {
          headers: { Authorization: "Bearer " + tokenUser },
        })
        .then((res) => {
          axios
            .get(`https://markazback2.onrender.com/api/course`, {
              headers: { Authorization: "Bearer " + tokenUser },
            })
            .then((res2) => {
              var aa = [];
              res.data.map((item) => {
                res2.data.map((item2) => {
                  if (item.id == item2.author) {
                    aa.push(item2);
                  }
                });
              });
              setCourse(aa);
              axios.get(`https://markazback2.onrender.com/api/cours_types`, {
                headers: { Authorization: "Bearer " + tokenUser },
              }).then(res3 => {
                res3.data.map(item3 => {
                  aa.map(item4 => {
                    if (item4.sertificat_id == item3.id) {
                      setCourseName(item3.name)
                    }
                  })
                })
              })
            });
        })
        .finally(() => {
          setIsLoading(1);
          setRefreshing(false);
        });
    };
    keyOlish();
  }, []);

  const deleteData = async (key) => {
    const tokenUser = await AsyncStorage.getItem("token");

    axios
      .delete(`https://markazback2.onrender.com/api/course/${key}`, {
        headers: { Authorization: "Bearer " + tokenUser },
      })
      .then((res) => {
        alert("O'chirildi");
        onRefresh();
      })
      .catch((err) => {
        console.log(`${JSON.parse(err)}`);
      });
  };

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
              <Text>2</Text>
              <Image
                source={{
                  uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                }}
                style={{ width: "100%", height: 300 }}
              />
              <Text>No Course</Text>
              <View style={{ position: "relative" }}>
                <Button
                  title="Add new course"
                  onPress={() => navigation.navigate("postPage")}
                />
              </View>
            </View>
          ) : (
            <View>
              {course.map((item) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      padding: 10,
                      borderWidth: 1,
                      marginTop: 20,
                    }}
                    onPress={() => {
                      navigation.navigate("Course");
                      getted(item.id);
                    }}
                  >
                    <View style={{ position: "relative" }}>
                      <Image
                        style={{ width: "100%", height: 200 }}
                        source={{
                          uri: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          width: "30%",
                          textAlign: "center",
                          position: "absolute",
                          top: 5,
                          left: 5,
                          backgroundColor: "dodgerblue",
                          padding: 3,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {courseName}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          width: "100%",
                          fontSize: 20,
                          fontWeight: "bold",
                          marginLeft: "5%",
                        }}
                      >
                        {item.name ? item.name : "No name"}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View style={{ width: "80%" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "60%",
                              marginTop: 10,
                              padding: 10,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <AntDesign
                                name="star"
                                size={16}
                                color="goldenrod"
                              />
                              <AntDesign
                                name="star"
                                size={16}
                                color="goldenrod"
                              />
                              <AntDesign
                                name="star"
                                size={16}
                                color="goldenrod"
                              />
                              <AntDesign
                                name="star"
                                size={16}
                                color="goldenrod"
                              />
                              <AntDesign
                                name="staro"
                                size={16}
                                color="goldenrod"
                              />
                            </View>
                            <Text style={{ marginLeft: 10 }}>425 (524)</Text>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ width: "40%" }}>
                              <Text
                                style={{
                                  width: "100%",
                                  textAlign: "center",
                                  color: "gray",
                                  fontWeight: "bold",
                                }}
                              >
                                Kurs_Hajmi:
                              </Text>
                              <Text
                                style={{
                                  width: "100%",
                                  textAlign: "center",
                                  fontSize: 18,
                                }}
                              >
                                {item.planned_time}
                              </Text>
                            </View>
                            <View style={{ width: "40%" }}>
                              <Text
                                style={{
                                  width: "100%",
                                  textAlign: "center",
                                  color: "gray",
                                  fontWeight: "bold",
                                }}
                              >
                                Kurs Narxi:
                              </Text>
                              <Text
                                style={{
                                  width: "100%",
                                  textAlign: "center",
                                  fontSize: 18,
                                }}
                              >
                                {item.price}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "30%",
                            // backgroundColor: "dodgerblue",
                          }}
                        >
                          <View style={{ flexDirection: "column" }}>
                            <Pressable
                              onPress={() => {
                                getted(item.id);
                                navigation.navigate("EditCourse");
                              }}
                              style={{
                                width: 50,
                                height: 50,
                                padding: 2,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "dodgerblue",
                                borderRadius: 50,
                              }}
                            >
                              <AntDesign
                                name="edit"
                                size={24}
                                color="dodgerblue"
                              />
                            </Pressable>
                            <Pressable
                              onPress={() => {
                                Alert.alert(
                                  "Courseni o'chirishni hohlaysizmi?",
                                  "Courseni o'chirishni hohlaysizmi?",
                                  [
                                    {
                                      text: "ha",
                                      onPress: () => deleteData(item.id),
                                    },
                                    { text: "yoq" },
                                  ]
                                );
                              }}
                              style={{
                                marginTop: 5,
                                width: 50,
                                height: 50,
                                padding: 2,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "red",
                                borderRadius: 50,
                              }}
                            >
                              <AntDesign name="delete" size={24} color="red" />
                            </Pressable>
                          </View>
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
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(null);

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

  const onRefresh = React.useCallback(() => {
    const keyOlish = async () => {
      const courseId2 = await AsyncStorage.getItem("courseId");
      const tokenUser = await AsyncStorage.getItem("token");
 
      axios
        .get(
          `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
          {
            headers: { Authorization: "Bearer " + tokenUser },
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
    setIsLoading(null);
    setRefreshing(true);
    setTimeout(() => {
      setIsLoading(1);
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const keyOlish = async () => {
      const courseId2 = await AsyncStorage.getItem("courseId");
      const tokenUser = await AsyncStorage.getItem("token"); 

      axios
        .get(
          `https://markazback2.onrender.com/api/course_data_category/course/${courseId2}/`,
          {
            headers: { Authorization: "Bearer " + tokenUser },
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
    setIsLoading(null);
    setRefreshing(true);
    setTimeout(() => {
      setIsLoading(1);
      setRefreshing(false);
    }, 2000);
  }, []);
  const posted2 = async (key) => {
    await AsyncStorage.setItem("keyCategorys", JSON.stringify(key));
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: "white", paddingTop: 10 }}
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
        <View>
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
            <Button
              title="Add Category"
              onPress={() => navigation.navigate("postCategory")}
            />
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
        </View>
      )}
    </ScrollView>
  );
};

const AddTheme = ({ navigation }) => {
  const [state, setstate] = useState();
  useEffect(() => {
    const getKey = async () => {
      const courseId2 = await AsyncStorage.getItem("courseId");
      const tokenUser = await AsyncStorage.getItem("token");
      setstate(courseId2);
    };
    getKey();
  }, []);

  const postData = async () => {
    const courseId2 = await AsyncStorage.getItem("courseId");
    const tokenUser = await AsyncStorage.getItem("token");
    var data = new FormData();
    data.append("name", "halilov");
    data.append("content", "asdasd");
    data.append("image", "1692435101650.png");
    data.append("video", "1692435101650.png");
    data.append("extra_data", "asdasd");
    data.append("category", 6);
    axios
      .post(
        `https://markazback2.onrender.com/api/course_data_theme`,
        { data },
        {
          headers: { Authorization: "Bearer " + tokenUser },
        }
      )
      .then((res) => {
        alert("succes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <TextInput placeholder="Name" />
      <TextInput placeholder="Content" />
      <Text>IMage</Text>
      <TextInput placeholder="linkYoutube" />
      <TextInput placeholder="extra_data" />
      <Button title="post" onPress={postData} />
    </View>
  );
};

// var formdata = new FormData()
// formdata.append("name", document.querySelector(".nameInp").value)
// formdata.append("description", document.querySelector(".description").value)
// formdata.append("price", document.querySelector(".inp_numbr1").value)
// formdata.append("planned_time", document.querySelector(".inp_numbr").value)
// formdata.append("image", document.querySelector(".inp_img").files[0])
// formdata.append("course_type", document.querySelector(".select_opt").value)
// formdata.append("author", localStorage.getItem("oneuser"))
