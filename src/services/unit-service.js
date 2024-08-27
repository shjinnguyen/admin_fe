import axios from "axios";

// get
export const getUnits = async () => {
  return await axios.get("http://localhost:8080/units");
};

export const saveUnit = async (unit) => {
  return await axios.post("http://localhost:8080/units", unit);
};

export const deleteUnit = async (id) => {
  return await axios.delete(`http://localhost:8080/units/${id}`);
};

export const updateUnit = async (unit) => {
  return await axios.put(`http://localhost:8080/units/${unit.id}`, unit);
};
