
import { GoStar } from "react-icons/go";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getProductsById } from "../../services/products/requests";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa6";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { addProductReview, deleteReview, getReviewsByProductId } from "../../services/reviews/requests";
import { FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from "notistack";
import { updateUserBasket } from "../../services/users/requests";
import { useCart } from "../../context/cartContext";
import { useFavorites } from "../../context/favoriteContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const { cartItems, setCartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user.users);
  const userId = user?.id || "defaultUserId";
  const { favorites, setFavorites } = useFavorites();

  const toggleFavorite = () => {
    setFavorites(prevFavorites => {
      let newFavorites;
      const isAlreadyFavorite = prevFavorites.some(item => item.id === product.id);
      if (isAlreadyFavorite) {
        newFavorites = prevFavorites.filter(item => item.id !== product.id);
        enqueueSnackbar("Product removed from favorites", { variant: "success" });
      } else {
        newFavorites = [...prevFavorites, product];
        enqueueSnackbar("Product added to favorites", { variant: "success" });
      }
      return newFavorites;
    });
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data, message } = await addProductReview({
        userId: user?.id,
        productId: id,
        comment: reviewMessage,
        rating: reviewRating,
        fullName: user?.fullName,
        profileImage: user?.profileImage,
        createdAt: new Date().toISOString(),
      });

      console.log("response", { data, message });
      if (data) {
        setReviewMessage("");
        setReviewRating(0);
        await rewId();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const { success, message } = await deleteReview(reviewId);
      if (success) {
        await rewId();
        enqueueSnackbar("Review deleted successfully!", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const rewId = async () => {
    try {
      const response = await getReviewsByProductId(id);
      console.log("Fetched reviews from server:", response.data);
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProductsById(id)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        setIsLoading(false);
      });

    rewId();
  }, [id]);

  const handleQuantityChange = (e) => {
    const val = Number(e.target.value);
    if (val < 1) {
      setQuantity(1);
    } else if (val > product.inStock) {
      setQuantity(product.inStock);
    } else {
      setQuantity(val);
    }
  };

  const handleAddToCart = () => {
    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      let newCart;

      if (existingIndex >= 0) {
        const newQuantity = prevCart[existingIndex].quantity + quantity;
        newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newQuantity > product.inStock ? product.inStock : newQuantity,
        };
      } else {
        newCart = [
          ...prevCart,
          {
            ...product,
            userId: userId,
            quantity: quantity > product.inStock ? product.inStock : quantity,
          }
        ];
      }
      if (userId !== "defaultUserId") {
        updateUserBasket(userId, newCart)
          .then(() => {
            enqueueSnackbar("Product added to cart", { variant: "success" });
          })
          .catch(() => {
            enqueueSnackbar("Error updating cart on server", { variant: "error" });
          });
      } else {
        enqueueSnackbar("Product added to cart", { variant: "success" });
      }
      return newCart;
    });
  };

  if (isLoading) return <div>Loading...</div>;

  const rating = product.rating || 0;
  const maxRating = 5;
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const isHalfFilled = rating % 1 >= 0.5;
    const emptyStars = maxRating - filledStars - (isHalfFilled ? 1 : 0);
    let stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`filled-${i}`} className="text-yellow-500" />);
    }

    if (isHalfFilled) {
      stars.push(<StarHalfIcon key="half" className="text-yellow-500" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 pt-16">
        <button onClick={() => navigate("/products")} className="px-3 py-1 bg-[#ccbe94] mt-10 cursor-pointer hover:bg-[#b1a478]  text-white text-md font-semibold rounded-lg ">
          Back to Products
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 mt-10">
          <div className="flex justify-center">
            <img
              src={product.image} alt={product.title}
              className="w-full h-85 max-w-xl object-contain rounded-lg shadow-md"
            />
          </div>
          <div>
            <div className="bg-[#FDFBF7] p-6 rounded-lg shadow-md">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#352411b5] mb-2">{product.title}</h3>
              <div className="text-2xl text-gray-700 mb-2">{product.category}</div>
              <div className="mb-6">
                <p className="text-xl text-neutral-600 mt-2">
                  {product.description}
                </p>
              </div>
              <div className="mb-6">
                <span className="text-2xl text-neutral-600 mt-2">${product.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700 mb-6">
                <div className="flex items-center gap-1 text-lg text-[#352411b5]">
                  {renderStars(rating)}
                  <span className="ml-2 text-[#352411b5]">{rating} out of {maxRating}</span>
                </div>
                <div className="text-md font-medium text-gray-700">
                  In Stock ({product.inStock} available)
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-lg font-semibold text-gray-800">
                <div className="flex items-center gap-4">
                  <span>Quantity</span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e)}
                    className="w-16 py-2 px-4 border border-gray-300 rounded-lg text-center"

                  />
                </div>
                <div className="flex gap-3 text-white">
                  <button
                    onClick={toggleFavorite}
                    className={`px-4 py-2 rounded-lg transition-colors ${favorites.some(item => item.id === product.id) ? 'bg-red-900 text-white' : 'bg-[#ccbe94] text-white'
                      }`}
                    aria-label="Toggle favorite"
                  >
                    <FavoriteIcon />
                  </button>
                  <button onClick={handleAddToCart} className="px-6 py-3 bg-[#ccbe94] cursor-pointer hover:bg-[#b1a478]  text-white text-lg font-semibold rounded-lg ">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl  text-[#2f1f0cb5] mb-2">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-4">
                  <div className="flex items-center gap-6">
                    <div id="reviews" className="border-amber-900 rounded-lg pt-4 max-w-full">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={review.profileImage || "https://placehold.co/80x80"}
                        alt={review.fullName || "User Avatar"}
                      />
                    </div>
                    <div className="flex flex-col gap-4 mt-6 border-b border-gray-300 pb-4">
                      <span className="font-semibold pb-1 text-xl">{review.fullName}</span>
                      <span>{review.createdAt ? moment(review.createdAt).format('DD MMMM YYYY') : ''}</span>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    {renderStars(review.rating)}
                  </div>
                  <div>
                    <p className="text-lg">{review.comment}</p>
                  </div>
                  {review.adminReply && (
                    <div className="bg-gray-100 border-l-4 border-amber-700 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-700">Admin reply</p>
                      <p className="text-base text-gray-700">{review.adminReply}</p>
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review.id)}
                      id="submit"
                      className="bg-red-800 border  text-white text-md rounded px-3  py-1 cursor-pointer w-20  mt-2 ml-1 hover:bg-neutral-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (<div>No reviews yet.</div>
            )}
            <div>
            </div>
          </div>
          <div>
            <form onSubmit={handleReviewSubmit} className="w-full max-w-2xl" id="add-review-form">
              <div className="flex items-center gap-4">
                <label htmlFor="textarea" className="font-bold text-2xl sm:text-3xl  text-[#2f1f0cb5] mb-1">
                  Add Your Review
                </label>
                <div className="text-sm text-gray-700 ">
                  <div className="flex items-center gap-1 text-lg text-[#352411b5] cursor-pointer">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} onClick={() => setReviewRating(index + 1)}>
                        {index < reviewRating ? (
                          <FaStar className="text-yellow-500" />
                        ) : (
                          <GoStar className="text-yellow-500" />
                        )}
                      </span>
                    ))}

                  </div></div>
              </div>
              <div id="rating-stars" className="flex gap-1 mb-3">
              </div>
              <textarea
                id="review-message"
                name="reviewMessage"
                rows="4"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                className="w-full border-2 border-gray- text-xl text-blue-950  border-[#ccbe94] rounded-lg p-3"
                placeholder="Write your review..."
              />
              <button
                type="submit"
                disabled={isSubmitting || !reviewMessage || reviewRating === 0}
                className="bg-[#ccbe94] cursor-pointer hover:bg-[#ada178] text-white mt-5 mb-10 w-full sm:w-60 rounded px-2 py-4"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};




export default ProductDetail
