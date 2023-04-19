import axios from "axios";

const getUserId = () =>
  new Promise((resolve, reject) => {
    try {
      resolve(localStorage.getItem("userid"));
    } catch (error) {
      reject(error);
    }
  });

const removeLS = () =>
  new Promise((resolve, reject) => {
    try {
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

const setLS = (key, value) =>
  new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

const login = (userCredential) =>
  axios.post(`/api/auth/signin`, userCredential);

const register = (userCredential) =>
  axios.post(`/api/auth/signup`, userCredential);

const userSessionCheck = (userId) =>
  axios.post(`/api/auth/userSessionCheck`, {
    userId
  });

const getMessages = (userId, toUserId) =>
  axios.post(`/api/message/get-messages`, {
    userId,
    toUserId
  });

const getUserInfo = (userId) => axios.get(`/api/user/user-info/${userId}`);

export default {
  getUserId,
  removeLS,
  setLS,
  login,
  register,
  userSessionCheck,
  getMessages,
  getUserInfo
};
