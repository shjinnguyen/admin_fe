import axios from "axios";

// get
export const getCategories = async () => {
  return await axios.get("http://localhost:8080/categories");
};

export const saveCategory = async (unit) => {
  return await axios.post("http://localhost:8080/categories", unit);
};

export const deleteCategory = async (id) => {
  return await axios.delete(`http://localhost:8080/categories/${id}`);
};

export const updateCategory = async (unit) => {
  return await axios.put(`http://localhost:8080/categories/${unit.id}`, unit);
};
