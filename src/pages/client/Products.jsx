import React, { useEffect, useState } from "react";
import { GoStar } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { getAllProducts } from "../../services/products/requests";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FaStar, FaRegStar } from "react-icons/fa";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import {
  fetchUserBasket,
  updateUserBasket,
} from "../../services/users/requests";
import { useCart } from "../../context/cartContext";
import { useFavorites } from "../../context/favoriteContext";

const Products = () => {
  const { favorites, setFavorites } = useFavorites();
  const { cartItems, setCartItems } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
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

  useEffect(() => {
    getAllProducts().then((resp) => {
      if (resp.data) {
        setProducts(resp.data);
      }
    });
  }, []);

  const handleAddToCart = (product) => {
    if (!userId) {
      enqueueSnackbar("Please log in to add items to the cart.", {
        variant: "warning",
      });
      return;
    }
    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id,
      );
      let newCart;
      if (existingIndex >= 0) {
        newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1,
        };
      } else {
        newCart = [
          ...prevCart,
          {
            ...product,
            userId: userId,
            quantity: 1,
          },
        ];
      }

      updateUserBasket(userId, newCart)
        .then((resp) => {
          if (!resp.data) {
            enqueueSnackbar("Failed to update basket on server", {
              variant: "error",
            });
          }
        })
        .catch(() => {
          enqueueSnackbar("Server error while updating basket", {
            variant: "error",
          });
        });

      return newCart;
    });
    enqueueSnackbar("Product added to cart", { variant: "success" });
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUserBasket(userId)
      .then((resp) => {
        if (resp.data) {
          setCartItems(resp.data);
          localStorage.setItem("basket", JSON.stringify(resp.data));
        }
      })
      .catch(() => {
        enqueueSnackbar("Failed to load basket from server", {
          variant: "error",
        });
      });
  }, [userId]);

  const toggleFavorite = (product) => {
    if (!userId) {
      enqueueSnackbar("Please log in to add favorites.", {
        variant: "warning",
      });
      return;
    }
    const isFav = favorites.find((f) => f.id === product.id);

    if (isFav) {
      setFavorites(favorites.filter((f) => f.id !== product.id));
      enqueueSnackbar("Removed from favorites", { variant: "success" });
    } else {
      setFavorites([...favorites, product]);
      enqueueSnackbar("Added to favorites", { variant: "success" });
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || p.category === filter;
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under50" && p.price < 50) ||
      (priceRange === "50to200" && p.price >= 50 && p.price <= 200) ||
      (priceRange === "over200" && p.price > 200);
    return matchesSearch && matchesFilter && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const types = [
    "electronics",
    "clothing",
    "shoes",
    "home-accessories",
    "furniture",
    "accessories",
  ];

  return (
    <>
      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40">
        <div className="pt-20 sm:pt-20">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
            Our Products
          </h3>
          <p className="text-base sm:text-xl mb-5">
            Discover our wide range of quality products
          </p>
        </div>
        <div className="w-full max-w-8xl flex flex-wrap items-center gap-4 bg-[#F8F6F0] p-4 sm:p-6 shadow-sm mt-5 border border-gray-200">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="px-3 py-2 border border-gray-300 w-full sm:w-[35%] text-lg rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border text-lg border-gray-300 rounded-md w-full sm:w-[23%]"
            name="sort"
            id="sort"
          >
            <option value="All">All Categories</option>
            {types &&
              types.map((type, idx) => {
                return (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                );
              })}
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-3 py-2 border text-lg border-gray-300 rounded-md w-full sm:w-[23%]"
          >
            <option value="all">All Prices</option>
            <option value="under50">Under $50</option>
            <option value="50to200">$50 - $200</option>
            <option value="over200">Over $200</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border text-lg border-gray-300 rounded-md w-full sm:w-[23%]"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="price-asc"> Price Low to High</option>
            <option value="price-desc"> Price High to Low</option>
            <option value="rating-desc"> Highest Rated</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-8 mt-10 bg-[#FDFBF6]">
          {sortedProducts.length ? (
            sortedProducts.map((p) => (
              <div
                key={p.id}
                className="max-w-lg  shadow-md overflow-hidden p-4 bg-[#F8F6F0] cursor-pointer relative group"
              >
                <div className="flex flex-col justify-center items-center relative">
                  <div className="grid w-full grid-cols-3 items-center mb-2 mt-2">
                    <div className="flex items-center justify-start">
                      {p.isOnSale && (
                        <span className="bg-red-800 text-white px-4 py-1 text-sm font-semibold rounded">
                          {p.salePercentage}%
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl text-center text-shadow-neutral-600 font-normal">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        to={`/product/${p.id}`}
                        className="underline cursor-pointer text-sm"
                      >
                        Detail
                      </Link>
                      {userId && (
                        <span
                          className="cursor-pointer text-gray-700 text-lg sm:text-xl md:text-2xl"
                          onClick={() => toggleFavorite(p)}
                        >
                          {favorites.find((f) => f.id === p.id) ? (
                            <FavoriteIcon className="text-red-800 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                          ) : (
                            <IoMdHeartEmpty className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                 
                  <Link
                    to={`/product/${p.id}`}
                    className="text-2xl cursor-pointer z-10"
                  >
                    <img
                      className="w-75 h-65 my-17 object-cover rounded"
                      src={p.image}
                      alt={p.title}
                    />
                  </Link>
                  <div className="mb-4">
                    <p className="text-lg text-center text-neutral-700 mb-2">
                      {p.description}
                    </p>
                    <span className="block font-normal text-xl text-center mt-3">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-1 text-lg text-[#352411b5]">
                      {renderStars(p.rating)}
                      <span className="ml-1 text-[#352411b5]">{p.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-md text-[#352411b5] text-md font-medium">
                    {" "}
                    {p.inStock} in stock
                  </div>
                </div>
                <button
                  type="submit"
                  id="submit"
                  onClick={() => handleAddToCart(p)}
                  className="bg-neutral-700 opacity-0 text-md w-full group-hover:opacity-100 flex justify-center gap-3 transition-opacity cursor-pointer duration-200 border border-black text-white px-6 py-2  shadow  mt-4"
                >
                  ADD TO CART
                  {p.isOnSale ? (
                    <div className="flex gap-2 items-center justify-center">
                      <span className="line-through text-md text-gray-300">
                        ${p.price.toFixed(2)}
                      </span>
                      <span className="font-semibold text-md text-gray-100">
                        ${(p.price * (1 - p.salePercentage / 100)).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="ml-4 font-semibold">
                      ${p.price.toFixed(2)}
                    </span>
                  )}
                </button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Products;
