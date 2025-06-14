import { useFormik } from 'formik'
import instance from '../../services/instance';
import contactValidationSchema from '../../validations/contactValidations';
import { getAllMessages, postMessage } from '../../services/messages/requests';
import { endpoints } from '../../constants';
import { enqueueSnackbar } from "notistack";


const Contact = () => {

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: contactValidationSchema,
        onSubmit: async (values, action) => {

            try {
                await getAllMessages();
                await postMessage({
                    fullName: values.fullName,
                    email: values.email,
                    subject: values.subject,
                    messages: values.message,
                    submittedAt: new Date().toISOString(),
                    profileImage:
                        values.profileImage ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",


                });
                enqueueSnackbar("your message sent to admin!", {
                    variant: "success",
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },

                });
                action.resetForm();
            }

            catch (error) {
                enqueueSnackbar('Failed to send message.', {
                    variant: 'error',
                });
            }
        },
    });
    return (
        <div>
            <div className="bg-[#FDFBF7] ">
                <div className="grid grid-cols-1 sm:grid-cols-2  mt-15 mx-35">
                    <form
 onSubmit={formik.handleSubmit}
                        id="register-form"
                        className="w-full max-w-2xl h-157 mx-auto mt-12  shadow-md  p-6 border rounded-lg mb-30"
                    >
                        <h2 className="text-2xl  font-bold mt-5">
                            Send us a Message
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                    placeholder="Enter full name"
                                    required
                                    className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                />

                                {formik.errors.fullName && formik.touched.fullName && (
                                    <span className="text-red-700 text-sm pl-2 pt-2">
                                        {formik.errors.fullName}
                                    </span>)}

                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-lg font-medium  pt-6"
                                >
                                    Email
                                </label>
                                <input

                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter email address"
                                    required
                                    className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                />
                                {formik.errors.email && formik.touched.email && (
                                    <span className="text-red-700 text-sm pl-2 pt-2">
                                        {formik.errors.email}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="username"
                                className="block mb-2 text-lg font-medium  pt-6"
                            >
                                Subject
                            </label>
                            <input

                                type="text"
                                id="subject"
                                name="subject"
                                value={formik.values.subject}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="What is this about?"
                                required
                                className="bg-[#F8F6F0] border text-lg  border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            />
                            {formik.errors.subject && formik.touched.subject && (
                                <span className="text-red-700 text-sm pl-2 pt-2">
                                    {formik.errors.subject}
                                </span>
                            )} </div>



                        <div className="flex flex-col">
                            <label
                                htmlFor="profileImage"
                                className="block mb-2 text-lg font-medium  pt-6"
                            >
                                Message
                            </label>

                            <textarea

                                type="text"
                                id="message"
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Tell us more about your inquiry..."
                                className="bg-[#F8F6F0] border w-full text-lg  border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            />
                            {formik.errors.message && formik.touched.message && (
                                <span className="text-red-700 text-sm pl-2 pt-2">
                                    {formik.errors.message}
                                </span>
                            )}
                        </div>


                        <div className="flex flex-col w-full items-center">
                            <button
                                type="submit"

                                id="submit"
                                disabled={
                                    formik.isSubmitting ||
                                    Object.entries(formik.errors).length > 0 ||
                                    !formik.dirty
                                }
                                className="bg-[#333333] border border-black text-white text-lg px-14 py-3 cursor-pointer w-full mt-10 hover:bg-neutral-800"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                    <div className='mx-30'>
                        <h3 className="text-2xl  font-bold mt-10">
                            Get in Touch
                        </h3>
                        <p className='py-3'>Have questions about our products or services? We're here to help! Reach out to us through any of the following channels.</p>
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
