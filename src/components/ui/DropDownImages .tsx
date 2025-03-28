"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const images = [
  { src: "/images/material-ui-1.svg", caption: "Material UI" },
  { src: "/images/Typescript_logo_2020.svg", caption: "TypeScript" },
  { src: "/images/React-icon.svg", caption: "React" },
  { src: "/images/redux.svg", caption: "Redux" },
  { src: "/images/testing-library-seeklogo.svg", caption: "React Testing" },
  { src: "/images/jest-seeklogo.svg", caption: "Jest" },
];

interface DropDownImagesProps {
  onChange: (render: boolean) => void;
}

const DropDownImages: React.FC<DropDownImagesProps> = ({ onChange }) => {
  const [animate, setAnimate] = useState(false);
  const [showCaptions, setShowCaptions] = useState(Array(images.length).fill(false));
  const [showButton, setShowButton] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const onChangeRef =  useRef(onChange);

  useEffect(() => {
    
    setTimeout(() => {
      setAnimate(true);
      images.forEach((_, index) => {
        setTimeout(() => {
          setShowCaptions((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, 700 + index * 200);
      });

      setTimeout(() => {
        setShowHeader(true)
        setShowButton(true)
        setTimeout(() => {
          onChangeRef.current(true);
        }, 700);
      }, 700 + images.length * 200);
    }, 800); 
  }, []);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-10 bg-black/50  text-center mt-8">
      <h1
        className={`text-2xl font-bold text-[#4cc9f0] mb-6 transition-transform duration-500 ease-out ${
          showHeader ? "opacity-100" : "opacity-0"
        }`}
      >
        Client-Side Rendering (CSR)
      </h1>

      <div className="flex gap-6 justify-center">
        {images.map((item, index) => (
          <div key={index} className="flex flex-col items-center ml-4">
            <div
              className={`w-24 h-24 bg-white shadow-lg rounded-lg flex justify-center items-center overflow-hidden transition-transform duration-700 ease-out ${
                animate ? "drop-down" : "opacity-0 translate-y-[-100px]"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Image src={item.src} alt={item.caption} width={20} height={20} className="w-20 h-20 object-contain" />
            </div>

            <p
              className={`mt-2 text-gray-300 text-center font-medium transition-opacity duration-500 ${
                showCaptions[index] ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full text-center">
        <button disabled
          className={`mt-8 px-6 py-3 bg-[#4cc9f0] hover:bg-[#3bb0e0] bg-gray-400 rounded-md text-lg font-semibold transition-opacity duration-500 ${
            showButton ? "opacity-70" : "opacity-0"
          }`}
        >
          Portfolio Coming Soon
        </button>
      </div>
      
    </div>
  );
};

export default DropDownImages;
