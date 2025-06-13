import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="bg-[#FDFBF7] ">
        <form

          id="login-form"
          className="w-full max-w-lg mx-auto mt-12  shadow-md  p-6 border rounded-lg mb-30"
        >
          <div className='flex justify-center items-center flex-col gap-3'>
            <h2 className="text-3xl  font-semibold mt-10">
              Bazarly
            </h2>
            <h3 className='text-2xl font-normal'>Sign in to your account</h3>
            <p className='text-2xl text-gray-600 font-thin'>Welcome back! Please enter your details.</p>
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
              placeholder="Enter your email"
              required
              className="bg-[#F8F6F0] border text-md  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
              placeholder="Enter your password"
              required
              className="bg-[#F8F6F0] border text-md text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div className="flex flex-col w-full items-center">
            <button
              type="submit"

              id="submit"
              className="bg-[#333333] border border-black text-white text-lg px-14 py-2 cursor-pointer w-full mt-10 hover:bg-neutral-800"
            >
              Sign in
            </button>
            <span className='mt-7 text-md'>Don't have an account? <span className='font-semibold'>Sign up here</span></span>
          </div>
        </form>
      </div >
    </div >
  )
}

export default Login
