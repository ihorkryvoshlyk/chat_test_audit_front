import axios from "axios";

const endPoint = "https://ee1e-188-43-14-13.eu.ngrok.io";

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
  axios.post(`${endPoint}/api/auth/signin`, userCredential);

const register = (userCredential) =>
  axios.post(`${endPoint}/api/auth/signup`, userCredential);

const userSessionCheck = (userId) =>
  axios.post(`${endPoint}/api/auth/userSessionCheck`, {
    userId
  });

const getMessages = (userId, toUserId) =>
  axios.post(`${endPoint}/api/message/getMessages`, {
    userId,
    toUserId
  });

export default {
  getUserId,
  removeLS,
  setLS,
  login,
  register,
  userSessionCheck,
  getMessages
};
