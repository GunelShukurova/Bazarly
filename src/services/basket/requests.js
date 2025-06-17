import instance from "../instance"; 
import { endpoints } from "../../constants";


export const getUserCart = async (userId) => {
  const response = await instance.get(`${endpoints.users}/${userId}`);
  return response.data.basketItems;
};


export const addToCart = async (userId, item) => {
  return await instance.post(`${endpoints.users}/${userId}/basketItems`, item);
};


export const updateCartItem = async (userId, itemId, newQuantity) => {
  return await instance.put(`${endpoints.users}/${userId}/basketItems/${itemId}`, {
    quantity: newQuantity,
  });
};

export const deleteCartItem = async (userId, itemId) => {
  return await instance.delete(`${endpoints.users}/${userId}/basketItems/${itemId}`);
};


export const clearUserCart = async (userId) => {
  return await instance.delete(`${endpoints.users}/${userId}/basketItems`);
};
