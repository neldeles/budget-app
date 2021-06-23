import axios from "axios";

const baseUrl = "http://localhost:5000/category";

const create = async (data, config) => {
  const response = await axios.post(`${baseUrl}/create`, data, config);
  return response.data;
};

const getCurrentBudget = async (config) => {
  const response = await axios.get(`${baseUrl}/currentBudget`, config);
  return response.data;
};

const category = { create, getCurrentBudget };

export default category;
