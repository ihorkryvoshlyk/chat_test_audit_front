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
  axios.post("http://localhost:4000/login", userCredential);

const checkUsernameAvailability = (username) =>
  axios.post("http://localhost:4000/usernameAvailable", {
    username
  });

const register = (userCredential) =>
  axios.post("http://localhost:4000/register", userCredential);

const userSessionCheck = (userId) =>
  axios.post("http://localhost:4000/userSessionCheck", {
    userId
  });

const getMessages = (userId, toUserId) =>
  axios.post("http://localhost:4000/getMessages", {
    userId,
    toUserId
  });

export default {
  getUserId,
  removeLS,
  setLS,
  login,
  checkUsernameAvailability,
  register,
  userSessionCheck,
  getMessages
};
