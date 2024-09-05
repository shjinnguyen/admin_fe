import axios from "axios";

// get
export const getSuppliers = async () => {
  return await axios.get("http://localhost:8080/suppliers");
};

export const saveSupplier = async (supplier) => {
  return await axios.post("http://localhost:8080/suppliers", supplier);
};

export const deleteSupplier = async (id) => {
  return await axios.delete(`http://localhost:8080/suppliers/${id}`);
};

export const updateSupplier = async (supplier) => {
  return await axios.put(
    `http://localhost:8080/suppliers/${supplier.id}`,
    supplier
  );
};
