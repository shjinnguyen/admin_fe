import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

// get
export const getSkus = async () => {
  return await axios.get(`${HOST_URL}/skus`);
};

export const saveSku = async (sku) => {
  return await axios.post(`${HOST_URL}/skus`, sku);
};

export const deleteSku = async (id) => {
  return await axios.delete(`${HOST_URL}/skus/${id}`);
};

export const updateSku = async (sku) => {
  return await axios.put(`${HOST_URL}/skus/${sku.id}`, sku);
};
