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
        className="mySwiper w-screen">

        <SwiperSlide>
           <div className="relative">
          <img  className="w-screen h-screen object-cover" src="https://cdn.pixabay.com/photo/2020/11/21/19/43/watch-5764987_1280.jpg" alt="" />

 <div className="absolute inset-0  bg-opacity-50 z-10 !bg-black/50" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-8">
      <h1 className="text-7xl font-bold mb-4">Welcome to Bazarly</h1>
      <p className="text-xl max-w-2xl mb-6">
        Your one-stop online marketplace for everyday essentials. From beverages to hygiene products, we've got everything you need.
      </p>
      <div className="flex gap-6">
        <button className="bg-[#292417ce] text-white px-6 py-3 font-semibold hover:bg-[#292723ce] cursor-pointer border border-black">Shop Now</button>
        <button className="bg-[#292417ce] text-white px-6 py-3 font-semibold hover:bg-[#292723ce] cursor-pointer border border-black">Learn More</button>
      </div>
        </div>
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
