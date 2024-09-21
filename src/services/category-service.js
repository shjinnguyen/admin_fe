import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

// get
export const getCategories = async () => {
  return await axios.get(`${HOST_URL}/categories`);
};

export const saveCategory = async (unit) => {
  return await axios.post(`${HOST_URL}/categories`, unit);
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${HOST_URL}/categories/${id}`);
};

export const updateCategory = async (unit) => {
  return await axios.put(`${HOST_URL}/categories/${unit.id}`, unit);
};
