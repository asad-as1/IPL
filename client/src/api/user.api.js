import axios from "axios";
import Cookies from "js-cookie";
const URI = `${import.meta.env.VITE_URL}`;

export const Login = async (user) => {
  try {
    const res = await axios.post(`${URI}/user/login`, user);
    // console.log(res)
    Cookies.set("user", JSON.stringify(res.data.token));  
    return res;
  } catch (error) {
    console.log("login", error);
    error = { ...error, status: 400 };
    return error;
  }
};

// Register function
export const Register = async (user) => {
  try {
    const res = await axios.post(`${URI}/user/register`, user);
    if (res.status === 200) {
      await Login(user);
    }
    return res;
  } catch (error) {
    error = { ...error, status: 400 };
    return error;
  }
};