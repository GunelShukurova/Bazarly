import Slider from "../../components/Slider/index.jsx"
import { SlBasket } from "react-icons/sl";
import { GoStar } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { FiShield } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products/requests.js";
import { useNavigate } from 'react-router-dom';




const Home = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    getAllProducts().then((resp) => {
      if (resp) {
        setProducts(resp.data)
      }
    })

  }, [])

 const filteredProducts = (products || []).filter((p) =>
  (p.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
  (p.category?.toLowerCase() || "").includes(search.toLowerCase()) ||
  (p.description?.toLowerCase() || "").includes(search.toLowerCase())
);
  return (
    <div>
      <Slider />
      <div className="w-full max-w-3xl mt-20 mx-auto flex justify-start items-center gap-4 bg-[#F8F6F0] p-3 shadow-sm border border-gray-200">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="px-3 py-2 border border-gray-300 w-full max-w-lg sm:max-w-sm md:max-w-md lg:max-w-3xl  text-lg rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 mx-auto mt-15 bg-[#FDFBF6] px-4 sm:px-6 md:px-8">
        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="max-w-lg  shadow-md overflow-hidden p-4 bg-[#F8F6F0] cursor-pointer relative group">
              <div className='flex flex-col justify-center items-center relative'>
                <h3 className="text-xl text-center text-shadow-neutral-600 font-normal mb-2 mt-2 ">
                  {p.title}
                </h3>
                <img
                  className="w-full max-w-xs h-73 object-cover rounded my-4"
                  src={p.image}
                  alt={p.title}
                />
                <div className="mb-4">
                  <p className="text-lg text-center text-neutral-600 mb-2">
                    {p.description}
                  </p>
                  <span className="block font-normal text-xl text-center mt-3">
                    {p.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-700">
                </div>
              </div>
              <div className="flex justify-center items-center flex-col mb-2">
                {p.isOnSale ? (
                  <>
                    <span className="absolute top-6 left-5 bg-red-800 text-white px-3 py-1 text-sm font-semibold rounded">
                      -{p.salePercentage}%
                    </span>
                    <span className="text-xl text-gray-500 line-through mb-1">${p.price.toFixed(2)}</span>
                    <span className="text-2xl font-bold text-gray-800">
                      ${(p.price * (1 - p.salePercentage / 100)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-black">${p.price.toFixed(2)}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div className="bg-[#FDFBF7] mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left">
            What Our Customers Are Saying
          </h3>
          <p className="text-lg sm:text-xl mb-10 text-center sm:text-left">
            Real feedback from people who love shopping with us.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            <div className="bg-[#F8F6F0] p-6 flex flex-col gap-4 rounded shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  src="https://imgcdn.stablediffusionweb.com/2024/4/16/690a9263-47df-4bcd-af07-fa11264fc9d2.jpg"
                  alt="Sarah Johnson"
                />
                <div>
                  <h4 className="text-xl font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Verified Customer</p>
                  <div className="flex text-yellow-400 mt-1" aria-label="5 star rating">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <time className="text-xs text-gray-500 ml-1">10/07/2025</time>
              <p className="text-base sm:text-lg font-light text-gray-700 mt-2">
                "Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"
              </p>
            </div>
            <div className="bg-[#F8F6F0] p-6 flex flex-col gap-4 rounded shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  src="https://imgcdn.stablediffusionweb.com/2024/4/16/690a9263-47df-4bcd-af07-fa11264fc9d2.jpg"
                  alt="Sarah Johnson"
                />
                <div>
                  <h4 className="text-xl font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Verified Customer</p>
                  <div className="flex text-yellow-400 mt-1" aria-label="5 star rating">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <time className="text-xs text-gray-500 ml-1">10/07/2025</time>
              <p className="text-base sm:text-lg font-light text-gray-700 mt-2">
                "Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"
              </p>
            </div>
            <div className="bg-[#F8F6F0] p-6 flex flex-col gap-4 rounded shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  src="https://imgcdn.stablediffusionweb.com/2024/4/16/690a9263-47df-4bcd-af07-fa11264fc9d2.jpg"
                  alt="Sarah Johnson"
                />
                <div>
                  <h4 className="text-xl font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Verified Customer</p>
                  <div className="flex text-yellow-400 mt-1" aria-label="5 star rating">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <time className="text-xs text-gray-500 ml-1">10/07/2025</time>
              <p className="text-base sm:text-lg font-light text-gray-700 mt-2">
                "Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"
              </p>
            </div>
            <div className="bg-[#F8F6F0] p-6 flex flex-col gap-4 rounded shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  src="https://imgcdn.stablediffusionweb.com/2024/4/16/690a9263-47df-4bcd-af07-fa11264fc9d2.jpg"
                  alt="Sarah Johnson"
                />
                <div>
                  <h4 className="text-xl font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Verified Customer</p>
                  <div className="flex text-yellow-400 mt-1" aria-label="5 star rating">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
              <time className="text-xs text-gray-500 ml-1">10/07/2025</time>
              <p className="text-base sm:text-lg font-light text-gray-700 mt-2">
                "Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FDFBF7] mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mx-10">
              <h3 className="text-3xl font-semibold mb-6  ">Bazarly Subscription</h3>
              <p className="  text-xl mb-10 ">
                Enjoy exclusive benefits and personalized offers. We’re committed to providing you with the best shopping experience possible.
              </p>
              <div className="grid grid-cols-2">
                <div className="   p-6 flex flex-col items-center  ">
                  <span className=" text-5xl mb-4  ">
                    <SlBasket />
                  </span>
                  <h4 className="text-2xl  mb-2 font-light">Fast Delivery</h4>
                </div>
                <div className="flex flex-col items-center justify-center ">
                  <span className="text-5xl mb-4 ">
                    <IoPricetagsOutline />
                  </span>
                  <h4 className="text-xl mb-2 font-light">Best Prices</h4>
                </div>
                <div className=" p-6 flex flex-col items-center justify-center ">
                  <span className=" text-4xl mb-4">
                    <FiShield />
                  </span>
                  <h4 className="text-xl  mb-2 font-light">Secure Shopping</h4>
                </div>
                <div className=" p-6 flex flex-col items-center justify-center ">
                  <span className="text-5xl mb-4">
                    <IoMdTime />
                  </span>
                  <h4 className="text-xl  mb-2 font-light">24/7 Support</h4>
                </div>
              </div>
            </div>
            <div>
              <img src="https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F8F6F0] mt-10">
        <div className="max-w-xl mx-auto py-12 text-center px-4 sm:px-6">
          <h3 className="text-3xl font-normal mb-6">Ready to Start Shopping?</h3>
          <p className="text-gray-600 text-lg mb-10">
            Join thousands of satisfied customers...
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white border border-black text-lg px-14 py-3 hover:bg-gray-100 cursor-pointer"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
