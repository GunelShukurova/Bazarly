import React from 'react'
import { PiHeartLight } from "react-icons/pi";
import { IoEarthOutline } from "react-icons/io5";
import { FaGem } from "react-icons/fa";

import { MdOutlinePeopleAlt } from "react-icons/md";
const About = () => {
    return (
        <div>
            <div className="bg-[#FDFBF7] mt-10">
                <div className="mx-50   py-12">

                    <div className="mx-10">
                        <h3 className="text-2xl font-semibold mb-6  ">About Bazarly</h3>
                        <p className="  text-lg mb-10 ">
                            Your trusted partner in online shopping, bringing quality products and exceptional service to your doorstep.
                        </p>
                        <div className="grid grid-cols-2">

                            <div>

                                <p className="text-2xl pr-5">Founded in 2023, Bazarly began with a simple mission: to make everyday shopping more convenient, affordable, and accessible for everyone. What started as a small online store has grown into a comprehensive marketplace serving thousands of customers.

                                    We believe that shopping for essentials shouldn't be a hassle. That's why we've curated a wide selection of quality products from trusted brands, all available at competitive prices with fast, reliable delivery.

                                    Today, Bazarly continues to evolve, always putting our customers first and striving to exceed expectations with every order.</p>
                            </div>
                            <div>
                                <img src="https://readytrainingonline.com/wp-content/uploads/2020/03/3.25.24-What-Customers-Want.jpg" alt="" />
                            </div>

                        </div>

                    </div>
                    <div className="bg-[#FDFBF7] mt-10">
                        <div className="  py-12">
                            <div className="mx-10">
                                <h3 className="text-2xl font-semibold mb-6  ">Our Mission & Values</h3>
                                <p className="  text-lg mb-10 ">
                                    We're driven by core values that guide everything we do.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 h-50">

                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className=" text-5xl mb-4">
                                        <IoEarthOutline />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Our Mission</h4>
                                    <p className="text-gray-600">To provide convenient, affordable access to quality everyday essentials for everyone.</p>
                                </div>

                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className="text-5xl mb-4">
                                        <FaGem />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Quality First</h4>
                                    <p className="text-gray-600">We carefully select products from trusted brands to ensure the highest quality standards.</p>
                                </div>
                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className=" text-5xl mb-4">

                                        <PiHeartLight />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Customer Care</h4>
                                    <p className="text-gray-600">Your satisfaction is our priority. We're here to help every step of the way.</p>
                                </div>
                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className=" text-5xl mb-4">
                                        <MdOutlinePeopleAlt />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Community</h4>
                                    <p className="text-gray-600">Building strong relationships with our customers and supporting local communities.</p>
                                </div>
                            </div>

                            <div className="bg-[#FDFBF7] mt-10">
                                <div className="  py-12">
                                    <div className="mx-10">
                                        <h3 className="text-2xl font-semibold mb-6  ">Meet Our Team</h3>
                                        <p className="  text-lg mb-10 ">
                                            The passionate people behind Bazarly who work hard to bring you the best shopping experience.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                                            <div className=" p-6 flex flex-col items-center justify-center text-center h-90 rounded-full">
                                                <div className='flex flex-col gap-1 justify-center items-center '>
                                                    <img className="w-30 h-30 rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />

                                          <span className="text-xl  pt-4">John Smith</span>
                                                    <span>CEO & Founder</span>
                                                    <p className='text-lg'>With over 15 years in e-commerce, John leads Bazarly with a vision for exceptional customer service.</p>
                                                </div>
                                            </div>
                                           <div className=" p-6 flex flex-col items-center justify-center text-center h-90 rounded-full">
                                                <div className='flex flex-col gap-1 justify-center items-center '>
                                                    <img className="w-30 h-30 rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />

                                                     <span className="text-xl  pt-4">John Smith</span>
                                                    <span>CEO & Founder</span>
                                                    <p className='text-lg'>With over 15 years in e-commerce, John leads Bazarly with a vision for exceptional customer service.</p>
                                                </div>
                                            </div>
                                             <div className=" p-6 flex flex-col items-center  justify-center text-center h-90 rounded-full">
                                                <div className='flex flex-col gap-1 justify-center items-center '>
                                                    <img className="w-30 h-30  rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />

                                                    <span className="text-xl  pt-4">John Smith</span>
                                                    <span>CEO & Founder</span>
                                                    <p className='text-lg'>With over 15 years in e-commerce, John leads Bazarly with a vision for exceptional customer service.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
