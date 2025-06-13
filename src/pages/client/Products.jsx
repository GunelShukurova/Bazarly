import React from 'react'
import { GoStar } from "react-icons/go";

const Products = () => {
  return (
    <>
      <div className='mx-40'>
        <div className='mt-8'>
          <h3 className="text-2xl font-semibold mb-6  ">Our Products</h3>
          <p className="  text-lg mb-5 ">
            Discover our wide range of quality products
          </p>
        </div>
        <div className="w-full max-w-8xl flex flex-wrap items-center gap-4 bg-[#F8F6F0] p-6  shadow-sm mt-5 border border-gray-200">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-2 border border-gray-300 w-90 rounded-md focus:outline-none  focus:ring-1 focus:ring-gray-500"
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md w-[23%]"
            name="sort"
            id="sort"

          >
            <option value="username">All Categories</option>
            <option value="email"></option>
            <option value="age"></option>
            <option value="userType"> </option>
            <option value="joinDate"></option>
          </select>

          <select className="px-3 py-2 border border-gray-300 rounded-md  w-[23%]"
          >
            <option value="all">All Prices</option>
            <option value="standard"></option>
            <option value="premium"></option>
            <option value="gold"></option>
            <option value="platinum"></option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md  w-[23%]"
          >
            <option value="all">Name A-Z</option>
            <option value="Minor"> </option>
            <option value="Young Adult"></option>
            <option value="Adult"></option>
            <option value="Senior"></option>
          </select>
        </div>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  mt-15 bg-[#FDFBF6]">

        <div className="max-w-lg  shadow-md overflow-hidden p-4 bg-[#F8F6F0] cursor-pointer relative group">

          <div className='flex flex-col justify-center items-center '>


            <h3 className="text-xl text-center text-shadow-neutral-600 font-normal mb-2 mt-6 ">
              Coca-Cola Classic Can 330ml
            </h3>

            <img
              className="w-55 h-55 my-17 object-cover rounded"
              src="https://cdn.webshopapp.com/shops/263312/files/270320371/650x650x2/coca-cola-original-330ml.jpg"
              alt="Coca-Cola"
            />


            <div className="mb-4">

              <p className="text-md text-center text-neutral-600 mb-2">
                Refreshing carbonated soft drink. Perfect for any occasion.
              </p>
              <span className="block font-normal text-lg text-center mt-3">
                Drinks
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">

              <div className="flex items-center gap-1 text-[#352411b5]">
                <GoStar />
                <GoStar />
                <GoStar />
                <GoStar />
                <GoStar />
                <span className="ml-1 text-[#352411b5]">(4.5)</span>
              </div>


            </div>
            <div className="mt-2 text-md text-[#352411b5] font-medium">50 in stock</div>
          </div>


          <button
            type="submit"

            id="submit"
            className="bg-neutral-700 opacity-0 w-full group-hover:opacity-100 transition-opacity cursor-pointer duration-200 border border-black text-white text-sm px-6 py-2  shadow  mt-4"
          >

            ADD TO CART
            <span className='ml-4 ' >$1.20</span>
          </button>



        </div>


      </div>
           </div>
    </>
  )
}

export default Products
