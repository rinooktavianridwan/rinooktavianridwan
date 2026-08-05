// components/Card.jsx
import { useState } from "react";
import ArrowUp from "../icon/ArrowUp";
import CustomSwipper from "../../swiper/customSwipper"; // Import CustomSwipper
import { SwiperSlide } from "swiper/react";
import type { ProjectResponse } from "../../api/types";

interface CardProps {
  project: ProjectResponse;
}

function Card({ project }: CardProps) {
  const [show, setShow] = useState(false);

  const { title, description, images, websiteUrl, githubUrl, documentationUrl } =
    project;

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg w-full h-full p-4 justify-start items-center">
      {/* Title - Larger and more prominent */}
      <h3 className="text-lg md:text-2xl font-bold mb-4 text-center text-black">{title}</h3>

      {/* Content Area with lighter blue background */}
      <div className="bg-[#5BA3F5] rounded-lg w-full p-4">
        {/* Grid Layout: 1 column on mobile, 7:3 ratio on desktop (image 70%, text 30%) */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
          {/* Left Column: Image - 7/10 width on desktop */}
          <div className="w-full md:col-span-7">
            {images && images.length > 0 ? (
              <CustomSwipper navigationId="card-images">
                {images.map((img) => (
                  <SwiperSlide key={img.id} className="px-[10px]">
                    <img
                      src={img.imageUrl}
                      alt={title}
                      className="w-full object-cover mx-auto rounded-lg"
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

          {/* Right Column: Text Content - 3/10 width on desktop */}
          <div className="flex flex-col gap-4 md:col-span-3">
            {/* Description Section */}
            <div className="flex flex-col">
              <h4 className="text-md md:text-lg font-bold text-black">Description</h4>
              <p className="text-sm md:text-md text-black">{description}</p>
            </div>

            {/* Link Website Section */}
            <div className="flex flex-col">
              <h4 className="text-md md:text-lg font-bold text-black">Link Website</h4>
              {websiteUrl ? (
                <p
                  onClick={() => window.open(websiteUrl, "_blank")}
                  className="text-sm md:text-md hover:cursor-pointer w-fit hover:underline text-black"
                >
                  Click Here
                </p>
              ) : (
                <p className="text-sm md:text-md text-black">Link not added yet</p>
              )}
            </div>

            {/* Link Github Section */}
            <div className="flex flex-col">
              <h4 className="text-md md:text-lg font-bold text-black">Link Github</h4>
              {githubUrl ? (
                <p
                  onClick={() => window.open(githubUrl, "_blank")}
                  className="text-sm md:text-md hover:cursor-pointer w-fit hover:underline text-black"
                >
                  Click Here
                </p>
              ) : (
                <p className="text-sm md:text-md text-black">Link not added yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Documentation Button - Full width below grid */}
        <div className="w-full mt-4">
          <button
            onClick={() => setShow(true)}
            className="w-full bg-[#2E5C99] hover:bg-[#1e3a5f] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors"
          >
            Documentation
            <div className="transform rotate-45">
              <ArrowUp />
            </div>
          </button>
        </div>
      </div>

      {/* Overlay untuk Video */}
      {show && (
        <div
          className="fixed inset-0 bg-blue-900 bg-opacity-95 flex justify-center items-center transition-transform duration-300 z-50"
          style={{
            transform: "translateY(0)",
          }}
        >
          <div className="relative w-11/12 md:w-4/5">
            <button
              className="absolute flex items-center justify-center top-4 right-4 w-8 h-8 pt-1 text-[#D3D4D7] bg-red-500 rounded-full hover:bg-red-700 z-10"
              onClick={() => setShow(false)}
            >
              ✕
            </button>
            {documentationUrl ? (
              <iframe
                width="100%"
                height="315"
                src={documentationUrl}
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
  );
}

export default Card;
