import instance from "../instance";
import { endpoints } from "../../constants";



export async function getAllReviews() {
    try {
        const response = await instance.get(endpoints.reviews)
        return {
            data: response.data,
            message: "reviews  received successfully!",
        }
    } catch (error) {
        return {
            data: null,
            message: "failed to get reviews!"
        }
    }
}
export async function getReviewsByProductId(id) {
    try {
        const response = await instance.get(`${endpoints.reviews}?productId=${id}`);
        return {
            data: response.data,
            message: "Reviews received successfully!",
            success: true
        };
    } catch (error) {
        return {
            data: null,
            message: "Failed to get reviews!",
            success: false
        };
    }
}

export async function deleteReview(id) {
    try {
        const response = await instance.delete(endpoints.reviews + `/${id}`);
        return {
            data: response.data,
            message: "Review deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting review:", error);
        return {
            data: null,
            message: error.message || "Failed to delete review!"
        };
    }
}

export async function addReview(Newreview) {
    try {
        const response = await instance.post(endpoints.reviews, Newreview);
        if (response.status === 201) { 
            return {
                data: response.data,
                message: "Review created successfully"
            };
        }
        return {
            data: null,
            message: "Failed to create review"
        };
    } catch (error) {
        console.error("Error creating review:", error);
        return {
            data: null,
            message: error.message || "Failed to create review"
        };
    }
}