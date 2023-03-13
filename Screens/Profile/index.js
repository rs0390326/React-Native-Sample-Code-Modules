import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FAIcon } from "../../component/Icons";
import TopTab from "../../navigator/TopTab";
import { useNavigation } from "@react-navigation/native";
import colors from "../../component/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { BASE_URL } from "../../Constants/Host";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Profile() {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios
          .get(BASE_URL + "getProfile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUserDetails(response.data.data.user);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("bottom tab error" + error.response);
            setIsLoading(false);
          });
      }
    };
    fetchUserData();
  }, []);

  console.log("profile1", userDetails.profile_pic);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      {isLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.beautyProfileContainer}>
          <View>
            <View style={styles.ProfileContainerBox}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: userDetails.profile_pic }}
                  style={{ width: 92, height: 92, borderRadius: 46 }}
                />
              </View>
              <View style={{ flex: 3 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginLeft: 10,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.postCounter}>
                      {userDetails.postcount}
                    </Text>
                    <Text style={styles.followerText}>Posts</Text>
                  </View>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate("Followers", {
                        id: userDetails.id,
                      });
                    }}
                  >
                    <Text style={styles.postCounter}>
                      {userDetails.follower_count}
                    </Text>
                    <Text style={styles.followerText}>Followers</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate("Following", {
                        id: userDetails.id,
                      });
                    }}
                  >
                    <Text style={styles.postCounter}>
                      {userDetails.following_count}
                    </Text>
                    <Text style={styles.followerText}>Following</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LinearGradient
                    colors={[colors.gradientOne, colors.gradientTwo]}
                    style={styles.editProfileButton}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate("EditProfile");
                      }}
                    >
                      <Text style={styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            <Text style={styles.profilePersonName}>{userDetails.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <Text style={styles.veterinaText}>{userDetails.speciality}</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.startProfile}>
                <FAIcon name="star-o" size={17} />
              </TouchableOpacity>
              <Text style={styles.ratingSection}>4.5</Text>
              <Text style={styles.followersSection}>(50k)</Text>
            </View>
            <Text style={styles.experienceText}>
              {userDetails.experience} Experience
            </Text>
            <Text style={styles.profileSectionText}>{userDetails.bio}</Text>
          </View>
        </View>
      )}

      <TopTab />
    </View>
  );
}
export default Profile;
const styles = StyleSheet.create({
  beautyProfileContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  ProfileContainerBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  editProfileButton: {
    flex: 3,
    justifyContent: "center",
    marginLeft: 12,
    borderRadius: 15,
    paddingVertical: 8,
    marginTop: 10,
  },
  editText: {
    color: colors.textColor,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "bold",
  },
  postCounter: {
    color: "#262626",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 20,
  },
  followerText: {
    color: "#262626",
    fontSize: 12,
    lineHeight: 16,
  },
  profilePersonName: {
    color: "#262626",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  veterinaText: {
    color: "#262626",
    fontSize: 15,
    lineHeight: 18,
  },
  startProfile: {
    marginLeft: 5,
  },
  ratingSection: {
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "bold",
  },
  followersSection: {
    color: "rgba(38, 38, 38, 0.6)",
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 2,
  },
  experienceText: {
    color: "#262626",
    fontSize: 14,
    lineHeight: 21,
  },
  profileSectionText: {
    color: "#262626",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  secondProfilePart: {
    backgroundColor: "black",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 600,
  },
  loadingStyle: {
    // backgroundColor: colors.secondary,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
