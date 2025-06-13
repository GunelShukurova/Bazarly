import React from 'react'

const Contact = () => {
  return (
    <div>
            <div className="bg-[#FDFBF7] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <form

                    id="register-form"
                    className="w-full max-w-2xl mx-auto mt-12  shadow-md  p-6 border rounded-lg mb-30"
                >
                    <h2 className="text-xl  font-bold mt-10">
                        Send us a Message
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label
                                htmlFor="fullName"
                                className="block mb-2 text-md font-medium  pt-6"
                            >
                                Full Name
                            </label>
                            <input

                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Enter full name"
                                required
                                className="bg-[#F8F6F0] border text-md  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            />


                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-md font-medium  pt-6"
                            >
                                Email
                            </label>
                            <input

                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                required
                                className="bg-[#F8F6F0] border text-md  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            />

                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-md font-medium  pt-6"
                        >
                            Subject
                        </label>
                        <input

                            type="text"
                            id="subject"
                            name="subject"
                            placeholder="What is this about?"
                            required
                            className="bg-[#F8F6F0] border text-md  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />

                    </div>



                    <div className="flex flex-col">
                        <label
                            htmlFor="profileImage"
                            className="block mb-2 text-md font-medium  pt-6"
                        >
                            Message
                        </label>

                        <textarea

                            type="text"
                            id="message"
                            name="message"
                            placeholder="Tell us more about your inquiry..."
                            className="bg-[#F8F6F0] border w-full text-md  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                    </div>


                    <div className="flex flex-col w-full items-center">
                        <button
                            type="submit"

                            id="submit"
                       className="bg-[#333333] border border-black text-white text-lg px-14 py-3 cursor-pointer w-full mt-10 hover:bg-neutral-800"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
                <div className='mx-30'>
                    <h3 className="text-xl  font-bold mt-10">
                        Get in Touch
                    </h3>
                    <p>Have questions about our products or services? We're here to help! Reach out to us through any of the following channels.</p>
                    <div className='flex flex-col gap-4'>
                    <div className='border bg-[#F8F6F0] p-5 rounded-lg border-gray-300'>
                        <span className='text-xl font-semibold'>Email Us</span>
                        <div className='flex flex-col'>
                            <span className='text-gray-700'>info@bazarly.com</span>
                            <span className='text-gray-700'>support@bazarly.com</span>
                        </div>


                    </div>
                    <div className='border bg-[#F8F6F0] p-5 rounded-lg border-gray-300'>
                        <span className='text-xl font-semibold'>Call Us</span>
                        <div className='flex flex-col'>
                            <span className='text-gray-700'>+1 (555) 123-4567</span>
                            <span className='text-gray-700'>+1 (555) 987-6543</span>
                        </div>


                    </div>
                    <div className='border bg-[#F8F6F0] p-5 rounded-lg border-gray-300'>
                        <span className='text-xl font-semibold'>Visit Us</span>
                        <div className='flex flex-col'>
                            <span className='text-gray-700'>123 Commerce Street</span>
                            <span className='text-gray-700'>Business District</span>
                            <span className='text-gray-700'>New York, NY 10001</span>
                        </div>


                    </div>
                    <div className='border bg-[#F8F6F0] p-5 rounded-lg border-gray-300'>
                        <span className='text-xl font-semibold'>Business Hours</span>
                        <div className='flex flex-col'>
                            <span className='text-gray-700'>Monday - Friday: 9:00 AM - 6:00 PM</span>
                            <span className='text-gray-700'>Saturday: 10:00 AM - 4:00 PM</span>
                            <span className='text-gray-700'>Sunday: Closed</span>
                        </div>


                    </div>
                    </div>
                  
                </div>

            </div>
</div>
    </div>
  )
}

export default Contact
