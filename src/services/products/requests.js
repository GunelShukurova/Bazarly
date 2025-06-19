import instance from "../instance";
import { endpoints } from "../../constants";


export async function getAllProducts() {
    try {
        const response = await instance.get(endpoints.products)
        return {
            data: response.data,
            message: "products received successfully"
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to fetch products"
        }
    }
}

export async function getProductsById(id) {
    
    try {
        const response = await instance.get(`${endpoints.products}/${id}`);
        return {
            data: response.data,
            message: "products received successfully"
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            data: null,
            message: "failed to fetch products!"
        }
    }
}


export async function postProducts(newProduct) {
  try {
    const response = await instance.post(endpoints.products, newProduct);
    return response;  
  } catch (error) {
      console.error('postProducts error:', error.response || error);
    throw error;
  }
}

export async function updatedProducts(id, updatedProducts) {
    try {
        const response = await instance.patch(endpoints.products + `/${id}`,
            updatedProducts
        )
        return {
            data: response.data,
            message: "products updated successfully"
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to fetch products!"
        }
    }
}

export async function deleteProducts(id) {

    try {
        const response = await instance.delete(endpoints.products + `/${id}`);
        return {
            data: response.data,
            message: "products deleted successfully"
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to fetch products!"
        }
    }
}

export const getAllOrders = async () => {
  try {
    const response = await instance.get(endpoints.orders);
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = (id, status) => {
  return instance(`/orders/${id}`, { status });
};