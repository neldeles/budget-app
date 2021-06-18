import axios from "axios";

const baseUrl = "http://localhost:5000/budget/";

const getAll = async (config) => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const budget = { getAll };

export default budget;
