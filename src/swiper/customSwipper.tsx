import React, { FC, ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowNext from "../component/icon/ArrowNext";
import ArrowPrev from "../component/icon/ArrowPrev";
import "swiper/css";
import "swiper/css/navigation";

type CustomSwipperProps = {
  children: ReactNode;
  className?: string;
  slidesPerView?: number;
  navigationId?: string;
};

const CustomSwipper: FC<CustomSwipperProps> = ({
  children,
  className = "",
  slidesPerView = 1, // Default 1 slide per view
  navigationId = "default",
}) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleSlideChange = (swiper: any) => {
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  };

  return (
    <div className={`flex flex-row ${className}`}>
      {/* Tombol Navigasi Kiri */}
      <div className="flex items-center justify-center w-2/5 h-full">
        <button
          type="button"
          className={`w-full h-fit custom-prev-btn-${navigationId} ${
            isPrevDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={isPrevDisabled}
        >
          <ArrowPrev />
        </button>
      </div>

      {/* Swiper Component */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.custom-prev-btn-${navigationId}`,
          nextEl: `.custom-next-btn-${navigationId}`,
        }}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        onSlideChange={handleSlideChange}
        onInit={(swiper) => handleSlideChange(swiper)}
        className="overflow-hidden"
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tombol Navigasi Kanan */}
      <div className="flex items-center justify-center w-2/5 h-full">
        <button
          type="button"
          className={`w-full h-fit custom-next-btn-${navigationId} ${
            isNextDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={isNextDisabled}
        >
          <ArrowNext />
        </button>
      </div>
    </div>
  );
};

export default CustomSwipper;
export { SwiperSlide };
