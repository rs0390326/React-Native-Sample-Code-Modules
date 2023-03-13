import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "../screens/Onboarding";
import LogInAs from "../screens/LogInAs";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Otp from "../screens/Otp";
import CreateAccount from "../screens/CreateAccount";
import BottomTab from "./BottomTab";
import Chat from "../screens/Chat";
import Notification from "../screens/Notification";
import FAQ from "../screens/FAQ";
import Support from "../screens/Support";
import Settings from "../screens/Settings";
import SavedPosts from "../screens/SavedPosts";
import Transactions from "../screens/Transactions";
import ForgetPassword from "../screens/ForgetPassword";
import EnterOtp from "../screens/EnterOtp";
import ResetPassword from "../screens/ResetPassword";
import Followers from "../screens/Followers";
import Following from "../screens/Following";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import Subscription from "../screens/Subscription";
import ServiceDetails from "../screens/ServiceDetails";
import UServiceDetails from "../screens/UServiceDetails";
import EditProfile from "../screens/EditProfile";
import ServiceForm from "../screens/ServiceForm";
import EditService from "../screens/EditService";
import VideoCall from "../screens/VideoCall";
import USignIn from "../screens/USignIn";
import USignUp from "../screens/USignUp";
import UOtp from "../screens/UOtp";
import UCreateAccount from "../screens/UCreateAccount";
import BeauticianProfile from "../screens/BeauticianProfile";
import UEditProfile from "../screens/UEditProfile";
import ChangePassword from "../screens/ChangePassword";
import colors from "../component/colors";
import UpdatePost from "../screens/UpdatePost";

function ExampleScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Example page!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Example" component={ExampleScreen} />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogInAs"
          component={LogInAs}
          options={{ title: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: false }}
        />
        <Stack.Screen
          name="USignIn"
          component={USignIn}
          options={{ title: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: false }}
        />
        <Stack.Screen
          name="USignUp"
          component={USignUp}
          options={{ title: false }}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ title: false, headerShown: false }}
        />
        <Stack.Screen
          name="UOtp"
          component={UOtp}
          options={{ title: false, headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ title: false }}
        />
        <Stack.Screen
          name="UCreateAccount"
          component={UCreateAccount}
          options={{ title: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name={`FAQ's`}
          component={FAQ}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="SavedPosts"
          component={SavedPosts}
          options={{
            title: "Saved Posts",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: "Change Password",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            title: "Forget Password",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="EnterOtp"
          component={EnterOtp}
          options={{
            title: "Enter OTP",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: "Reset Password",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Followers"
          component={Followers}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Following"
          component={Following}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Likes"
          component={Likes}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="ServiceDetails"
          component={ServiceDetails}
          options={{
            title: "Service Details",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="UServiceDetails"
          component={UServiceDetails}
          options={{
            title: "Service Details",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Edit Profile",
            headerTitleAlign: "center",
            headerShown: false,
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 15,
                  color: colors.textColor,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <Text
                style={{
                  marginLeft: 12,
                  color: colors.textColor,
                  fontSize: 16,
                }}
              >
                Cancel
              </Text>
            ),
            headerStyle: {
              backgroundColor: colors.gradientTwo,
            },
            headerTitleStyle: {
              color: colors.textColor,
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdatePost"
          component={UpdatePost}
          options={{
            title: "Update Post",
            headerTitleAlign: "center",
            headerShown: false,
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 15,
                  color: colors.textColor,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <Text
                style={{
                  marginLeft: 12,
                  color: colors.textColor,
                  fontSize: 16,
                }}
              >
                Cancel
              </Text>
            ),
            headerStyle: {
              backgroundColor: colors.gradientTwo,
            },
            headerTitleStyle: {
              color: colors.textColor,
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UEditProfile"
          component={UEditProfile}
          options={{
            title: "Edit Profile",
            headerTitleAlign: "center",
            headerShown: false,
            headerRight: () => (
              <Text
                style={{
                  marginRight: 15,
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Done
              </Text>
            ),
            headerLeft: () => (
              <Text style={{ marginLeft: 12, color: "#ffffff", fontSize: 16 }}>
                Cancel
              </Text>
            ),
            headerStyle: {
              backgroundColor: colors.gradientTwo,
            },
            headerTitleStyle: {
              color: "#ffffff",
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ServiceForm"
          component={ServiceForm}
          options={{
            title: "Service Form",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="EditService"
          component={EditService}
          options={{
            title: "Edit Service",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="BeauticianProfile"
          component={BeauticianProfile}
          options={{
            title: "Beautician Profile",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
