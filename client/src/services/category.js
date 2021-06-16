import axios from "axios";

const baseUrl = "http://localhost:5000/category";

const create = (data, config) => {
  const response = axios.post(`${baseUrl}/create`, data, config);
  return response.data;
};

const category = { create };

export default category;
