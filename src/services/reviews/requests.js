import { endpoints } from "../../constants";
import instance from "../instance";




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
    const response = await instance.delete(`${endpoints.reviews}/${id}`);
    return {
      success: true,
      message: "Review deleted successfully",
      data: response.data
    };
  } catch (error) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      message: error.message || "Failed to delete review"
    };
  }
}

export async function addProductReview(newReview) {
  try {
    const response = await instance.post(endpoints.reviews, newReview);
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
  

export async function updateReviewStatus(reviewId, updateInfo) {
  try {
    const response = await instance.patch(`${endpoints.reviews}/${reviewId}`, updateInfo);
    return {
      success: true,
      data: response.data,
      message: "Review status updated successfully",
    };
  } catch (error) {
    console.error("Failed to update review status:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to update review status",
    };
  }
}

export async function updateReview(reviewId, updateInfo) {
  try {
    const response = await instance.patch(`${endpoints.reviews}/${reviewId}`, updateInfo);
    return {
      success: true,
      data: response.data,
      message: "Review updated successfully",
    };
  } catch (error) {
    console.error("Failed to update review:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to update review",
    };
  }
}
