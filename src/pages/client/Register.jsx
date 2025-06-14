import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";
import instance from '../../services/instance';
import registerValidationSchema from '../../validations/registerValidation';
import { getAllUsers } from '../../services/users/requests';
import { endpoints } from '../../constants';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      balance: "",
      profileImage: "",

    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, action) => {

      const response = await getAllUsers();
      const users = response.data || [];
      const duplicateEmail = users.find((u) => u.email === values.email);
      if (duplicateEmail) {
        formik.setFieldValue('email', '');
        enqueueSnackbar("email already taken", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        await instance.post(endpoints.users, {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          profileImage:
            values.profileImage ||
            "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
          role: "client",
          phone: values.phone,
          isBanned: false,
          banUntil: null,
          favorites: [],
          balance: values.balance,

          registeredAt: new Date().toISOString(),
        });
        enqueueSnackbar("user registered successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        navigate("/login");
        action.resetForm();
      }
    },
  });

  return (
    <div>
      <div className="bg-[#FDFBF7]">
        <form
          onSubmit={formik.handleSubmit}
          id="register-form"
          className="w-full max-w-xl mx-auto mt-12  shadow-md  p-6 border  rounded-lg "
        >
          <div className='flex justify-center items-center flex-col gap-3'>
            <h2 className="text-3xl  font-semibold mt-5">
              Bazarly
            </h2>
            <h3 className='text-2xl font-normal'>Create your account</h3>
            <p className='text-2xl text-gray-600 font-thin'>Join Bazarly and start shopping today!</p>
          </div>


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
            />   {formik.errors.fullName && formik.touched.fullName && (
              <span className="text-red-700 text-lg  pl-2 pt-2">
                {formik.errors.fullName}
              </span>)}


          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium  pt-6"
            >
              Email address
            </label>
            <input

              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email address"
              required
              className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-700 text-lg pl-2 pt-2">
                {formik.errors.email}
              </span>
            )}

          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="block mb-2 text-lg font-medium pt-6"
            >
              Phone Number
            </label>
            <input

              type="tel"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone your number"
              className="bg-[#F8F6F0] border w-full text-lg  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-red-700 text-lg pl-2 pt-2">
                {formik.errors.phone}
              </span>
            )}
          </div>


          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-2 text-lg font-medium text-gray-900 pt-6"
            >
              Password
            </label>
            <input

             type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Create a password"
              required
              className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
           />    <span
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-5 top-21 transform -translate-y-1/2 text-gray-500 cursor-pointer"
  >
    {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
  </span>
            {formik.errors.password && formik.touched.password && (
              <span className="text-red-700 text-lg  pl-2 pt-2">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor="confirmPassword"
              className="mb-2 text-lg font-medium text-gray-900 pt-6"
            >
              Confirm Password
            </label>
            <input

                type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm your password"
              required
              className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />  
  <span
    onClick={() => setShowConfirmPassword((prev) => !prev)}
    className="absolute right-3 top-21 transform -translate-y-1/2 text-gray-500 cursor-pointer"
  >
    {showConfirmPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
  </span>

            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <span className="text-red-700 text-lg  pl-2 pt-2">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="block mb-2 text-lg font-medium pt-6"
            >
              Balance
            </label>
            <input

              name="balance"
              value={formik.values.balance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              min={0}
              placeholder="Enter  your balance"
              className="bg-[#F8F6F0] border w-full text-lg  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            {formik.errors.balance && formik.touched.balance && (
              <span className="text-red-700 text-lg  pl-2 pt-2">
                {formik.errors.balance}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="profileImage"
              className="block mb-2 text-lg font-medium text-gray-900 pt-6"
            >
              Profile Image URL (Optional)
            </label>
            <input

              type="text"
              id="profileImage"
              name="profileImage"
              value={formik.values.profileImage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter image URL"
              className="bg-[#F8F6F0] border w-full text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            {formik.errors.profileImage && formik.touched.profileImage && (
              <span className="text-red-700 text-lg pl-2 pt-2">
                {formik.errors.profileImage}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full items-center">
            <button
              type="submit"
              disabled={
                formik.isSubmitting ||
                Object.entries(formik.errors).length > 0 ||
                !formik.dirty
              }
              id="submit"
              className="bg-[#333333] border border-black text-white text-lg px-14 py-2 cursor-pointer w-full mt-10 hover:bg-neutral-800"
            >
              Create account
            </button>
            <span className='mt-7 text-md'>Already have an account? <span onClick={() => { navigate("/login") }} className='cursor-pointer font-semibold'>Sign in here</span></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
