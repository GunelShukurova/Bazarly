import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "../../assets/css/swiper.css"

import { Navigation } from 'swiper/modules';

const Slider = () => {
  return (
    <div>
      <Swiper slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-80">

        <SwiperSlide>
          <img style={{ width: "100%", height: "70vh" }} src="https://cdn.pixabay.com/photo/2020/11/21/19/43/watch-5764987_1280.jpg" alt="" />

          <div className='bg-pink-50 '>

            <h1 className='absolute top-50 left-105 text-8xl  text-[#F8F6F0] text-center p-3 rounded-2xl'>Welcome to Bazarly</h1>
            <p className='absolute top-75 left-40 text-2xl  text-[#F8F6F0] text-center p-3 rounded-2xl px-50'>Your one-stop online marketplace for everyday essentials. From beverages to hygiene products, we've got everything you need.</p>
            <button className='absolute left-168 top-95 mt-5 bg-white border border-black px-14 py-3 cursor-pointer hover:bg-gray-100'>Shop Now</button>
            <button className='absolute top-95 mt-5   left-220  bg-white border border-black px-14 py-3 cursor-pointer hover:bg-gray-100'>Learn More</button>
          </div>
          
        </SwiperSlide >

        <SwiperSlide>
          <img style={{ width: "100%", height: "70vh", objectFit: "cover" }} src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "100%", height: "70vh" }} src="https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        </SwiperSlide>


      </Swiper>
    </div>
  )
}

export default Slider
