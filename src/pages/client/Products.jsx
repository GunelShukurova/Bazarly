import React, { useEffect, useState } from 'react'
import { GoStar } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { getAllProducts } from '../../services/products/requests';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';
import { Link } from 'react-router';



const Products = () => {


  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [products, setProducts] = useState([]);


  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };


  const toggleFavorite = (product) => {
    const isFav = favorites.find((f) => f.id === product.id);
    if (isFav) {
      setFavorites(favorites.filter((f) => f.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  useEffect(() => {
    getAllProducts().then((resp) => {
      if (resp.data) {
        setProducts(resp.data);
      }
    });
  }, []);


  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || p.category === filter;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under50" && p.price < 50) ||
        (priceRange === "50to200" && p.price >= 50 && p.price <= 200) ||
        (priceRange === "over200" && p.price > 200);


      return matchesSearch && matchesFilter && matchesPrice;
    })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
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
    "accessories"
  ];


  return (
    <>
      <div className='mx-40'>
        <div className='mt-8'>
          <h3 className="text-3xl font-semibold mb-6  ">Our Products</h3>
          <p className="  text-xl mb-5 ">
            Discover our wide range of quality products
          </p>
        </div>
        <div className="w-full max-w-8xl flex flex-wrap items-center gap-4 bg-[#F8F6F0] p-6  shadow-sm mt-5 border border-gray-200">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="px-3 py-2 border border-gray-300 w-90 text-lg rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}

            className="px-3 py-2 border text-lg border-gray-300 rounded-md w-[23%]"
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
            className="px-3 py-2 border text-lg border-gray-300 rounded-md w-[23%]"
          >
            <option value="all">All Prices</option>
            <option value="under50">Under $50</option>
            <option value="50to200">$50 - $200</option>
            <option value="over200">Over $200</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 border text-lg border-gray-300 rounded-md  w-[23%]"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="price-asc"> Price Low to High</option>
            <option value="price-desc"> Price High to Low</option>
            <option value="rating-desc"> Highest Rated</option>

          </select>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14  mt-15 bg-[#FDFBF6]">

          {sortedProducts.length ? (
            sortedProducts.map((p) => (
              <div key={p.id} className="max-w-lg  shadow-md overflow-hidden p-4 bg-[#F8F6F0] cursor-pointer relative group">
                {p.isOnSale && (
                  <span className="absolute top-6 left-5 bg-red-800 text-white px-4 py-1 text-sm font-semibold rounded z-10">
                    {p.salePercentage}%
                  </span>
                )}
                <div className='flex flex-col justify-center items-center relative'>


                  <h3 className="text-xl text-center text-shadow-neutral-600 font-normal mb-2 mt-2 ">
                    {p.title}
                  </h3>
                  <span
                    className="text-2xl cursor-pointer z-10"
                    onClick={() => toggleFavorite(p)}
                  >
                    {favorites.find((f) => f.id === p.id) ? (
                      <FavoriteIcon className='text-red-800 absolute top-1  right-4 ' />
                    ) : (
                      <IoMdHeartEmpty  className='absolute top-1 right-4 '/>
                    )}
                  </span>

 <Link to={`/product/${p.id}`} className="text-2xl cursor-pointer z-10">
                  <img
                    className="w-75 h-65 my-17 object-cover rounded"
                    src={p.image}
                    alt={p.title}
                  />
  </Link>

                  <div className="mb-4">

                    <p className="text-lg text-center text-neutral-600 mb-2">
                      {p.description}
                    </p>
                    <span className="block font-normal text-xl text-center mt-3">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-700">

                    <div className="flex items-center gap-1 text-lg text-[#352411b5]">
                      <GoStar />
                      <GoStar />
                      <GoStar />
                      <GoStar />
                      <GoStar />
                      <span className="ml-1 text-[#352411b5]">{p.rating}</span>
                    </div>


                  </div>
                  <div className="mt-2 text-md text-[#352411b5] text-md font-medium"> {p.inStock}  in stock</div>
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
                    <span className="ml-4 font-semibold">${p.price.toFixed(2)}</span>
                  )}
                </button>


              </div>
        ))
        ) : (
        <p>No products found.</p>
          )}
      </div>
    </div >
    </>
  );
};
export default Products
