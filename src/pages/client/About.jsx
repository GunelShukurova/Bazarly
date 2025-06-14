import React from 'react'
import { PiHeartLight } from "react-icons/pi";
import { IoEarthOutline } from "react-icons/io5";
import { FaGem } from "react-icons/fa";

import { MdOutlinePeopleAlt } from "react-icons/md";
const About = () => {
    return (
        <div>
            <div className=" mt-10">
                <div className="  py-5">

                    <div className="bg-[#F8F6F0] w-full">
                        <div className="mx-40 py-5">
                            <h3 className="text-3xl font-semibold mb-6  ">About Bazarly</h3>

                            <div className="grid grid-cols-2 gap-8 mb-20" >

                                <div>

                                    <p className="text-2xl pr-5">Founded in 2023, Bazarly began with a simple mission: to make everyday shopping more convenient, affordable, and accessible for everyone. What started as a small online store has grown into a comprehensive marketplace serving thousands of customers.

                                        We believe that shopping for essentials shouldn't be a hassle. That's why we've curated a wide selection of quality products from trusted brands, all available at competitive prices with fast, reliable delivery.

                                        Today, Bazarly continues to evolve, always putting our customers first and striving to exceed expectations with every order.</p>
                                </div>
                                <div>
                                    <img className='h-85' src="https://fortune.com/img-assets/wp-content/uploads/2025/04/GettyImages-2160595238-e1745607423872.jpg?resize=1200,600" alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=" mt-10">
                        <div className="mx-40 py-12">
                            <div className="mx-10">
                                <h3 className="text-3xl font-semibold mb-6  ">Our Mission & Values</h3>
                                <p className=" text-xl mb-10">
                                    We're driven by core values that guide everything we do.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 h-50">

                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className=" text-5xl mb-4">
                                        <IoEarthOutline />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Our Mission</h4>
                                    <p className="text-gray-600 text-lg">To provide convenient, affordable access to quality everyday essentials for everyone.</p>
                                </div>

                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className="text-5xl mb-4">
                                        <FaGem />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Quality First</h4>
                                    <p className="text-gray-600 text-lg">We carefully select products from trusted brands to ensure the highest quality standards.</p>
                                </div>
                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className=" text-5xl mb-4">

                                        <PiHeartLight />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Customer Care</h4>
                                    <p className="text-gray-600 text-lg">Your satisfaction is our priority. We're here to help every step of the way.</p>
                                </div>
                                <div className="bg-[#F8F6F0] p-6 flex flex-col items-center text-center ">
                                    <span className=" text-5xl mb-4">
                                        <MdOutlinePeopleAlt />
                                    </span>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Community</h4>
                                    <p className="text-gray-600 text-lg">Building strong relationships with our customers and supporting local communities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F8F6F0] mt-30 w-full">
                            <div className="mx-40  py-12">
                                <div className="mx-10">
                                    <h3 className="text-3xl font-semibold mb-6   ">Meet Our Team</h3>
                                    <p className="  text-xl mb-10 ">
                                        The passionate people behind Bazarly who work hard to bring you the best shopping experience.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                                        <div className=" p-6 flex flex-col items-center justify-center text-center h-90 rounded-full">
                                            <div className='flex flex-col gap-1 justify-center items-center '>
                                                <img className="w-40 h-40 object-cover  rounded-full" src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg" alt="" />

                                                <span className="text-2xl font-semibold pt-4">Liam Nguyen</span>
                                                <span className='text-md'>Chief Technology Officer</span>
                                                <p className='text-lg'>Liam brings 14 years of experience in building scalable e-commerce platforms. He leads our tech team to deliver a seamless and secure shopping experience.</p>
                                            </div>
                                        </div>
                                        <div className=" p-6 flex flex-col items-center justify-center text-center h-90 rounded-full">
                                            <div className='flex flex-col gap-1 justify-center items-center '>
                                                <img className="w-40 h-40 object-cover rounded-full" src="https://media.istockphoto.com/id/1398385367/photo/happy-millennial-business-woman-in-glasses-posing-with-hands-folded.jpg?s=612x612&w=0&k=20&c=Wd2vTDd6tJ5SeEY-aw0WL0bew8TAkyUGVvNQRj3oJFw=" alt="" />

                                                <span className="text-xl font-semibold pt-4">Emily Rodriguez</span>
                                                <span className='text-md'>Chief Marketing Officer</span>
                                                <p className='text-lg'>With over a decade in online retail marketing, Emily crafts campaigns that connect with our customers and keep them coming back.</p>
                                            </div>
                                        </div>
                                        <div className=" p-6 flex flex-col items-center  justify-center text-center h-90 rounded-full">
                                            <div className='flex flex-col gap-1 justify-center items-center '>
                                                <img className="w-40 h-40 object-cover rounded-full" src="https://media.istockphoto.com/id/2194081490/photo/closeup-headshot-portrait-of-young-asian-businesswoman.jpg?s=612x612&w=0&k=20&c=kbymrEu9BoYXITMAVAx2ggTFbYmstYVJUjMei8-U8wA=" alt="" />

                                                <span className="text-xl font-semibold  pt-4">Sofia Petrova</span>
                                                <span className='text-md'>Logistics & Operations Manager</span>
                                                <p className='text-lg'>Aisha ensures your orders arrive fast and safely. With 10+ years in logistics, she optimizes our supply chain from warehouse to doorstep.

                                                </p>
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
