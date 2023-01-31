import axios from "axios";

const apiUrl = "http://localhost:5000/api/v1";
const userUrl = apiUrl + "/user";

const transUrl = apiUrl + "/transaction";
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

export const getUserIdFromStorage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return user.id;
};

// transaction

export const postTransactionToDb = async (obj) => {
  try {
    const userId = getUserIdFromStorage();
    const { data } = await axios.post(transUrl, obj, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getTransaction = async () => {
  try {
    const userId = getUserIdFromStorage();

    const { data } = await axios.get(transUrl, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
