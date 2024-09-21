import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

// get
export const getProducts = async () => {
  return await axios.get(`${HOST_URL}/products`);
};

export const saveProduct = async (product) => {
  return await axios.post(`${HOST_URL}/products`, product);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${HOST_URL}/products/${id}`);
};

export const updateProduct = async (product) => {
  return await axios.put(`${HOST_URL}/products/${product.id}`, product);
};
