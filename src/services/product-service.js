import axios from "axios";

// get
export const getProducts = async () => {
  return await axios.get("http://localhost:8080/products");
};

export const saveProduct = async (product) => {
  return await axios.post("http://localhost:8080/products", product);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`http://localhost:8080/products/${id}`);
};

export const updateProduct = async (product) => {
  return await axios.put(
    `http://localhost:8080/products/${product.id}`,
    product
  );
};
