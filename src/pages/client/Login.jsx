
import { useNavigate } from 'react-router';
import loginValidationSchema from '../../validations/loginValidations';
import { useFormik } from 'formik';
import { login } from '../../redux/features/userSlice';
import { getAllUsers } from '../../services/users/requests';
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState } from 'react';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, actions) => {
      const response = await getAllUsers();
      const users = response.data || [];

      const validUser = users.find(
        (u) =>
          u.email === values.email &&
          u.password === values.password &&
          u.role === "client"
      );

      if (!validUser) {
        enqueueSnackbar("Invalid credentials", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
        actions.resetForm();
        return;
      }

      actions.resetForm();
      enqueueSnackbar("User signed in successfully!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });

      const user = { ...validUser };
      delete user.password;
      localStorage.setItem("userId", JSON.stringify(user.id));
      dispatch(login(user));
      navigate("/profile");
    },

  });
  return (
    <div className='flex justify-center items-center mt-20'>
      <div className="bg-[#FDFBF7] ">
        <form
          onSubmit={formik.handleSubmit}
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
            <div className='flex flex-col mt-5 justify-center items-center'>
        <span className='text-xl'>Email: gunel23@mail.ru</span>
            <span className='text-xl'>Password: Gunel1223</span>
            </div>
    
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium  pt-6"
            >
              Email address
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-700 text-lg  pl-2 pt-2">
                {formik.errors.email}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="bg-[#F8F6F0] border text-lg text-blue-950 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
            <span
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
          <div className="flex flex-col w-full items-center">
            <button
              disabled={
                formik.isSubmitting ||
                !formik.dirty ||
                Object.entries(formik.errors).length > 0
              }
              type="submit"

              id="submit"
              className="bg-[#333333] border border-black text-white text-lg px-14 py-2 cursor-pointer w-full mt-10 hover:bg-neutral-800"
            >
              Sign in
            </button>
            <span className='mt-5 text-lg underline cursor-pointer' onClick={()=>navigate("/admin/login")}>Go to Admin Login </span>
            <span className='mt-7 text-lg'>Don't have an account? <span onClick={() => navigate("/register")} className='cursor-pointer font-semibold'>Sign up here</span></span>

          </div>
        </form>
      </div >
    </div >
  )
}

export default Login
