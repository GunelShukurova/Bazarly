import Slider from "../../components/Slider/index.jsx"
import { SlBasket } from "react-icons/sl";
import { GoStar } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { FiShield } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";

import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products/requests.js";


const Home = () => {


  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {

    getAllProducts().then((resp) => {
      if (resp) {
        setProducts(resp.data)
      }
    })

  }, [])

const filteredProducts = products.filter((p) =>
  p.title.toLowerCase().includes(search.toLowerCase()) ||
  p.category.toLowerCase().includes(search.toLowerCase()) ||
  p.description.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div>
      <Slider />

      <div className="w-full max-w-3xl  mt-20 ml-30 flex justify-start items-center gap-4 bg-[#F8F6F0] p-3  shadow-sm border border-gray-200">
        <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="px-3 py-2 border border-gray-300 w-200 text-lg rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-500"
        />
      </div>




      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 mx-30 mt-15 bg-[#FDFBF6]">

        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="max-w-lg  shadow-md overflow-hidden p-4 bg-[#F8F6F0] cursor-pointer relative group">

              <div className='flex flex-col justify-center items-center relative'>


                <h3 className="text-xl text-center text-shadow-neutral-600 font-normal mb-2 mt-2 ">
                  {p.title}
                </h3>



                <img
                  className="w-75 h-65 my-17 object-cover rounded"
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

        <div className="mx-30   py-12">

          <div className="mx-10">
            <h3 className="text-3xl font-semibold mb-6  ">What Our Customers Are Saying</h3>
            <p className="  text-xl mb-10">
              Real feedback from people who love shopping with us.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">


              <div className="bg-[#F8F6F0]  p-6 flex flex-col gap-2 ">
                <div className="flex gap-4">
                  <img className="w-20 h-20 rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl">Sarah Johnson</span>
                    <span className="text-lg">Verified Customer</span>

                    <span className="flex"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></span>
                  </div>

                </div>
                <span className="text-xs mt-2 ml-1">02/03/2025</span>
                <p className="text-xl"> "Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"</p>
              </div>


            </div>
          </div>

        </div>
      </div>



      <div className="bg-[#FDFBF7] mt-10">
        <div className="mx-30   py-12">
          <div className="grid grid-cols-2 gap-8">
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
        <div className="mx-30 py-12 text-center">
          <h3 className="text-3xl text-centertext-2xl font-normal mb-6 ">
            Ready to Start Shopping?
          </h3>
          <p className="text-gray-600 max-w-xl text-center mx-auto text-lg mb-10 ">
            Join thousands of satisfied customers and discover the convenience of shopping with Bazarly.
          </p>

          <div className="flex justify-center">
            <button className="bg-white border text-lg border-black px-14 py-3 cursor-pointer hover:bg-gray-100 ">
              Get Started Today
            </button>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Home
