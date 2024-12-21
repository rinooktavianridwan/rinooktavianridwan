// components/Card.jsx
import { useState } from "react";
import ArrowUp from "../icon/ArrowUp";
import CustomSwipper from "../../swiper/customSwipper"; // Import CustomSwipper
import { SwiperSlide } from "swiper/react";

interface CardProps {
  title: string;
  image: { id: number; image: string }[];
  description: string;
  website: string;
  github: string;
  documentation: string;
}

function Card({
  title,
  image,
  description,
  website,
  github,
  documentation,
}: CardProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col bg-blue-100 shadow-lg rounded-lg w-full h-full p-4 justify-center items-center">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="p-4 h-full w-full flex flex-col md:flex-row md:gap-8 z-0">
        <div className="flex h-full w-full justify-center">
          {/* CustomSwipper */}
          {Array.isArray(image) && image.length > 0 ? (
            <CustomSwipper className="flex w-full min-w-[150px] md:max-w-[300px] h-[120px] md:h-[200px] transition-all duration-300 ease-in-out">
              {image.map((image, index) => (
                <SwiperSlide key={index} className=" px-[10px] ">
                  <img
                    src={image.image}
                    alt={title}
                    className="h-full object-cover mx-auto"
                  />
                </SwiperSlide>
              ))}
            </CustomSwipper>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No images available
            </div>
          )}
        </div>
        <div className="flex flex-col h-full w-full ">
          <h4 className="text-md md:text-lg font-bold">Description</h4>
          <p className="text-sm md:text-md text-gray-600">{description}</p>
          <h4 className="text-md md:text-lg font-bold mt-4">Link Website</h4>
          <p className="text-sm md:text-md">{website}</p>
          <h4 className="text-md md:text-lg font-bold mt-4">Link Github</h4>
          <p className="text-sm md:text-md">{github}</p>
        </div>
      </div>
      <div className="w-full px-4 md:px-8">
        {/* Button Documentation dan Panah */}
        <div
          className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center cursor-pointer flex items-center justify-center"
          onClick={() => setShow(true)}
        >
          <span>Documentation</span>
          <div className="absolute right-4">
            <ArrowUp />
          </div>
        </div>
        {/* Overlay untuk Video */}
        {show && (
          <div
            className="fixed inset-0 bg-blue-900 bg-opacity-95 flex justify-center items-center transition-transform duration-300"
            style={{
              transform: "translateY(0)",
            }}
          >
            <div className="relative w-11/12 md:w-4/5">
              <button
                className="absolute flex item-center justify-center top-4 right-4 w-8 h-8 pt-1 text-white bg-red-500 rounded-full hover:bg-red-700"
                onClick={() => setShow(false)}
              >
                ✕
              </button>
              {documentation ? (
                <iframe
                  width="100%"
                  height="315"
                  src={documentation}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              ) : (
                <div className="flex justify-center items-center w-full h-72 bg-black rounded-lg">
                  <p className="text-white text-xl">Video Not Added Yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
