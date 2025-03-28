"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

const images = [
    { src: "/images/Nextjs-logo.svg", caption: "Next.js" },
    { src: "/images/React-icon.svg", caption: "React" },
    { src: "/images/Tailwind_CSS_Logo.svg", caption: "Tailwind CSS" },
    { src: "/images/Typescript_logo_2020.svg", caption: "TypeScript" },
    { src: "/images/jest-seeklogo.svg", caption: "Jest" },
];

interface AlbumCarouselInterface {
  render: boolean;
}

const AlbumCarousel: React.FC<AlbumCarouselInterface> = ({ render }) => {
  const [caption, setCaption] = useState(images[0].caption);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (render) {
      const timer = setTimeout(() => setVisible(true), 50); 
      return () => clearTimeout(timer);
    }
  }, [render]);


  return (
    render ? (
      <>
      <div></div>
      <div
      className={`m-2 w-full max-w-4xl mx-auto p-10 bg-black/50 transition-opacity duration-2000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
        <p className="text-2xl font-bold text-center w-full pb-4 text-[#4cc9f0]">
              Server-Side Rendering (SSR) and Static Site Generation (SSG)
        </p>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true} 
          autoplay={{
              delay: 2000, 
              disableOnInteraction: false, 
            }}
          onSlideChange={(swiper) => setCaption(images[swiper.realIndex].caption)}
          coverflowEffect={{
            rotate: 0, 
            stretch: 50, 
            depth: 500, 
            modifier: 2,
            slideShadows: false, 
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="rounded-xl overflow-hidden"
        >
      
        {images.map((item, index) => (
            <SwiperSlide key={index} className="ml-4">
              <div className="w-48 h-48 flex justify-center items-center bg-white shadow-lg rounded-lg">
                <Image 
                  src={item.src || ""} 
                  alt={item.caption || ""} 
                  width={120}
                  height={120} 
                />
              </div>
            </SwiperSlide>
          ))}
          <p className="mt-6 text-xl font-semibold text-center w-full text-gray-300">{caption}</p>
          
          <div className="w-full text-center">
            <Link href="/protected">
              <button className="mt-8 px-6 py-3 bg-[#4cc9f0] hover:bg-[#3bb0e0] text-gray-900 rounded-md text-lg font-semibold">
                Portfolio
              </button>
            </Link>
           </div>
        </Swiper>
    
      </div>
      </>)
    : null
  );
};

export default AlbumCarousel;
