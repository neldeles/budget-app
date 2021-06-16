import axios from "axios";

const baseUrl = "http://localhost:5000/categorygroup";

const create = async (data, config) => {
  const response = await axios.post(`${baseUrl}/create`, data, config);
  return response.data;
};

const getUnique = async (config) => {
  const response = await axios.get(`${baseUrl}/uniqueGroups`, config);
  return response.data;
};

const categoryGroup = { create, getUnique };

export default categoryGroup;
