import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

// get
export const getUnits = async () => {
  return await axios.get(`${HOST_URL}/units`);
};

export const saveUnit = async (unit) => {
  return await axios.post(`${HOST_URL}/units`, unit);
};

export const deleteUnit = async (id) => {
  return await axios.delete(`${HOST_URL}/units/${id}`);
};

export const updateUnit = async (unit) => {
  return await axios.put(`${HOST_URL}/units/${unit.id}`, unit);
};
