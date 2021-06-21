import axios from "axios";

const baseUrl = "http://localhost:5000/dashboard";

const getUser = async (config) => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const dashboard = { getUser };
export default dashboard;
