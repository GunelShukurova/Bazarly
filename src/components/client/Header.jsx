import { useEffect, useState } from 'react'

import { NavLink, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/userSlice';
import { LuLogOut } from "react-icons/lu";
import { SlBasket } from "react-icons/sl";
import { HiOutlineMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { useCart } from '../../context/cartContext';
import { useFavorites } from '../../context/favoriteContext';



const Header = () => {

  const { favorites } = useFavorites();
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteCount = favorites.length;
  const user = useSelector((state) => state.user.users);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleRemove = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const links = [
    {

      title: "Home",
      url: "/",
    },
    {

      title: "About",
      url: "/about",
    },
    {

      title: "Contact",
      url: "/contact",
    },
    {

      title: "Products",
      url: "/products",
    },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-[#F8F6F0] px-6 md:px-12 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-bold">Bazarly</div>
        <nav className="hidden md:flex gap-6">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.url}
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-semibold text-black"
                  : "text-xl text-black"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <img
                src={user.profileImage || "/default-profile.png"}
                onClick={() => navigate("/profile")}
                className="w-8 h-8 rounded-full cursor-pointer object-cover"
                alt="profile"
              />
              <div
                onClick={() => navigate("/favorites")}
                className="relative cursor-pointer"
              >
                <FaRegHeart className="text-xl sm:text-xl md:text-2xl lg:text-xl cursor-pointer text-red-800 transition-all duration-200" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {favoriteCount}
                  </span>
                )}
              </div>
              <div
                onClick={() => navigate("/basket")}
                className="relative cursor-pointer"
              >
                <SlBasket className="text-xl sm:text-xl md:text-2xl lg:text-xl cursor-pointer text-red-800 font-bold transition-all duration-200" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <LuLogOut
                onClick={handleLogout}
                className="text-xl cursor-pointer text-[#715a16]"
              />
            </>
          ) : (<>
            <NavLink to="/login">
              <button className="border px-3 py-1 rounded-lg text-lg">
                Log in
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="border px-3 py-1 rounded-lg text-lg">
                Sign up
              </button>
            </NavLink>
          </>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.url}
              onClick={() => setMenuOpen(false)}
              className="text-lg text-black"
            >
              {link.title}
            </NavLink>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            {user ? (
              <>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                > <img
                    src={user.profileImage || "/default-profile.png"}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>Profile</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-left text-[#715a16]"
                >
                  Logout
                </button>
              </>
            ) : (
              <> <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                Log in
              </NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};


export default Header
