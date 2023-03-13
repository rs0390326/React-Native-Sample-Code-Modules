import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { AntIcon, FontAwesome5 } from "../../component/Icons";
import PhoneInput from "react-native-phone-number-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import DocumentPicker from "react-native-document-picker";
import { useNavigation } from "@react-navigation/native";
import colors from "../../component/colors";
import {
  StateAPI,
  CityAPI,
  CreateAccountAPI,
  CountryAPI,
} from "../../Constants/Api";
import LinearGradient from "react-native-linear-gradient";
import { launchImageLibrary } from "react-native-image-picker";
import { Avatar } from "react-native-paper";
import axios from "axios";
import { BASE_URL } from "../../Constants/Host";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateAccount = (props) => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState(null);
  const [checkProfilePic, setCheckProfilePic] = useState(null);
  const [proofIdentity, setProofIdentity] = useState(null);
  const [checkProofIdentity, setCheckProofIdentity] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryIso2, setCountryIso2] = useState("");
  const [callingCode, setCallingCode] = useState("");
  const [gender, setGender] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [experienceValue, setExperienceValue] = useState("");
  const [bio, setBio] = useState("");
  const [onSubmit, setOnSubmit] = useState(false);
  const [selectedStateValue, setSelectedStateValue] = useState("Select State");
  const [selectedCityValue, setSelectedCityValue] = useState("Select City");
  const [selectedCountryValue, setSelectedCountryValue] =
    useState("Select Country");
  const [characterCount, setCharacterCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const USERNAME_REGEX = /^[a-zA-Z0-9._]*$/;

  const handleOnChangeCountry = (country) => {
    setCountryIso2(country);
    setCallingCode(`+${country.callingCode[0]}`);
  };

  const handleUsernameChange = (text) => {
    if (USERNAME_REGEX.test(text)) {
      setUserName(text);
    }
  };

  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  //  For uploading image
  const uploadImage = () => {
    setProfilePic(null);
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setToastMsg("Canceled image selection");
      } else if (response.errorCode === "permission") {
        setToastMsg("permission not satisfied");
      } else if (response.errorCode === "others") {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        setToastMsg("maximum");
      } else {
        const newImage = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setProfilePic(newImage);
        setToastMsg("Upload Successfully");
      }
    });
  };

  // for removing the image
  const removeImage = () => {
    setProfilePic(null);
    setToastMsg("Image Removed");
  };

  const uploadDocument = async () => {
    setCheckProofIdentity(null);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const newDocument = {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      };
      setProofIdentity(newDocument);
      setToastMsg("Upload Successfully");
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setToastMsg("Canceled image selection");
      } else {
        setToastMsg("Error Occurred");
      }
    }
  };

  const removeDocument = () => {
    setProofIdentity(null);
    setToastMsg("Document Removed");
  };
  const handleTextChange = (text) => {
    setBio(text);
    setCharacterCount(text.length);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDob(date.toISOString().split("T")[0]);
  };

  const changeSelectedDate = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    setDob(fDate);
  };

  const handleCreateAccountApi = () => {
    setOnSubmit(true);
    const formData = new FormData();
    {
      checkProfilePic === profilePic
        ? null
        : formData.append("profile_pic", {
            uri: profilePic.uri,
            type: profilePic.type,
            name: profilePic.name,
          });
    }
    {
      checkProofIdentity === proofIdentity
        ? null
        : formData.append("proof", {
            uri: proofIdentity.uri,
            type: proofIdentity.type,
            name: proofIdentity.name,
          });
    }
    formData.append("name", name);
    formData.append("user_name", userName);
    formData.append("dob", dob);
    formData.append("code", callingCode);
    formData.append("mobile", phoneNumber);
    formData.append("gender", gender);
    formData.append("country_id", selectedCountryValue);
    formData.append("state_id", selectedStateValue);
    formData.append("city_id", selectedCityValue);
    formData.append("experience", experienceValue);
    formData.append("bio", bio);

    if (
      proofIdentity !== null ||
      proofIdentity !== "" ||
      name !== null ||
      name !== "" ||
      userName !== null ||
      userName !== "" ||
      dob !== null ||
      dob !== "" ||
      phoneNumber !== null ||
      phoneNumber !== "" ||
      gender !== null ||
      gender !== "" ||
      selectedCountryValue !== null ||
      selectedCountryValue !== "" ||
      selectedStateValue !== null ||
      selectedStateValue !== "" ||
      selectedCityValue !== null ||
      selectedCityValue !== "" ||
      experienceValue !== null ||
      experienceValue !== "" ||
      bio !== null ||
      bio !== ""
    ) {
      setIsLoading(true);
      CreateAccountAPI(formData)
        .then((res) => {
          setIsLoading(false);
          navigation.navigate("BottomTab");
        })
        .catch((e) => {
          console.log("error got it", e.response);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    CountryAPI()
      .then((response) => setCountryList(response.data.data))
      .catch((error) => console.log(error));
    if (selectedCountryValue !== "Select Country") {
      StateAPI(selectedCountryValue)
        .then((response) => setStateList(response.data.data))
        .catch((error) => console.log(error));
    }
    if (selectedStateValue !== "Select State") {
      CityAPI(selectedStateValue)
        .then((response) => setCityList(response.data.city_data))
        .catch((error) => console.log(error));
    }
  }, [selectedCountryValue, selectedStateValue]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios
          .get(BASE_URL + "getProfile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setCheckProfilePic(res.data.data.user.profile_pic);
            setProfilePic(res.data.data.user.profile_pic);
            setCheckProofIdentity(res.data.data.user.proof);
            setProofIdentity(res.data.data.user.proof);
            setName(res.data.data.user.name);
            setUserName(res.data.data.user.user_name);
            setDob(res.data.data.user.dob);
            setEmail(res.data.data.user.email);
            setPhoneNumber(res.data.data.user.mobile);
            setGender(res.data.data.user.gender);
            setSelectedCountryValue(res.data.data.user.country_id);
            setSelectedCityValue(res.data.data.user.city_id);
            setSelectedStateValue(res.data.data.user.state_id);
            setExperienceValue(res.data.data.user.experience);
            setBio(res.data.data.user.bio);
          })
          .catch((error) => {
            console.log("bottom tab error" + error);
          });
      }
    };
    fetchUserData();
  }, []);

  console.log(callingCode);
  console.log(phoneNumber);
  if (isLoading === true)
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator />
      </View>
    );
  else
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={styles.profileContainer}
      >
        <View style={styles.uploadMain}>
          <View style={styles.signUpHeading}>
            <Text style={styles.detailsYourself}>Create Account</Text>
          </View>
          <Text style={styles.uploadText}>PROOF PICTURE</Text>
          <View style={styles.uploadBox}>
            <View style={styles.uploadRemoveSection}>
              <TouchableOpacity
                style={styles.uploadArrow}
                onPress={uploadImage}
                activeOpacity={0.8}
                underlayColor="rgba(0,0,0,0)"
              >
                {profilePic === "https://admins.beautybook.io/storage" ||
                profilePic === null ||
                profilePic === "" ? (
                  <FontAwesome5
                    name="user-circle"
                    size={65}
                    style={styles.appLogo}
                  />
                ) : (
                  <Image
                    source={{
                      uri:
                        typeof profilePic === "string"
                          ? profilePic
                          : profilePic.uri,
                    }}
                    style={styles.appLogo}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.profileRightSection}>
                <View style={styles.uploadAndRemove}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.uploadFile}
                    onPress={uploadImage}
                  >
                    <Text style={styles.uploadSection}>Upload image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.removeFile}
                    onPress={removeImage}
                  >
                    <Text style={styles.removeSection}>Remove</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.uploadImg}>
                  <Text style={styles.uploadImgText}>
                    You can upload jpg, gif or png image files. Max size of 3mb.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.uploadText}>PROOF OF IDENTIFY</Text>
          <View style={styles.uploadBox}>
            <View style={styles.uploadRemoveSection}>
              <View style={styles.uploadArrow}>
                {proofIdentity === null ||
                proofIdentity === "" ||
                proofIdentity === "https://admins.beautybook.io/storage" ? (
                  <AntIcon name="upload" size={53} style={styles.uploadIcon} />
                ) : (
                  <AntIcon name="checkcircle" size={53} color={"green"} />
                )}
              </View>
              <View style={styles.profileRightSection}>
                <View style={styles.uploadAndRemove}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.uploadFile,
                      {
                        opacity:
                          proofIdentity === null ||
                          proofIdentity === "" ||
                          proofIdentity ===
                            "https://admins.beautybook.io/storage"
                            ? 1
                            : 0.5,
                      },
                    ]}
                    onPress={uploadDocument}
                  >
                    <Text style={styles.uploadSection}>Upload document</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.removeFile,
                      {
                        opacity:
                          proofIdentity === null ||
                          proofIdentity === "" ||
                          proofIdentity ===
                            "https://admins.beautybook.io/storage"
                            ? 0.5
                            : 1,
                      },
                    ]}
                    onPress={removeDocument}
                    disabled={
                      proofIdentity === null ||
                      proofIdentity === "" ||
                      proofIdentity === "https://admins.beautybook.io/storage"
                        ? true
                        : false
                    }
                  >
                    <Text style={styles.removeSection}>Remove</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.uploadImg}>
                  <Text style={styles.uploadImgText}>
                    Please upload a document that verifies you to be a
                    professional.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {proofIdentity === "" ||
          proofIdentity === null ||
          (proofIdentity === "https://admins.beautybook.io/storage" &&
            onSubmit === true) ? (
            <Text style={styles.errorMessage}>
              Proof of identity field is required!
            </Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>NAME</Text>
            <TextInput
              style={styles.inputContainer}
              value={name}
              onChangeText={(text) => setName(text.replace(/[^a-zA-Z\s]/g, ""))}
              placeholder="Enter Your Name"
            />
          </View>
          {name === "" && onSubmit === true ? (
            <Text style={styles.errorMessage}>Name field is required!</Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>USERNAME</Text>
            <TextInput
              style={styles.inputContainer}
              value={userName}
              onChangeText={handleUsernameChange}
              placeholder="Enter Your User Name"
            />
          </View>
          {userName === "" || (userName === null && onSubmit === true) ? (
            <Text style={styles.errorMessage}>
              User Name field is required!
            </Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>DATE OF BIRTH</Text>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.secondary,
                paddingHorizontal: 15,
                justifyContent: "space-between",
                alignContent: "center",
                marginTop: 12,
                borderRadius: 4,
                paddingVertical: 12,
              }}
            >
              <TouchableOpacity onPress={showDatePicker}>
                <Text>{dob ? dob : "Select your date of birth"}</Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          {(dob === "" || dob === null) && onSubmit === true ? (
            <Text style={styles.errorMessage}>Dob field is required!</Text>
          ) : null}
          <View style={styles.personalContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.labelName}>EMAIL</Text>
              {email !== "" ? (
                <Text
                  style={{
                    color: "green",
                    fontSize: 12,
                    marginTop: 16,
                    marginLeft: "1%",
                  }}
                >
                  (Verified)
                </Text>
              ) : null}
            </View>
            <TextInput
              style={styles.inputEmailContainer}
              value={email}
              disabled
              placeholder="Email"
              editable={false}
              caretHidden={false}
            />
          </View>
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>PHONE NUMBER</Text>
            <PhoneInput
              defaultValue={phoneNumber}
              placeholder="Enter phone number"
              defaultCode="US"
              onChangeText={setPhoneNumber}
              onChangeCountry={handleOnChangeCountry}
              textInputStyle={{ height: 50 }}
              containerStyle={{ height: 50 }}
              countryPickerButtonStyle={{}}
              codeTextStyle={{ height: 28, marginLeft: -15 }}
              withDarkTheme
              autoFocus
            />
          </View>
          {(phoneNumber === "" || phoneNumber === null) && onSubmit === true ? (
            <Text style={styles.errorMessage}>Phone field is required!</Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>GENDER</Text>
            <View
              style={{ borderRadius: 4, overflow: "hidden", marginTop: 12 }}
            >
              <Picker
                style={styles.dropGender}
                dropdownIconColor="rgba(66, 66, 89, 0.64)"
                selectedValue={gender}
                onValueChange={(itemValue) => {
                  setGender(itemValue);
                }}
              >
                <Picker.Item label="Select Gender" value="Select Gender" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          </View>
          {(gender === "" || gender === null) && onSubmit === true ? (
            <Text style={styles.errorMessage}>Gender field is required!</Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>COUNTRY</Text>
            <View
              style={{ borderRadius: 4, overflow: "hidden", marginTop: 12 }}
            >
              <Picker
                style={styles.dropGender}
                dropdownIconColor="rgba(66, 66, 89, 0.64)"
                selectedValue={selectedCountryValue}
                onValueChange={(itemValue) => {
                  setSelectedCountryValue(itemValue);
                }}
              >
                <Picker.Item label="Select Country" value={null} />
                {countryList.map((country) => (
                  <Picker.Item
                    key={country.id}
                    label={country.name}
                    value={country.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {(selectedCountryValue === "" || selectedCountryValue === null) &&
          onSubmit === true ? (
            <Text style={styles.errorMessage}>Please Select Country!</Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>STATE</Text>
            <View
              style={{ borderRadius: 4, overflow: "hidden", marginTop: 12 }}
            >
              <Picker
                selectedValue={selectedStateValue}
                onValueChange={(itemValue) => setSelectedStateValue(itemValue)}
                style={styles.dropGender}
                dropdownIconColor="rgba(66, 66, 89, 0.64)"
              >
                <Picker.Item label="Select State" value={null} />
                {stateList.length === 0 ? (
                  <View style={styles.loadingStyle}>
                    <ActivityIndicator />
                  </View>
                ) : (
                  stateList.map((state) => (
                    <Picker.Item
                      key={state.id}
                      label={state.name}
                      value={state.id}
                    />
                  ))
                )}
              </Picker>
            </View>
          </View>
          {(selectedStateValue === "" || selectedStateValue === null) &&
          onSubmit === true ? (
            <Text style={styles.errorMessage}>Please Select State!</Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>CITY</Text>
            <View
              style={{ borderRadius: 4, overflow: "hidden", marginTop: 12 }}
            >
              <Picker
                style={styles.dropGender}
                dropdownIconColor="rgba(66, 66, 89, 0.64)"
                selectedValue={selectedCityValue}
                onValueChange={(itemValue) => setSelectedCityValue(itemValue)}
              >
                <Picker.Item label="Select City" value={null} />
                {cityList.length === 0 ? (
                  <View style={styles.loadingStyle}>
                    <ActivityIndicator />
                  </View>
                ) : (
                  cityList.map((city) => (
                    <Picker.Item
                      key={city.id}
                      label={city.name}
                      value={city.id}
                    />
                  ))
                )}
              </Picker>
            </View>
          </View>
          {(selectedCityValue === "" || selectedCityValue === null) &&
          onSubmit === true ? (
            <Text style={styles.errorMessage}>Please Select City!</Text>
          ) : null}
          <View style={styles.personalContainer}>
            <Text style={styles.labelName}>EXPERIENCE</Text>
            <TextInput
              style={styles.inputContainer}
              value={experienceValue}
              onChangeText={setExperienceValue}
              placeholder="Enter Your Experience"
            />
          </View>
          {(experienceValue === "" || experienceValue === null) &&
          onSubmit === true ? (
            <Text style={styles.errorMessage}>
              Experience field is required!!
            </Text>
          ) : null}
          <Text style={styles.labelName}>BIO</Text>
          <View style={styles.textContainer}>
            <TextInput
              maxLength={150}
              multiline={true}
              placeholder="Type here...."
              placeholderTextColor="#333333"
              style={styles.textInputSection}
              value={bio}
              onChangeText={handleTextChange}
            />
            {characterCount >= 150 ? (
              <Text style={styles.characterStyle}>Character limit reached</Text>
            ) : (
              <Text
                style={styles.characterStyle}
              >{`${characterCount}/150`}</Text>
            )}
          </View>
          {(bio === "" || bio === null) && onSubmit === true ? (
            <Text style={styles.errorMessage}>Bio field is required!!</Text>
          ) : null}
          <LinearGradient
            colors={[colors.gradientOne, colors.gradientTwo]}
            style={styles.signUpButton}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCreateAccountApi}
            >
              <Text style={styles.signText}>Sign up</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    );
};
export default CreateAccount;
const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  signUpHeading: {
    marginBottom: 15,
  },
  detailsYourself: {
    color: "#333333",
    fontSize: 22,
    lineHeight: 25,
    fontWeight: "bold",
  },
  uploadMain: {
    marginTop: 10,
  },
  uploadText: {
    fontSize: 11,
    lineHeight: 16,
    color: "rgba(66, 66, 89, 0.48);",
    marginTop: 16,
  },
  uploadBox: {
    backgroundColor: colors.secondary,
    width: "100%",
    height: "auto",
    borderRadius: 4,
    marginTop: 12,
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  uploadIcon: {
    color: "rgba(51, 51, 51, 0.8)",
  },
  uploadArrow: {
    width: "20%",
  },
  appLogo: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },
  profileRightSection: {
    width: "80%",
  },
  uploadRemoveSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  removeSection: {
    textAlign: "center",
    paddingVertical: 5,
    color: "rgba(51, 51, 51, 0.6)",
    fontSize: 16,
  },
  removeFile: {
    borderColor: "rgba(66, 66, 89, 0.24)",
    borderRadius: 4,
    borderWidth: 1,
    width: "30%",
  },
  uploadSection: {
    textAlign: "center",
    paddingVertical: 5,
    color: "#333333",
    fontSize: 14,
    backgroundColor: colors.secondary,
  },
  uploadFile: {
    borderColor: "rgba(51, 51, 51, 0.8)",
    borderRadius: 2,
    borderWidth: 1,
    width: "60%",
  },

  uploadAndRemove: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  uploadImg: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  uploadImgText: {
    color: "rgba(66, 66, 89, 0.64)",
    fontSize: 9,
    lineHeight: 13,
  },
  labelName: {
    color: "rgba(66, 66, 89, 0.48)",
    fontSize: 11,
    marginTop: 16,
  },
  inputContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginTop: 12,
    color: "#333333",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
  },
  inputEmailContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginTop: 12,
    color: "rgba(66, 66, 89, 0.48)",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    opacity: 0.9,
  },
  dateOfBirth: {
    backgroundColor: "rgba(244, 246, 248, 0.2)",
    width: 360,
    marginTop: 12,
    borderRadius: 4,
    color: "#ffffff",
    textAlign: "left",
  },
  signUpButton: {
    width: "100%",
    marginVertical: 30,
    borderRadius: 9,
  },
  signText: {
    textAlign: "center",
    color: colors.textColor,
    fontSize: 18,
    lineHeight: 24,
    paddingVertical: 11,
  },
  phoneNumberView: {
    width: "100%",
    marginTop: 12,
    borderRadius: 4,
    height: 50,
  },
  number: {
    width: "100%",
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginTop: 12,
    color: "#333333",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  code: {
    height: 22,
    color: "#333333",
  },
  signInLabel: {
    color: "rgba(66, 66, 89, 0.48)",
    fontSize: 11,
    marginTop: 16,
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
    color: "rgba(66, 66, 89, 0.64)",
  },
  SignInInputContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginTop: 12,
    color: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 13,
    width: "100%",
  },
  dropGender: {
    backgroundColor: colors.secondary,
    fontSize: 16,
    color: "#333333",
  },
  textContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginTop: 12,
    color: "#333333",
    paddingHorizontal: 15,
  },
  textInputSection: {
    color: "#333333",
    marginTop: 10,
  },
  characterStyle: {
    fontSize: 9,
    lineHeight: 12,
    textAlign: "right",
    color: "rgba(51, 51, 51, 0.6)",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
  },
  loadingStyle: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
