import React, { FC, ReactNode, useState, useRef } from "react";
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
};

const CustomSwipper: FC<CustomSwipperProps> = ({
  children,
  className = "",
  slidesPerView = 1, // Default 1 slide per view
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

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
          ref={prevRef}
          className={`w-full h-fit ${
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
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
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
          ref={nextRef}
          className={`w-full h-fit ${
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
