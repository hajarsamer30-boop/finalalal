"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img from '../../../assets/slider.png'
import Image from 'next/image';


export default function Slider() {
  return (
    <div className="w-full  mx-auto relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={true}
        loop={true}
        className=" overflow-hidden shadow-lg"
      >
        <SwiperSlide className="bg-blue-500 h-64 flex items-center justify-center text-white text-2xl font-bold">
          <Image src={img} alt='' className="w-full h-100 object-cover"/>
        </SwiperSlide>
        <SwiperSlide className="bg-blue-500 h-64 flex items-center justify-center text-white text-2xl font-bold">
          <Image src={img} alt='' className="w-full h-100 object-cover"/>
        </SwiperSlide>
      
        
      </Swiper>
      <div className='absolute inset-0 bg-green-400/20 pointer-events-none z-30'></div>
    </div>
  );
}