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
  const user = await instance.get(`${endpoints.users}/${userId}`);
  const updatedBasketItems = user.data.basketItems.map(item =>
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );

  return await instance.patch(`${endpoints.users}/${userId}`, { basketItems: updatedBasketItems });
};

export  const deleteCartItem = async (userId, basketItemId) => {

  const user = await instance.get(`${endpoints.users}/${userId}`);
  const updatedBasketItems = user.data.basketItems.filter(item => item.id !== basketItemId);


  return await instance.patch(`${endpoints.users}/${userId}`, { basketItems: updatedBasketItems });
};
export const clearUserCart = async (userId) => {
 return await instance.patch(`${endpoints.users}/${userId}`, {
    basketItems: []
  });
};
