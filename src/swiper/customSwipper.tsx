import React, { FC, ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
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
  slidesPerView = 1,
  navigationId = "default",
}) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleSlideChange = (swiper: SwiperInstance) => {
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  };

  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      {/* Tombol Navigasi Kiri */}
      <button
        type="button"
        aria-label="Slide sebelumnya"
        className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-md transition-all duration-200 custom-prev-btn-${navigationId} ${isPrevDisabled
            ? "opacity-40 cursor-not-allowed"
            : "opacity-100 hover:bg-white hover:scale-110"
          }`}
        disabled={isPrevDisabled}
      >
        <ArrowPrev />
      </button>

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
        className="overflow-hidden flex-1 min-w-0"
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tombol Navigasi Kanan */}
      <button
        type="button"
        aria-label="Slide berikutnya"
        className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-md transition-all duration-200 custom-next-btn-${navigationId} ${isNextDisabled
            ? "opacity-40 cursor-not-allowed"
            : "opacity-100 hover:bg-white hover:scale-110"
          }`}
        disabled={isNextDisabled}
      >
        <ArrowNext />
      </button>
    </div>
  );
};

export default CustomSwipper;
export { SwiperSlide };
