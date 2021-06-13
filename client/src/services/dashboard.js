import axios from "axios";

const baseUrl = "http://localhost:5000/dashboard";

const dashboard = async (config) => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default dashboard;
