import axios from "axios";

// get
export const getSkus = async () => {
  return await axios.get("http://localhost:8080/skus");
};

export const saveSku = async (sku) => {
  return await axios.post("http://localhost:8080/skus", sku);
};

export const deleteSku = async (id) => {
  return await axios.delete(`http://localhost:8080/skus/${id}`);
};

export const updateSku = async (sku) => {
  return await axios.put(`http://localhost:8080/skus/${sku.id}`, sku);
};
