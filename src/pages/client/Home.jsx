import Slider from "../../components/Slider/index.jsx"
import { SlBasket } from "react-icons/sl";
import { FaCar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { FiShield } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";


const Home = () => {
  return (
    <div>
      <Slider />
      <div className="bg-[#FDFBF7] mt-10">
        <div className="mx-50   py-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="mx-10">
              <h3 className="text-2xl font-normal mb-6  ">Bazarly Subscription</h3>
              <p className="  text-lg mb-10 ">
                Enjoy exclusive benefits and personalized offers. We’re committed to providing you with the best shopping experience possible.
              </p>
              <div className="grid grid-cols-2">

                <div className="   p-6 flex flex-col items-center justify-center ">
                  <span className=" text-5xl mb-4  ">
                    <SlBasket />
                  </span>
                  <h4 className="text-2xl  mb-2 font-light">Fast Delivery</h4>

                </div>
                <div className="flex flex-col items-center justify-center ">
                  <span className="text-5xl mb-4 ">
                    <IoPricetagsOutline />
                  </span>
                  <h4 className="text-xl mb-2 font-light">Best Prices</h4>


                </div>

                <div className=" p-6 flex flex-col items-center justify-center ">
                  <span className=" text-4xl mb-4">
                    <FiShield />
                  </span>
                  <h4 className="text-xl  mb-2 font-light">Secure Shopping</h4>

                </div>


                <div className=" p-6 flex flex-col items-center justify-center ">
                  <span className="text-5xl mb-4">
                    <IoMdTime />
                  </span>
                  <h4 className="text-xl  mb-2 font-light">24/7 Support</h4>

                </div>
              </div>
            </div>
            <div>
              <img src="https://media.istockphoto.com/id/1428709516/photo/shopping-online-woman-hand-online-shopping-on-laptop-computer-with-virtual-graphic-icon.jpg?s=612x612&w=0&k=20&c=ROAncmFL4lbSQdU4VOhyXu-43ngzfEqHE5ZZAw5FtYk=" alt="" />
            </div>
          </div>

        </div>
      </div>
      <div className="bg-[#FDFBF7] mt-10">

        <div className="mx-30   py-12">

          <div className="mx-10">
            <h3 className="text-2xl font-normal mb-6  ">What Our Customers Are Saying</h3>
            <p className="  text-lg mb-10 ">
              Real feedback from people who love shopping with us.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              <div className="bg-[#F8F6F0] p-6 flex flex-col gap-4 ">
                <div className="flex gap-4">
                  <img className="w-20 h-20 rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">Sarah Johnson</span>
                    <span>Verified Customer</span>
                    <span className="flex"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></span>
                  </div>

                </div>

                <p>"Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"</p>
              </div>
              <div className="bg-[#F8F6F0]  p-6 flex flex-col gap-4 ">
                <div className="flex gap-4">
                  <img className="w-20 h-20 rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">Sarah Johnson</span>
                    <span>Verified Customer</span>
                    <span className="flex"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></span>
                  </div>

                </div>

                <p>"Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"</p>
              </div>
              <div className="bg-[#F8F6F0]  p-6 flex flex-col gap-4 ">
                <div className="flex gap-4">
                  <img className="w-20 h-20 rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">Sarah Johnson</span>
                    <span>Verified Customer</span>
                    <span className="flex"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></span>
                  </div>

                </div>

                <p>"Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"</p>
              </div>
              <div className="bg-[#F8F6F0] p-6 flex flex-col gap-4 ">
                <div className="flex gap-4">
                  <img className="w-20 h-20 rounded-full" src="https://fireflyphotographysg.com/wp-content/uploads/2024/03/5-steps-to-mastering-the-perfect-linkedin-profile-picture.jpg" alt="" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">Sarah Johnson</span>
                    <span>Verified Customer</span>
                    <span className="flex"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></span>
                  </div>

                </div>

                <p>"Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="bg-[#FDFBF7] mt-10">
        <div className="mx-30 py-12 text-center">
          <h3 className="text-3xl text-centertext-2xl font-normal mb-6 ">
            Ready to Start Shopping?
          </h3>
          <p className="text-gray-600 max-w-xl text-center mx-auto text-lg mb-10 ">
            Join thousands of satisfied customers and discover the convenience of shopping with Bazarly.
          </p>

          <div className="flex justify-center">
            <button className="bg-white border border-black px-14 py-3 cursor-pointer hover:bg-gray-100 ">
              Get Started Today
            </button>
          </div>
        </div>
</div>

      </div>

      )
}

      export default Home
