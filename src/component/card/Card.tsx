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
    <div className="flex flex-col bg-[#3E8DE3] shadow-lg rounded-lg w-full h-full py-4 justify-center items-center">
      <h3 className="text-md  md:text-xl font-bold mb-2">{title}</h3>
      <div className="p-4 h-full w-full flex flex-col md:flex-row md:gap-4 z-0">
        <div className="flex h-full w-full md:w-[70%] justify-center">
          {/* CustomSwipper */}
          {Array.isArray(image) && image.length > 0 ? (
            <CustomSwipper
              className="flex items-center justify-center w-full min-w-[100px] max-w-[380px] md:max-w-[380px] h-[120px] md:h-[200px] transition-all duration-300 ease-in-out"
              navigationId="projects-image"
            >
              {image.map((image, index) => (
                <SwiperSlide key={index} className="px-[10px]">
                  <img
                    src={image.image}
                    alt={title}
                    className="w-full object-cover mx-auto"
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
        <div className="flex flex-col h-full w-full md:w-[30%] ">
          <h4 className="text-md md:text-lg font-bold">Description</h4>
          <p className="text-sm md:text-md ">{description}</p>
          <h4 className="text-md md:text-lg font-bold mt-4">Link Website</h4>
          {website !== "" ? (
            <p
              onClick={() => window.open(website, "_blank")}
              className="text-sm md:text-md hover:cursor-pointer w-fit"
            >
              Click Here
            </p>
          ) : (
            <p className="text-sm md:text-md ">Link not added yet</p>
          )}

          <h4 className="text-md md:text-lg font-bold mt-4">Link Github</h4>
          {github !== "" ? (
            <p
              onClick={() => window.open(github, "_blank")}
              className="text-sm md:text-md hover:cursor-pointer w-fit"
            >
              Click Here
            </p>
          ) : (
            <p className="text-sm md:text-md ">Link not added yet</p>
          )}
        </div>
      </div>
      <div className="w-full px-4 md:px-8">
        {/* Button Documentation dan Panah */}
        <div
          className="relative bg-[#143AA2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center cursor-pointer flex items-center justify-center"
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
                className="absolute flex item-center justify-center top-4 right-4 w-8 h-8 pt-1 text-[#D3D4D7] bg-red-500 rounded-full hover:bg-red-700"
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
                  <p className="text-[#D3D4D7] text-xl">Video Not Added Yet</p>
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
