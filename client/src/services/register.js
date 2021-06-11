import axios from "axios";

const baseUrl = "http://localhost:5000/auth/register";

const register = async (data) => {
  console.log("register service initiated");
  const response = await axios.post(baseUrl, data);
  return response.data;
};

export default register;
