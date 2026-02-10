import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getAllUsers } from '../../services/users/requests';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../../redux/features/adminSlice';

const AdminLogin = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchAdmins = async () => {
      const resp = await getAllUsers();
      if (resp?.data) {
        const adminUsers = resp.data.filter((r) => r.role === "admin");
        setAdmins(adminUsers);
      }
    };
    fetchAdmins();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      const { email, password } = values;
      const validAdmin = admins.find(
        (a) => a.email === email && a.password === password
      ); if (validAdmin) {
        dispatch(login(validAdmin));


        localStorage.setItem("adminId", JSON.stringify(validAdmin.id));
        navigate("/admin");
        enqueueSnackbar("welcome back admin", {
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar("invalid credentials", {
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        actions.resetForm();
      }
    },
  });

  return (
    <div className='flex justify-center items-center mt-20'>
       <div className="bg-[#FDFBF7] w-full flex justify-center">
        <form
          onSubmit={formik.handleSubmit}
          id="admin-login-form"
          className="w-full max-w-md mx-auto mt-30 shadow-md  p-6 border rounded-lg"
        >
          <div className='flex justify-center items-center flex-col gap-3'>

            <h3 className='text-2xl font-semibold'>Admin Login</h3>
            <p className='text-2xl text-gray-600 font-thin'>Access the admin panel</p>
            <div className='text-xl flex flex-col'>
          <span>email: admin@gmail.com</span>
            <span>password: Hello123!</span>
            </div>
  
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium  pt-6"
            >
              Admin Email
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              placeholder="Enter admin email"
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
          <div className="flex flex-col w-full">
          
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
              Sign in to Admin Panel
            </button>
  <button onClick={()=>navigate("/")} className='mt-5 text-lg cursor-pointer text-start underline'>Back to Home</button>
          </div>
        </form>
      </div >
    </div >
  )
}

export default AdminLogin
