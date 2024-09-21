import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

export const getInventories = async () => {
  return await axios.get(`${HOST_URL}/api/inventory`);
};

export const importInventory = async (data) => {
  return await axios.post(`${HOST_URL}/api/inventory/import`, data);
};

export const exportInventory = async (data) => {
  return await axios.post(`${HOST_URL}/api/inventory/export`, data);
};
