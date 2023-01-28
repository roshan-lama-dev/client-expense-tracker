import axios from "axios";

const apiUrl = "http://localhost:5000/api/v1";
const userUrl = apiUrl + "/user";
export const registerUser = (obj) => {
  try {
    return axios.post(userUrl, obj);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const loginUser = (obj) => {
  try {
    return axios.post(userUrl + "/login", obj);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
