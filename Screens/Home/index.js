import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  MaterialCommunityIcon,
  Foundation,
  EvilIcons,
  IonIcon,
  FAIcon,
  AntIcon,
  FontAwesome5,
} from "../../component/Icons";
import colors from "../../component/colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../Constants/Host";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LikePostAPI, SavedPostAPI } from "../../Constants/Api";

function Home(props) {
  const navigation = useNavigation();
  const MAX_DESCRIPTION_LENGTH = 70;
  const [isLoading, setIsLoading] = useState(true);
  const [allPost, setAllPost] = useState([]);
  const [likePost, setLikePost] = useState("");
  const [message, setMessage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleLike = useCallback(async (id) => {
    setAllPost((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.post.id === id) {
          console.log("like");
          return {
            ...post,
            post: {
              ...post.post,
              likes: post.post.likes + (post.post.liked_by_user ? -1 : 1),
              liked_by_user: !post.post.liked_by_user,
            },
          };
        } else {
          return post;
        }
      });
    });

    try {
      await LikePostAPI(id, "");
    } catch (error) {
      console.log("likeError", error.response);
    }
  }, []);

  const handleSave = useCallback(async (id) => {
    setAllPost((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.post.id === id) {
          console.log("like");
          return {
            ...post,
            post: {
              ...post.post,
              saved_by_user: !post.post.saved_by_user,
            },
          };
        } else {
          return post;
        }
      });
    });
    try {
      await SavedPostAPI(id, "");
    } catch (error) {
      console.log("saveError", error.response);
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      // If on the Home screen, exit the app
      if (navigation.isFocused()) {
        Alert.alert("Confirm", "Are you sure you want to exit?", [
          {
            text: "Yes",
            onPress: () => BackHandler.exitApp(),
          },
          {
            text: "No",
            onPress: () => console.log("No clicked"),
            style: "cancel",
          },
        ]);

        return true;
      }
      // Otherwise, navigate to the previous screen
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    const fetchAllPost = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios
          .get(BASE_URL + "auth/post/all", {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setAllPost(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("postError" + error.response);
            setIsLoading(false);
          });
      }
    };
    fetchAllPost();
  }, [likePost, message]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.beautyHomeContainer}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        allPost.map((posts, index) => (
          <View style={styles.beautyFirstContainer} key={index}>
            <View style={styles.beautyFirstContainerBox}>
              <View style={styles.beautyImgProfile}>
                <TouchableOpacity
                  style={styles.beautyImgProfile}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("BeauticianProfile", {
                      createdBy: posts.post.created_by.id,
                    });
                  }}
                >
                  {posts.post.created_by === null ? (
                    <FontAwesome5
                      name="user-circle"
                      size={56}
                      style={{ width: 56, height: 56, borderRadius: 28 }}
                    />
                  ) : (
                    <Image
                      source={{ uri: posts.post.created_by?.profile_pic }}
                      style={{ width: 56, height: 56, borderRadius: 28 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ width: "65%" }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.beautyName}
                    onPress={() => {
                      navigation.navigate("BeauticianProfile", {
                        createdBy: posts.post.created_by,
                      });
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.beautyName}>
                      {posts.post.created_by?.name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.beautyFirst}>. 1 st</Text>
                </View>
                <Text style={styles.beautySixteen}>16 h</Text>
              </View>
              <View style={{ width: "10%" }}>
                <TouchableOpacity activeOpacity={0.8}>
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={"#585C60"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.beautyPara}>
              <Text style={styles.beautyFirstPara}>
                {showFullDescription
                  ? posts.post.description
                  : `${posts.post.description.slice(
                      0,
                      MAX_DESCRIPTION_LENGTH
                    )}...`}
              </Text>
              {posts.post.description.length > MAX_DESCRIPTION_LENGTH && (
                <TouchableOpacity onPress={toggleDescription}>
                  <Text style={{ color: "#585C60", fontWeight: "bold" }}>
                    {showFullDescription ? "See less" : "See more"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {posts.post.file !== "https://admins.beautybook.io/storage" ? (
              <Image
                source={{ uri: posts.post.file }}
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  height: undefined,
                  marginTop: 15,
                }}
                resizeMode="contain"
              />
            ) : null}

            <View style={styles.LikeSection}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("Likes", {
                    id: posts.post.id,
                  });
                }}
              >
                <View style={styles.LikeCommentSection}>
                  <Foundation name="like" size={15} color={"#fff"} />
                </View>
                <Text style={{ color: "#585C60", fontSize: 13, marginLeft: 3 }}>
                  {posts.post.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ fontSize: 13, lineHeight: 17 }}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("Comments", {
                    id: posts.post.id,
                  });
                }}
              >
                <Text style={{ color: "#585C60" }}>
                  {posts.post.comment} comments
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.LikeShareSection}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleLike(posts.post.id)}
              >
                {posts.post.liked_by_user ? (
                  <AntIcon name="like1" size={30} color={colors.primary} />
                ) : (
                  <EvilIcons name="like" size={30} color={"#585C60"} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("Comments", {
                    id: posts.post.id,
                  });
                }}
              >
                <FAIcon name="commenting-o" size={23} color={"#585C60"} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <FAIcon name="share" size={23} color={"#585C60"} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSave(posts.post.id)}
              >
                {posts.post.saved_by_user ? (
                  <FAIcon name="bookmark" size={30} />
                ) : (
                  <IonIcon
                    name="bookmark-outline"
                    size={23}
                    color={"#585C60"}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.likeTextSection}>
              <Text style={styles.likeText}>Like</Text>
              <Text style={styles.likeText}>Comment</Text>
              <Text style={styles.likeText}>Share</Text>
              <Text style={styles.likeText}>Save</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
export default Home;
const styles = StyleSheet.create({
  beautyHomeContainer: {
    marginTop: 15,
    marginHorizontal: 12,
  },
  beautyFirstContainer: {
    backgroundColor: "#F9F7F0",
    width: "100%",
    height: "auto",
    marginBottom: 20,
  },
  beautySecondContainer: {
    backgroundColor: "#F6FAFF",
    width: "100%",
    height: "auto",
    marginTop: 15,
  },
  beautyFirstContainerBox: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  beautyImgProfile: {
    width: "25%",
    alignItems: "center",
  },
  beautyName: {
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
  beautyFirst: {
    color: "#585C60",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  beautySixteen: {
    color: "#585C60",
    fontSize: 15,
    lineHeight: 18,
    marginTop: 3,
  },
  beautyPara: {
    marginHorizontal: 13,
    marginTop: 10,
  },
  beautyFirstPara: {
    fontSize: 14,
    lineHeight: 18,
    color: "#000000",
  },
  LikeSection: {
    flexDirection: "row",
    marginHorizontal: 22,
    marginTop: 15,
    justifyContent: "space-between",
  },
  LikeCommentSection: {
    backgroundColor: colors.gradientTwo,
    width: 16,
    height: 16,
    borderRadius: 32,
    alignItems: "center",
  },
  LikeShareSection: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
    alignItems: "center",
  },
  likeTextSection: {
    flexDirection: "row",
    marginHorizontal: 8,
    marginTop: 5,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 14,
  },
  likeText: {
    color: "#585C60",
    fontSize: 14,
    lineHeight: 16,
  },
});
