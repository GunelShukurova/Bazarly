import React from 'react'
import { Link, NavLink } from "react-router-dom";

const Header = () => {


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
        <div>
            <header className="w-full flex bg-[#F8F6F0] justify-between px-40 h-15 items-center" id="nav">

                <div className="logo">
                    <h3 className="text-3xl font-bold ">Bazarly</h3>
                </div>
                <div>
                    <ul className="flex items-center justify-between gap-x-10">
                        {links.map((link, idx) => {
                            return (
                                <li key={idx}>
                                    <NavLink 
                                        className={({ isActive }) =>
                                            isActive ? "text-black text-xl font-bold" : "text-black text-xl font-bold"
                                        }
                                        to={link.url}
                                        title={link.title}
                                    >
                                        {link.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                </div>
                <div className='flex gap-3'>
                    <NavLink to="/login" id="login-link">
                        <button className="bg-[#F8F6F0] px-2 py-1 border rounded-lg text-lg  hover:cursor-pointer  ">Log
                            in</button></NavLink>
                    <NavLink to="/register" id="register-link">
                        <button className="bg-[#F8F6F0] px-2 py-1  border rounded-lg text-lg  hover:cursor-pointer ">Sign
                            up</button></NavLink>
                </div>
            </header>
        </div>
    )
}

export default Header
