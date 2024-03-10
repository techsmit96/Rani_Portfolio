import axios from "axios";
import { API_URL } from "../config/config";
// const API_URL = "http://betaanalyticsapi.eniclub.in/api/v1/";

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// const API_URL = "http://localhost:4077/api/v1/";
// const API_URL = "http://devanalyticsapi.eniclub.in/api/v1/";
const register = (username, email, password) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};

const login = (body) => {
  const randomString = [...Array(16)]
    .map(() => ((Math.random() * 36) | 0).toString(36))
    .join("");
  body.device_id = randomString;
  return axios
    .post(API_URL + "dashboard/login", body)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        return { status: true, data: response.data.data };
      }
    })
    .catch((err) => {
      return { status: false, message: err.message, invalid: true };
    });
};

const fetchRole = (body) => {
  return axiosApi
    .post(API_URL + "users/get-profile", body)
    .then((response) => {
      if (response.status === 200) {
        return {
          status: true,
          data: response.data,
          visible:
            response.data.data.length === 0
              ? false
              : response.data.data.length !== 1
              ? true
              : false,
        };
      }
    })
    .catch((err) => {
      return { status: false, message: err.message, invalid: true };
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const autoLogout = () => {
  const user = JSON.parse(localStorage.getItem("user")) ?? {};
  const token = user.token;
  if (token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axiosApi
    .post(API_URL + "v1/logout", {})
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    })
    .catch((err) => {
      return { status: false, message: err.message, invalid: true };
    });
};

export default {
  register,
  login,
  logout,
  autoLogout,
  fetchRole,
};
