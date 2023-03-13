import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { IonIcon } from "../../component/Icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../component/colors";
import { LoginAPI, GetProfileTokenAPI } from "../../Constants/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

const SignIn = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = () => {
    setOnSubmit(true);
    setIsLoading(true);
    LoginAPI(email, password)
      .then((res) => {
        if (res.data.code === 200) {
          if (res.data.data.user_token.token !== undefined) {
            const token = res.data.data.user_token.token;
            AsyncStorage.setItem("token", token);
            GetProfileTokenAPI(token)
              .then((res) => {
                if (res.data.data.user.user_type === "Estheticians") {
                  setIsLoading(false);
                  navigation.navigate("CreateAccount");
                }
                if (res.data.data.user.user_type === "Users") {
                  setIsLoading(false);
                  navigation.navigate("UCreateAccount");
                }
              })
              .catch((error) => {
                console.log("token error " + error);
                setIsLoading(false);
              });
          }
        }
      })
      .catch((e) => {
        if (email !== "" && password !== "") {
          if (e.response.data.code === 400) {
            setErrorMessage(e.response.data.data + " !");
            setIsLoading(false);
          } else {
            setErrorMessage("Something Went Wrong!!!");
            setIsLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoading(true);
        GetProfileTokenAPI(token)
          .then((res) => {
            if (res.data.data.user.user_type === "Estheticians") {
              setIsLoading(false);
              navigation.navigate("CreateAccount");
            }
            if (res.data.data.user.user_type === "Users") {
              setIsLoading(false);
              navigation.navigate("UCreateAccount");
            }
          })
          .catch((error) => {
            console.log("token error " + error);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
        navigation.navigate("SignIn");
      }
    };
    getToken();
  }, []);

  if (isLoading === true)
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator />
      </View>
    );
  else
    return (
      <ScrollView
        style={styles.signInPage}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.signInText}>Welcome Back!</Text>
        <Text style={styles.signInPara}>
          We are so happy to see you again. You can continue logging in to your
          account.
        </Text>
        <View>
          <Text style={styles.signInLabel}>EMAIL</Text>
          <TextInput
            style={styles.SignInInputContainer}
            value={email}
            placeholder="Enter Email"
            onChangeText={setEmail}
          />
        </View>
        {email === "" && onSubmit === true ? (
          <Text style={styles.errorMessage}>Email field is empty!</Text>
        ) : null}
        <View>
          <Text style={styles.signInLabel}>PASSWORD</Text>
          <View style={styles.wrapperInput}>
            <TextInput
              secureTextEntry={seePassword}
              style={styles.SignInInputContainer}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
            />
            <TouchableOpacity
              style={styles.wrapperIcon}
              onPress={() => setSeePassword(!seePassword)}
            >
              {seePassword !== true ? (
                <IonIcon name="eye" size={25} style={styles.eyeIcon} />
              ) : (
                <IonIcon name="eye-off" size={25} style={styles.eyeIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {password === "" && onSubmit === true ? (
          <Text style={styles.errorMessage}>Password field is empty!</Text>
        ) : null}

        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        <TouchableOpacity style={styles.forgetLink} activeOpacity={0.8}>
          <Text style={styles.forgetText}>forgot password?</Text>
        </TouchableOpacity>
        {/* {props.route.params.length === 0 ? null : (
          <Text style={styles.successMessage}>{props.route.params}</Text>
        )} */}
        <LinearGradient
          colors={[colors.gradientOne, colors.gradientTwo]}
          style={styles.signInButton}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
            <Text style={styles.signInTextButton}>Sign in</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.newSignText}>
          <Text style={styles.newText}>New here?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("LogInAs");
            }}
          >
            <Text style={styles.upText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
};
export default SignIn;
const styles = StyleSheet.create({
  signInPage: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  signInText: {
    color: "#333333",
    fontSize: 21,
    lineHeight: 25,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 15,
  },
  signInPara: {
    color: "rgba(66, 66, 89, 0.64)",
    fontSize: 12,
    lineHeight: 16,
  },
  signInLabel: {
    color: "rgba(66, 66, 89, 0.48)",
    fontSize: 11,
    marginTop: 25,
  },
  SignInInputContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 6,
    marginTop: 10,
    color: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 13,
    width: "100%",
    fontSize: 14,
    lineHeight: 18,
  },
  wrapperInput: {
    position: "relative",
  },
  wrapperIcon: {
    position: "absolute",
    right: 13,
    top: 25,
  },
  eyeIcon: {
    color: "rgba(66, 66, 89, 0.64);",
  },
  forgetLink: {
    marginTop: 16,
  },
  forgetText: {
    color: "rgba(66, 66, 89, 0.8)",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "right",
    textDecorationLine: "underline",
  },
  signInButton: {
    width: "100%",
    marginTop: 250,
    borderRadius: 9,
    marginBottom: 20,
  },
  signInTextButton: {
    textAlign: "center",
    color: colors.textColor,
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 11,
  },
  newSignText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newText: {
    color: "rgba(0, 0, 0, 0.48)",
    fontSize: 12,
  },
  upText: {
    color: colors.primary,
    fontSize: 16,
    marginLeft: 3,
  },
  errorMessage: {
    color: "red",
  },
  successMessage: {
    color: "green",
  },
  loadingStyle: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
