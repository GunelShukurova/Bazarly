import { useEffect, useState } from "react";
import { GoStar } from "react-icons/go";
import { useSnackbar } from 'notistack';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToCart, updateCartItem } from "../../services/basket/requests";
import { fetchUserBasket } from "../../services/users/requests";
import { FaStar, FaRegStar } from "react-icons/fa";
import StarHalfIcon from "@mui/icons-material/StarHalf";


const Favorites = () => {

  const [favorites, setFavorites] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const renderStars = (rating, maxRating = 5) => {
    const filled = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = maxRating - filled - (half ? 1 : 0);
    const stars = [];

    for (let i = 0; i < filled; i++) {
      stars.push(<FaStar key={`filled-${i}`} className="text-yellow-500" />);
    }
    if (half) {
      stars.push(<StarHalfIcon key="half" className="text-yellow-500" />);
    }
    for (let i = 0; i < empty; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }
    return stars;
  };

  const handleAddToCart = async (product) => {
    const userId = JSON.parse(localStorage.getItem("userId"));

    if (!userId || userId === "null") {
      enqueueSnackbar("Please log in to add items to the cart.", { variant: "warning" });
      return;
    }

    try {

      const userRes = await fetchUserBasket(userId);
      if (!userRes.success) {
        enqueueSnackbar("Failed to fetch basket", { variant: "error" });
        return;
      }

      const basketItems = userRes.data;
      const existingItem = basketItems.find(item => item.id === product.id);

      if (existingItem) {

        await updateCartItem(userId, product.id, existingItem.quantity + 1);
      } else {

        await addToCart(userId, { ...product, quantity: 1 });
      }

      enqueueSnackbar("Product added to cart!", { variant: "success" });

    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to add to cart.", { variant: "error" });
    }
  };

  const removeFavorite = (productId) => {
    const updated = favorites.filter((f) => f.id !== productId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    enqueueSnackbar("Product removed from favorites", { variant: "success" });
  };

  return (
    <div>
      <div className="bg-[#FDFBF7] pt-15">
        <div className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-2 sm:mx-10">
            <h3 className="text-3xl font-semibold mb-6">My Favorites</h3>
            <p className="text-xl mb-10">Products you've saved for later</p>
            {favorites.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 md:gap-8">
                {favorites.map((f) => (
                  <div
                    key={f.id}
                    className="max-w-full shadow-md overflow-hidden p-4 bg-[#F8F6F0] cursor-pointer relative group"
                  >
                    {f.isOnSale && (
                      <span className="absolute top-4 left-5 bg-red-800 text-white px-4 py-1 text-sm font-semibold rounded z-10">
                        {f.salePercentage}%
                      </span>
                    )}
                    <div className='flex flex-col justify-center items-center relative'>

                      <h3 className="text-xl text-center text-shadow-neutral-600 font-normal mb-2 mt-2 ">
                        {f.title}
                      </h3>
                      <span
                        className="text-2xl absolute top-0 right-1 text-red-800 cursor-pointer z-20"
                        onClick={() => removeFavorite(f.id)}
                        title="Remove from favorites"
                      >
                        <FavoriteIcon />
                      </span>
                      <img
                        className="w-full max-w-xs h-78 sm:h-66 md:h-64 lg:h-72 xl:h-88 object-cover rounded"
                        src={f.image}
                        alt={f.title}
                      />
                      <div className="mb-4 px-2 sm:px-4">
                        <p className="text-lg text-center text-neutral-600 mb-2">
                          {f.description}
                        </p>
                        <span className="block font-normal text-xl text-center mt-3 text-gray-700">
                          {f.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-700 w-full px-4">
                        <div className="flex items-center gap-1 text-lg text-[#352411b5]">
                          {renderStars(f.rating)}
                          <span className="ml-1 text-[#352411b5]">{f.rating}</span>
                        </div>
                        <div className="text-md font-medium text-[#352411b5]">
                          {f.inStock} in stock
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(f)}
                        className="w-full mt-4 bg-neutral-700 text-white text-sm px-6 py-2 rounded shadow border border-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center gap-3 cursor-pointer max-w-full"
                      >
                        ADD TO CART
                        {f.isOnSale ? (
                          <div className="flex gap-2 items-center justify-center">
                            <span className="line-through text-md text-gray-300">
                              ${f.price.toFixed(2)}
                            </span>
                            <span className="font-semibold text-md text-gray-100">
                              ${(f.price * (1 - f.salePercentage / 100)).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="ml-4 font-semibold">${f.price.toFixed(2)}</span>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl text-gray-500 text-center">You have no favorite products yet.</p>
            )}
          </div>
        </div>
      </div >
    </div >
  );
};
export default Favorites
