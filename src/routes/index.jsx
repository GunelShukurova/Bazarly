import NotFound from '../common/NotFound';
import AdminLayout from '../layout/AdminLayout'
import AuthLayout from '../layout/AuthLayout';
import ClientLayout from '../layout/ClientLayout';
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import About from '../pages/client/About';
import Contact from '../pages/client/Contact';
import Favorites from '../pages/client/Favorites';
import Home from '../pages/client/Home';
import Login from '../pages/client/Login';
import ProductDetail from '../pages/client/ProductDetail';
import Products from '../pages/client/Products';
import Profile from '../pages/client/Profile';
import Register from '../pages/client/Register';

const ROUTES = [
    {
        element: <AdminLayout />,
          path: "/admin",
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "/adminlogin",
                element: <AdminLogin />
            },
        ]
    },
    {
        element: <ClientLayout />,
        path: "/",
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "product/:id",
                element: <ProductDetail />,
            }, 
            {
                path: "profile",
                element: <Profile />,
            }, {
                path: "favorites",
                element: <Favorites />,
            },
             {
                path: "*",
                element: <NotFound/>,
            },
        ],
    }, {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];


export default ROUTES
