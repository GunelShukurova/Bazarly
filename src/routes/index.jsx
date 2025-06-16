import NotFound from '../common/NotFound';
import AdminLayout from '../layout/AdminLayout'
import AuthLayout from '../layout/AuthLayout';
import ClientLayout from '../layout/ClientLayout';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminReviews from '../pages/admin/AdminMessages';
import AdminUser from '../pages/admin/AdminUser';
import Dashboard from '../pages/admin/Dashboard';
import About from '../pages/client/About';
import Basket from '../pages/client/Basket';
import Contact from '../pages/client/Contact';
import Favorites from '../pages/client/Favorites';
import Home from '../pages/client/Home';
import Login from '../pages/client/Login';
import ProductDetail from '../pages/client/ProductDetail';
import Products from '../pages/client/Products';
import Profile from '../pages/client/Profile';
import Register from '../pages/client/Register';
import AdminMessages from '../pages/admin/AdminMessages';

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
            {
                path: "users",
                element: <AdminUser />,
            },
              {
                path: "/admin/products",
                element: <AdminProducts />,
            },
             {
                path: "/admin/messages",
                element: <AdminMessages />,
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
                path: "basket",
                element: <Basket />,
            },
            {
                path: "*",
                element: <NotFound />,
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
