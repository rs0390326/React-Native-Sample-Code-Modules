import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../component/colors";
import PostScreen from "../screens/PostScreen";
import AboutScreen from "../screens/AboutScreen";
import BReviewScreen from "../screens/BReviewScreen";
const Tab = createMaterialTopTabNavigator();
export default function TopTab(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderRadius: 28,
          marginTop: 20,
          marginBottom: 23,
          marginHorizontal: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          height: "100%",
          borderRadius: 30,
          width: "33%",
          marginLeft: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.textColor : "rgba(51, 51, 51, 0.64)",
                marginHorizontal: -21,
                alignSelf: "center",
                fontSize: 14,
                fontWeight: focused ? "bold" : "",
              }}
            >
              Posts
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="BReviews"
        component={BReviewScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.textColor : "rgba(51, 51, 51, 0.64)",
                marginHorizontal: -21,
                alignSelf: "center",
                fontSize: 14,
                fontWeight: focused ? "bold" : "",
              }}
            >
              Reviews
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.textColor : "rgba(51, 51, 51, 0.64)",
                marginHorizontal: -21,
                alignSelf: "center",
                fontSize: 14,
                fontWeight: focused ? "bold" : "",
              }}
            >
              About
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
