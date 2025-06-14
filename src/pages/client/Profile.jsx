import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const tabHeaders = [
  "Order History",
  "Update Profile",
  "Change Password"
];

const Profile = () => {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="bg-[#FDFBF7] mt-10">

        <div className="mx-30   py-12">

          <div className="mx-10">
            <h3 className="text-3xl font-semibold mb-6  ">My Profile</h3>
            <p className="  text-xl mb-10">
              Manage your account and view your orders
            </p>
            <div className="flex gap-10 items-start">

              <div className="bg-[#F8F6F0] shadow-md p-6 text-center space-y-4 rounded-lg w-100">
                <img
                  className="w-32 h-32 mx-auto object-cover rounded-full border-4"
                  src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
                  alt="User Avatar"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Alice Johnson</h2>
                  <p className="text-gray-500 text-lg">alice@example.com</p>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-medium text-lg">Member since:</span>
                  <span className='text-lg font-semibold  text-gray-700'>2024</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-medium text-lg">Balance:</span>
                  <span className="text-gray-700 font-semibold text-lg">$150.00</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-medium text-lg">Total Orders:</span>
                  <span className="text-gray-700 font-semibold text-lg">1</span>
                </div>
              </div>


              <div className="flex-1">
                <div className="flex gap-4 mb-6">
                  {["My Orders", "Update Profile", "Change Password"].map((label, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`px-5 py-2 rounded-lg text-md font-medium shadow transition-all cursor-pointer duration-200
        ${activeTab === index
                          ? "bg-[#ccbe94] text-white text-lg"
                          : "bg-[#F8F6F0] text-gray-700 text-lg hover:bg-blue-100"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="bg-[#F8F6F0] p-4 rounded shadow">
                  <span className="text-2xl font-semibold">{tabHeaders[activeTab]}</span>
                  {activeTab === 0 && (
                    <table className="min-w-full border my-3 border-gray-300">

                      <thead>
                        <tr>
                          <th className="py-2 px-4  text-lg text-left">Order ID</th>
                          <th className="py-2 px-4 text-lg text-left">Date</th>
                          <th className="py-2 px-4 text-lg  text-left">	Items</th>
                          <th className="py-2 px-4 text-lg  text-left">Total</th>
                          <th className="py-2 px-4 text-lg  text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 text-lg">#12345</td>
                          <td className="py-2 px-4 text-lg ">2024-05-12</td>
                          <td className="py-2 px-4 text-lg ">2 items</td>
                          <td className="py-2 px-4 text-lg ">$120.00</td>

                          <td className="py-2 px-4 text-lg  text-green-600 font-semibold">Delivered</td>
                        </tr>

                      </tbody>
                    </table>
                  )}
                  {activeTab === 1 && (
                    <form className="space-y-4">

                      <div className="flex flex-col">
                        <label
                          htmlFor="fullName"
                          className="block mb-2 text-lg font-medium  pt-6"
                        >
                          Full Name
                        </label>
                        <input

                          type="text"
                          id="fullName"
                          name="fullName"

                          placeholder="Enter your full name"
                          required
                          className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />


                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-lg font-medium  "
                        >
                          Email
                        </label>
                        <input

                          type="email"
                          id="email"
                          name="email"

                          placeholder="Enter your email address"
                          required
                          className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />


                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-lg font-medium "
                        >
                          Phone
                        </label>
                        <input

                          type="tel"
                          id="phone"
                          name="phone"

                          placeholder="Enter phone your number"
                          className="bg-[#F8F6F0] border w-full text-lg  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                        <button

                          type="submit"

                          id="submit"
                          className="bg-[#504242] border border-black text-white text-lg px-4 py-2 cursor-pointer w-40 mt-6 ml-1 hover:bg-neutral-800"
                        >
                          Update Profile
                        </button>
                      </div>

                    </form>
                  )}  {activeTab === 2 && (
                    <form className="space-y-4">
                      <div className="flex flex-col relative">
                        <label
                          htmlFor="currentPassword"
                          className="mb-2 text-lg font-medium text-gray-900 pt-6"
                        >
                          Current Password
                        </label>
                        <input
                          id="currentPassword"
                          name="currentPassword"
                          placeholder="Enter current password"
                          required
                          className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
   <span
                          className="absolute right-5 top-21 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        ><RemoveRedEyeIcon /> </span>
                      </div>
                      <div className="flex flex-col relative">
                        <label
                          htmlFor="newPassword"
                          className="mb-2 text-lg font-medium text-gray-900 "
                        >
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          name="newPassword"
                          placeholder="Enter new password"
                          required
                          className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
   <span
                          className="absolute right-5 top-15 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        ><RemoveRedEyeIcon /> </span>
                      </div>
                      <div className="flex flex-col relative">
                        <label
                          htmlFor="currentPassword"
                          className="mb-2 text-lg font-medium text-gray-900 "
                        >
                          Confirm New Password
                        </label>
                        <input


                          id="confirm"
                          name="confirm"

                          placeholder="Enter confirm password"
                          required
                          className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                        <span
                          className="absolute right-5 top-15 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        ><RemoveRedEyeIcon /> </span>
                      </div>
                      <button
                        type="submit"

                        id="submit"
                        className="bg-[#504242] border border-black text-white text-lg px-4 py-2 cursor-pointer w-50 mt-2 ml-1 hover:bg-neutral-800"
                      >
                        Update Password
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}



export default Profile
