import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

// get
export const getProducts = async (params) => {
  return await axios.get(`${HOST_URL}/products`, {
    params: params,
  });
};

export const saveProduct = async (product) => {
  return await axios.post(`${HOST_URL}/products`, product);
};

export const linkProduct = async (productId, barcode) => {
  return await axios.post(
    `${HOST_URL}/products/link-barcode/${productId}`,
    {},
    {
      params: { barcode },
    }
  );
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${HOST_URL}/products/${id}`);
};

export const updateProduct = async (product) => {
  return await axios.put(`${HOST_URL}/products/${product?.get("id")}`, product);
};
