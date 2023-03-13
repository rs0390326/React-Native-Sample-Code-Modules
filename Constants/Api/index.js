import axios from "axios";
import { BASE_URL } from "../Host";
import AsyncStorage from '@react-native-async-storage/async-storage';


// SingIn API
export const LoginAPI = async (value1, value2) => {
  let config = {
    email: value1,
    password: value2,
  };
  return await axios.post(BASE_URL + "auth/login", config);
};

// SignUpEmail API
export const GenerateOtpAPI = async (value1) => {
  let config = {
    email: value1,
  };
  return await axios.post(BASE_URL + "sendOtp", config);
};

// VerifyOtp API
export const VerifyOtpAPI = async (value1,value2,value3) => {
  let config = {
    email: value1,
    otp: value2,
    user_type: value3
  };
  return await axios.post(BASE_URL + "verify-email", config);
};

// GetProfile by TokenAPI
export const GetProfileTokenAPI = async tokenValue => {
  return await axios.get(BASE_URL + 'getProfile', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokenValue}`,
    },
  });
};

// CreateAccount API
export const CreateAccountAPI = async (
  value1
) => {
  return await axios.post(BASE_URL + "updateProfile", value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// State Api
export const StateAPI = async (state) => {
  return await axios.get(BASE_URL + `zone/state/${state}`);
};

// City Api
export const CityAPI = async (city) => {
  return await axios.get(BASE_URL + `zone/city/${city}`);
};

// country Api
export const CountryAPI = async () => {
  return await axios.get(BASE_URL + "zone/country");
};

// user create account Api
export const UCreateAccountAPI = async (
  value1,
) => {
  return await axios.post(BASE_URL + "updateProfile", value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// editProfile api
export const EditProfileAPI = async (
  value1
) => {
  return await axios.post(BASE_URL + "updateProfile", value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// USEREdit profile api
export const UEditProfileAPI = async (
  value1
) => {
  return await axios.post(BASE_URL + "updateProfile", value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// faqs api
export const FaqAPI = async () => {
  return await axios.get(BASE_URL + 'faqs');
};

// Contact api
export const ContactAPI = async () => {
  return await axios.get(BASE_URL + 'contact');
};

// save services
export const SaveServiceAPI = async (
  value1
) => {
  return await axios.post(BASE_URL + "auth/services", value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// Update service api
export const UpdateServiceAPI = async (id,value1) => {
  return await axios.post(BASE_URL + `auth/services/${id}`, value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// update post
export const UpdatePostAPI = async (id,value1) => {
  return await axios.post(BASE_URL + `auth/post/update/${id}`, value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

export const ChangePasswordAPI = async (value1, value2, value3) => {
  let config = {
    old_password: value1,
    password: value2,
    confirm_password: value3,
  };
  return await axios.post(BASE_URL + 'auth/password-change', config,  {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// add post
export const SavePostApi = async (
  value1
) => {
  return await axios.post(BASE_URL + "auth/post/save", value1, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// get all post
export const AllPostAPI = async () => {
  return await axios.get(BASE_URL + 'auth/post/all');
};

// likeApi 
export const LikePostAPI = async (id, value1) => {
  return await axios.post(BASE_URL + `auth/posts/${id}/like`, value1 , {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};
// CommentApi
export const CommentPostAPI = async (id, value1) => {
  let config = {
    body: value1
  };
  return await axios.post(BASE_URL + `auth/posts/${id}/comments`, config , {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// replyApi
export const ReplyPostAPI = async (id, value1, value2) => {
  let config = {
    body: value1,
    parent_id: value2
  };
  return await axios.post(BASE_URL + `auth/posts/${id}/comments`, config , {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};
// save post
export const SavedPostAPI = async (id, value1) => {
  return await axios.post(BASE_URL + `auth/posts/${id}/savepost`, value1 , {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};
// followApi
export const FollowAPI = async (id, value1) => {
  return await axios.post(BASE_URL + `auth/follow/${id}`, value1 , {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};

// ratingApi
export const RatingPostAPI = async (id, value1, value2) => {
  let config = {
    rating: value1,
    comment: value2
  };
  return await axios.post(BASE_URL + `auth/beauticians/${id}/reviews`, config , {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    },
  });
};