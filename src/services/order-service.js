import axios from "axios";

const HOST_URL = process.env.REACT_APP_HOST_URL;

// get
export const getOrders = async () => {
  return await axios.get(`${HOST_URL}/orders`);
};

export const getOrderDetails = async (orderId) => {
  return await axios.get(`${HOST_URL}/orders/${orderId}`);
};

export const makeOrder = async (data) => {
  return await axios.post(`${HOST_URL}/orders`, data);
};
