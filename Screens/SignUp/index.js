import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../component/colors";
import { GenerateOtpAPI } from "../../Constants/Api";
import LinearGradient from "react-native-linear-gradient";

const SignUp = (props) => {
  const { userType } = props.route.params;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSignUpApi = () => {
    setOnSubmit(true);
    if (validateEmail(email)) {
      setError("");
      setIsLoading(true);
      GenerateOtpAPI(email)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.message === "OTP sent to email") {
              setIsLoading(false);
              navigation.navigate("Otp", { email, userType });
            } else if (res.data.message === "Email Already Exist") {
              setError(res.data.message);
              setIsLoading(false);
            } else {
              setError("Something Went Wrong !");
              setIsLoading(false);
            }
          }
        })
        .catch((e) => {
          setError(e.response.data.errors.email[0]);
          setIsLoading(false);
        });
    } else {
      setError("Please enter a valid email address");
      setIsLoading(false);
    }
  };

  if (isLoading === true)
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator />
      </View>
    );
  else
    return (
      <ScrollView
        style={styles.signUpPage}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.signUpText}>Welcome to Beauty App!</Text>
        <Text style={styles.signUpPara}>
          Let’s create an account and get started with Estheticians 4 You!
        </Text>
        <View>
          <Text style={styles.signUpLabel}>EMAIL</Text>
          <TextInput
            style={styles.SignUpInputContainer}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </View>

        {error && <Text style={styles.errorMessage}>{error}</Text>}

        <LinearGradient
          colors={[colors.gradientOne, colors.gradientTwo]}
          style={styles.signUpButton}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={handleSignUpApi}>
            <Text style={styles.signUpTextButton}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    );
};
export default SignUp;
const styles = StyleSheet.create({
  signUpPage: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  signUpText: {
    color: "#333333",
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 15,
    width: "60%",
  },
  signUpPara: {
    color: "rgba(66, 66, 89, 0.64)",
    fontSize: 12,
    lineHeight: 17,
  },
  signUpLabel: {
    color: "rgba(66, 66, 89, 0.48)",
    fontSize: 11,
    marginTop: 25,
  },
  SignUpInputContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginTop: 10,
    color: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 13,
    width: "100%",
    fontSize: 14,
    lineHeight: 18,
  },
  signUpButton: {
    // width: "100%",
    marginTop: "100%",
    borderRadius: 9,
    // marginBottom: 20,
  },
  signUpTextButton: {
    textAlign: "center",
    color: colors.textColor,
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 11,
  },
  errorMessage: {
    color: "red",
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
  },
  loadingStyle: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
