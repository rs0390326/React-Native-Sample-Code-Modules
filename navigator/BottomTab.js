import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntIcon,
  MaterialCommunityIcon,
  MaterialIcon,
  FontAwesome5,
} from "../component/Icons";
import Inbox from "../screens/Inbox";
import PostJob from "../screens/PostJob";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import UProfile from "../screens/UProfile";
import Home from "../screens/Home";
import UHome from "../screens/UHome";
import { useNavigation } from "@react-navigation/native";
import colors from "../component/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { BASE_URL } from "../Constants/Host";

const Tab = createBottomTabNavigator();
const CustomTabButton = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderTopColor: colors.textColor, borderTopWidth: 3 }]
        : props.style
    }
  />
);
const ModalTab = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTextCenter}>___</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(`FAQ's`);
            }}
          >
            <Text style={styles.modalText}>Faqs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Support");
            }}
          >
            <Text style={styles.modalText}>Support</Text>
          </TouchableOpacity>
          {props.userType === "Estheticians" ? (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Transactions");
              }}
            >
              <Text style={styles.modalText}>Transactions</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SavedPosts");
            }}
          >
            <Text style={styles.modalText}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          >
            <Text style={styles.modalText}>Settings</Text>
          </TouchableOpacity>
          {props.userType === "Estheticians" ? (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Subscription");
              }}
            >
              <Text style={styles.modalText}>Subscription</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem("token");
              const success = "";
              props.navigation.navigate("SignIn", success);
            }}
          >
            <Text style={styles.modalText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const BottomTab = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [modalVisibleThree, setModalVisibleThree] = useState(false);
  const [modalVisibleFour, setModalVisibleFour] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [isHomeScreen, setIsHomeScreen] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios
          .get(BASE_URL + "getProfile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUserType(response.data.data.user.user_type);
            setProfilePic(response.data.data.user.profile_pic);
            setUserName(response.data.data.user.user_name);
          })
          .catch((error) => {
            console.log("bottom tab error" + error.response);
          });
      }
    };
    fetchUserData();
  }, []);
  if (userType === "")
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator />
      </View>
    );
  else
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.gradientTwo,
            height: 56,
            paddingBottom: 6,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={userType === "Users" ? UHome : Home}
          initialParams={{ userType: userType, isHomeScreen: isHomeScreen }}
          options={{
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: "center",
                }}
              >
                <Image source={require("../assest/image/homeLogo.png")} />
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisible}
                  userType={userType}
                  navigation={navigation}
                  setModalVisible={setModalVisible}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  activeOpacity={1}
                >
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                  activeOpacity={1}
                >
                  <MaterialIcon
                    name="notifications-none"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 24 }}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 4,
                }}
              >
                <MaterialCommunityIcon
                  name="home"
                  size={26}
                  color={focused ? colors.textColor : "rgba(51, 51, 51, 0.64)"}
                />
                <Text
                  style={{
                    color: focused
                      ? colors.textColor
                      : "rgba(51, 51, 51, 0.64)",
                    fontSize: 9,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.64)",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTitleStyle: {
              color: colors.primary,
            },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: "center",
                }}
              >
                <Image source={require("../assest/image/homeLogo.png")} />
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisibleTwo}
                  userType={userType}
                  navigation={navigation}
                  setModalVisible={setModalVisibleTwo}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setModalVisibleTwo(!modalVisibleTwo)}
                >
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                >
                  <MaterialIcon
                    name="notifications-none"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 24 }}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 4,
                }}
              >
                <AntIcon
                  name="search1"
                  size={26}
                  color={focused ? colors.textColor : "rgba(51, 51, 51, 0.64)"}
                />
                <Text
                  style={{
                    color: focused
                      ? colors.textColor
                      : "rgba(51, 51, 51, 0.64)",
                    fontSize: 9,
                  }}
                >
                  Search
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.64)",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTitleStyle: {
              color: colors.primary,
            },
            headerTitleAlign: "center",
          }}
        />
        {userType === "Estheticians" ? (
          <Tab.Screen
            name="Share Post"
            component={PostJob}
            options={{
              headerRight: () => (
                <Text
                  style={{
                    marginRight: 10,
                    color: colors.textColor,
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Post
                </Text>
              ),
              headerLeft: () => (
                <Text
                  style={{
                    marginLeft: 10,
                    color: colors.textColor,
                    fontSize: 15,
                  }}
                >
                  Cancel
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 4,
                  }}
                >
                  <AntIcon
                    name="plus"
                    size={26}
                    color={
                      focused ? colors.textColor : "rgba(51, 51, 51, 0.64)"
                    }
                  />
                  <Text
                    style={{
                      color: focused
                        ? colors.textColor
                        : "rgba(51, 51, 51, 0.64)",
                      fontSize: 9,
                    }}
                  >
                    Post
                  </Text>
                </View>
              ),
              tabBarButton: CustomTabButton,
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "rgba(255, 255, 255, 0.64)",
              headerStyle: {
                backgroundColor: colors.gradientTwo,
              },
              headerTitleStyle: {
                color: colors.textColor,
                fontSize: 14,
              },
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />
        ) : null}

        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: "center",
                }}
              >
                <Image source={require("../assest/image/homeLogo.png")} />
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisibleThree}
                  userType={userType}
                  navigation={navigation}
                  setModalVisible={setModalVisibleThree}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setModalVisibleThree(!modalVisibleThree)}
                >
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                  activeOpacity={1}
                >
                  <MaterialIcon
                    name="notifications-none"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 24 }}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 4,
                }}
              >
                <AntIcon
                  name="message1"
                  size={26}
                  color={focused ? colors.textColor : "rgba(51, 51, 51, 0.64)"}
                />
                <Text
                  style={{
                    color: focused
                      ? colors.textColor
                      : "rgba(51, 51, 51, 0.64)",
                    fontSize: 9,
                  }}
                >
                  Inbox
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.64)",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTitleStyle: {
              color: colors.primary,
            },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={userType === "Users" ? UProfile : Profile}
          initialParams={{ userType: userType }}
          options={{
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcon
                  name="lock"
                  size={18}
                  color={colors.textColor}
                  style={{ marginLeft: 10, marginRight: 5, marginTop: 2 }}
                />
                <Text
                  style={{
                    color: colors.textColor,
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  {userName}
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.rowView}>
                <ModalTab
                  modalVisible={modalVisibleFour}
                  userType={userType}
                  navigation={navigation}
                  setModalVisible={setModalVisibleFour}
                />
                <TouchableOpacity
                  onPress={() => setModalVisibleFour(!modalVisibleFour)}
                  activeOpacity={1}
                >
                  <MaterialCommunityIcon
                    name="dots-vertical"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                  activeOpacity={1}
                >
                  <MaterialIcon
                    name="notifications-none"
                    size={25}
                    color={colors.textColor}
                    style={{ marginRight: 24 }}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: "",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 4,
                }}
              >
                {profilePic === "https://admins.beautybook.io/storage" ||
                profilePic === null ||
                profilePic === "" ? (
                  <FontAwesome5
                    name="user-circle"
                    size={26}
                    style={{ width: 26, height: 26, borderRadius: 13 }}
                  />
                ) : (
                  <Image
                    source={{ uri: profilePic }}
                    style={{ width: 26, height: 26, borderRadius: 13 }}
                  />
                )}

                <Text
                  style={{
                    color: focused
                      ? colors.textColor
                      : "rgba(51, 51, 51, 0.64)",
                    fontSize: 9,
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
            tabBarButton: CustomTabButton,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.64)",
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTitleStyle: {
              color: colors.primary,
            },
            headerTitleAlign: "center",
          }}
        />
      </Tab.Navigator>
    );
};
export default BottomTab;
const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "100%",
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 35,
    paddingHorizontal: 35,
    bottom: 0,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
  modalTextCenter: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  loadingStyle: {
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
