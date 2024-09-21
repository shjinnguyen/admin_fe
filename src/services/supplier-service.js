import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

// get
export const getSuppliers = async () => {
  return await axios.get(`${HOST_URL}/suppliers`);
};

export const saveSupplier = async (supplier) => {
  return await axios.post(`${HOST_URL}/suppliers`, supplier);
};

export const deleteSupplier = async (id) => {
  return await axios.delete(`${HOST_URL}/suppliers/${id}`);
};

export const updateSupplier = async (supplier) => {
  return await axios.put(`${HOST_URL}/suppliers/${supplier.id}`, supplier);
};
