import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { useFormik } from "formik";
import { updateProfile } from "../../redux/features/userSlice";
import { enqueueSnackbar } from "notistack";
import { update, updatePassword } from "../../services/users/requests";
import { endpoints } from "../../constants";
import updateProfileValidationSchema from "../../validations/updateProfileValidation";
import updatePasswordValidationSchema from "../../validations/updatePasswordValidatons";


const tabHeaders = [
  "Order History",
  "Update Profile",
  "Change Password"
];



const Profile = () => {
  
 const user = useSelector((state) => state.user.users);

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const formik = useFormik({
    enableReinitialize: true,
 initialValues: {
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    balance: user?.balance || 0,
    profileImage: user?.profileImage || '',
  },
    validationSchema: updateProfileValidationSchema,
  onSubmit: async (values, actions) => {
  
      try {
    const updatedUser = {
  fullName: values.fullName,
  email: values.email,
  phone: values.phone,
  balance: values.balance,
  profileImage: values.profileImage,
};

    await update(endpoints.users, user.id, values);


            dispatch(updateProfile(values));
        enqueueSnackbar("profile updated successfully!", {
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        actions.resetForm({ values });
      } catch (error) {
        enqueueSnackbar("Failed to update profile.", {
          variant: "error",
        });
      }
    }
  })


const formikPassword = useFormik({
  enableReinitialize: true,
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  },

validationSchema: updatePasswordValidationSchema,
onSubmit: async (values, actions) => {
  try {
    const response = await updatePassword(
      user.id,
      values.currentPassword,
      values.newPassword
    );

    enqueueSnackbar(response.message, {
      autoHideDuration: 2000,
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });

    actions.resetForm();
  } catch (error) {
    enqueueSnackbar("Failed to update password.", { variant: "error" });
  }
}

  })


  return (
      <div className="bg-[#FDFBF7] pt-15">
      <div className="mx-auto max-w-screen-xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-2 sm:mx-6">
          <h3 className="text-3xl font-semibold mb-6">My Profile</h3>
          <p className="text-xl mb-10">Manage your account and view your orders</p>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

             <div className="bg-[#F8F6F0] shadow-md p-6 text-center space-y-5 rounded-lg w-full lg:w-1/3">
              <img
                className="w-32 h-32 mx-auto object-cover rounded-full border-4"
                src={user?.profileImage || "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"}
                alt="User Avatar"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.fullName}</h2>
                <p className="text-gray-500 text-lg">{user?.email}</p>
                <p className="text-gray-500 text-md">{user?.phone}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="font-medium text-lg">Member since:</span>
                <span className="text-lg font-semibold text-gray-700">
                  {moment(user?.registeredAt).format('DD MMMM YYYY')}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="font-medium text-lg">Balance:</span>
                <span className="text-gray-700 font-semibold text-lg">${user?.balance}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="font-medium text-lg">Total Orders:</span>
                <span className="text-gray-700 font-semibold text-lg">1</span>
              </div>
            </div>

 <div className="flex-1 w-full mt-6 lg:mt-0">
              <div className="flex gap-4 mb-6 flex-wrap overflow-x-auto">
                {["My Orders", "Update Profile", "Change Password"].map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-5 py-2 rounded-lg text-md font-medium shadow transition-all cursor-pointer duration-200 ${
                      activeTab === index
                        ? "bg-[#ccbe94] text-white text-lg"
                        : "bg-[#F8F6F0] text-gray-700 text-lg hover:bg-blue-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="bg-[#F8F6F0] p-4 rounded shadow w-full">
                <span className="text-2xl font-semibold">{tabHeaders[activeTab]}</span>

              {activeTab === 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border my-3 border-gray-300 text-sm sm:text-base">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 text-left">Order ID</th>
                          <th className="py-2 px-4 text-left">Date</th>
                          <th className="py-2 px-4 text-left">Items</th>
                          <th className="py-2 px-4 text-left">Total</th>
                          <th className="py-2 px-4 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4">#12345</td>
                          <td className="py-2 px-4">2024-05-12</td>
                          <td className="py-2 px-4">2 items</td>
                          <td className="py-2 px-4">$120.00</td>
                          <td className="py-2 px-4 text-green-600 font-semibold">Delivered</td>
                        </tr>
                      </tbody>
                    </table>
                     </div>
                )}

              
                  {activeTab === 1 && (
                    <form onSubmit={formik.handleSubmit} className="space-y-4">

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
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your full name"
                          required
                          className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                        {formik.errors.fullName && formik.touched.fullName && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formik.errors.fullName}
                          </span>)}


                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-lg font-medium  "
                        >
                          Email
                        </label>
                        <input
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="email"
                          id="email"
                          name="email"

                          placeholder="Enter your email address"
                          required
                          className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                        {formik.errors.email && formik.touched.email && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formik.errors.email}
                          </span>)}


                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-lg font-medium "
                        >
                          Phone
                        </label>
                        <input
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="tel"
                          id="phone"
                          name="phone"

                          placeholder="Enter phone your number"
                          className="bg-[#F8F6F0] border w-full text-lg  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                        {formik.errors.phone && formik.touched.phone && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formik.errors.phone}
                          </span>)}

                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="balance"
                          className="block mb-2 text-lg font-medium  "
                        >
                          Balance
                        </label>
                        <input

                          type="number"
                          id="balance"
                          name="balance"
                          value={formik.values.balance}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your balance"
                          required
                          className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                        {formik.errors.balance && formik.touched.balance && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formik.errors.balance}
                          </span>)}

                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="profileImage"
                          className="block mb-2 text-lg font-medium"
                        >
                          Profile Image
                        </label>
                        <input

                          type="url"
                          id="profileImage"
                          name="profileImage"
                          value={formik.values.profileImage}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter your profileImage Url"
                          required
                          className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                        {formik.errors.profileImage && formik.touched.profileImage && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formik.errors.profileImage}
                          </span>)}


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
                      <form onSubmit={formikPassword.handleSubmit} className="space-y-4">
                      <div className="flex flex-col relative">
                        <label
                          htmlFor="currentPassword"
                          className="mb-2 text-lg font-medium text-gray-900 pt-6"
                        >
                          Current Password
                        </label>
                        <input
                          type={showPassword.currentPassword ? "text" : "password"}
                   value={formikPassword.values.currentPassword}
                          onChange={formikPassword.handleChange}
                          onBlur={formikPassword.handleBlur}
                          id="currentPassword"
                          name="currentPassword"
                          placeholder="Enter current password"
                          required
                          className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />  {formikPassword.errors.currentPassword && formikPassword.touched.currentPassword && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formikPassword.errors.currentPassword}
                          </span>)}
                        <span
                          onClick={() => setShowPassword(prev => ({ ...prev, currentPassword: !prev.currentPassword }))}
                               className="absolute right-5 top-21 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                          {showPassword.currentPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                        </span>
                      </div>
                      <div className="flex flex-col relative">
                        <label
                          htmlFor="newPassword"
                          className="mb-2 text-lg font-medium text-gray-900 "
                        >
                          New Password
                        </label>
                        <input
                             type={showPassword.newPassword ? "text" : "password"}
                         value={formikPassword.values.newPassword}
                          onChange={formikPassword.handleChange}
                          onBlur={formikPassword.handleBlur}
                          id="newPassword"
                          name="newPassword"
                          placeholder="Enter new password"
                          required
                          className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />  
                         {formikPassword.errors.newPassword && formikPassword.touched.newPassword && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formikPassword.errors.newPassword}
                          </span>)}
                         <span
                          onClick={() => setShowPassword(prev => ({ ...prev, newPassword: !prev.newPassword }))}
                            className="absolute right-5 top-15 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                          {showPassword.newPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                        </span>
                     
                      </div>
                      <div className="flex flex-col relative">
                        <label
                          htmlFor="confirmNewPassword"
                          className="mb-2 text-lg font-medium text-gray-900 "
                        >
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword.confirmNewPassword ? "text" : "password"}
                         value={formikPassword.values.confirmNewPassword}
                          onChange={formikPassword.handleChange}
                          onBlur={formikPassword.handleBlur}
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          placeholder="Enter confirm password"


                          required
                          className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                          {formikPassword.errors.confirmNewPassword && formikPassword.touched.confirmNewPassword && (
                          <span className="text-red-700 text-lg  pl-2 pt-2">
                            {formikPassword.errors.confirmNewPassword}
                          </span>)}
                       <span
                          onClick={() => setShowPassword(prev => ({ ...prev, confirmNewPassword: !prev.confirmNewPassword }))}
                            className="absolute right-5 top-15 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                          {showPassword.confirmNewPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                        </span>
                      </div>
                      <button
                        type="submit"

                        id="submit"
                        className="bg-[#504242] border border-black text-white text-lg px-4 py-2 cursor-pointer w-50 mt-2 ml-1 hover:bg-neutral-600"
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



  )
}



export default Profile
