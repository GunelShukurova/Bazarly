import React from 'react'

const Register = () => {
  return (
    <div>
      <div className="bg-[#FDFBF7] ">
        <form

          id="register-form"
          className="w-full max-w-xl mx-auto mt-12  shadow-md  p-6 border rounded-lg mb-30"
        >
          <div className='flex justify-center items-center flex-col gap-3'>
            <h2 className="text-3xl  font-semibold mt-10">
              Bazarly
            </h2>
            <h3 className='text-2xl font-normal'>Create your account</h3>
            <p className='text-2xl text-gray-600 font-thin'>Join Bazarly and start shopping today!</p>
          </div>


          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="block mb-2 text-md font-medium  pt-6"
            >
              Full Name
            </label>
            <input

              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="bg-[#F8F6F0] border text-md  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />


          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium  pt-6"
            >
              Email address
            </label>
            <input

              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="bg-[#F8F6F0] border text-md  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />

          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="block mb-2 text-md font-medium pt-6"
            >
              Phone Number
            </label>
            <input

              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter phone your number"
              className="bg-[#F8F6F0] border w-full text-md  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>


          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 text-md font-medium text-gray-900 pt-6"
            >
              Password
            </label>
            <input

              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              required
              className="bg-[#F8F6F0] border text-md text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-2 text-md font-medium text-gray-900 pt-6"
            >
              Confirm Password
            </label>
            <input

              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              className="bg-[#F8F6F0] border text-md text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="profileImage"
              className="block mb-2 text-md font-medium text-gray-900 pt-6"
            >
              Profile Image URL (Optional)
            </label>
            <input

              type="text"
              id="profileImage"
              name="profileImage"
              placeholder="Enter image URL"
              className="bg-[#F8F6F0] border w-full text-md text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>

          <div className="flex flex-col w-full items-center">
            <button
              type="submit"

              id="submit"
              className="bg-[#333333] border border-black text-white text-lg px-14 py-2 cursor-pointer w-full mt-10 hover:bg-neutral-800"
            >
              Create account
            </button>
            <span className='mt-7 text-md'>Already have an account? <span className='font-semibold'>Sign in here</span></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
