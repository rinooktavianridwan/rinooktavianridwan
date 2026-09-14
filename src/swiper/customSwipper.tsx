import React, { FC, ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import ArrowNext from "../component/icon/ArrowNext";
import ArrowPrev from "../component/icon/ArrowPrev";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CustomSwipperProps = {
  children: ReactNode;
  className?: string;
  slidesPerView?: number;
  navigationId?: string;
  disableTouch?: boolean;
  showDots?: boolean;
  dotsVariant?: "light" | "dark";
};

const CustomSwipper: FC<CustomSwipperProps> = ({
  children,
  className = "",
  slidesPerView = 1,
  navigationId = "default",
  showDots = false,
  dotsVariant = "dark",
}) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const swiperId = `swiper-${navigationId}`;

  const handleSlideChange = (swiper: SwiperInstance) => {
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  };

  return (
    <div className={`swiper-controls flex flex-row items-center gap-2 ${className}`}>
      <button
        type="button"
        aria-label="Slide sebelumnya"
        aria-controls={swiperId}
        className={`hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-md transition-all duration-200 custom-prev-btn-${navigationId} ${isPrevDisabled
            ? "opacity-40 cursor-not-allowed"
            : "opacity-100 hover:bg-white hover:scale-110"
          }`}
        disabled={isPrevDisabled}
      >
        <ArrowPrev />
      </button>

      <Swiper
        id={swiperId}
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: `.custom-prev-btn-${navigationId}`,
          nextEl: `.custom-next-btn-${navigationId}`,
        }}
        pagination={showDots ? { clickable: true } : false}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        onSlideChange={handleSlideChange}
        onInit={(swiper) => handleSlideChange(swiper)}
        className={`overflow-hidden flex-1 min-w-0 h-full ${
          showDots ? `swiper-dots-${dotsVariant}` : ""
        }`}
        allowTouchMove={true}
        simulateTouch={true}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="h-full flex justify-center items-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Slide berikutnya"
        aria-controls={swiperId}
        className={`hidden md:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-md transition-all duration-200 custom-next-btn-${navigationId} ${isNextDisabled
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
