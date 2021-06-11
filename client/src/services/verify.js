import axios from "axios";

const baseUrl = "http://localhost:5000/auth/is-verify";

const verify = async (config) => {
  const response = await axios.get(baseUrl, config);
  console.log(response);
  return response.data;
};

export default { verify };
