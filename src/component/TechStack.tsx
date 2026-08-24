import type { TechnologyResponse } from "../api/types";
import { isEmojiIcon } from "../utils/icon.util";
import Wave from "./Wave";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type TechStackProps = {
    technologies: TechnologyResponse[];
};

function TechStack({ technologies }: TechStackProps) {
    const visibleTechs = technologies.filter((tech) => tech.isVisible);

    const rowSize = Math.ceil(visibleTechs.length / 2);
    const row1 = visibleTechs.slice(0, rowSize);
    const row2 = visibleTechs.slice(rowSize);

    const fadeMaskStyle: React.CSSProperties = {
        maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    };

    const TechBadge = ({ tech }: { tech: TechnologyResponse }) => (
        <div
            className="inline-flex items-center flex-shrink-0 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
                backgroundColor: `${tech.color}15`,
                color: tech.color,
                border: `3px solid ${tech.color}`,
            }}
        >
            <span className="mr-3">
                {isEmojiIcon(tech.iconUrl) ? (
                    <span className="text-2xl">{tech.iconUrl}</span>
                ) : (
                    <img src={tech.iconUrl} alt={tech.name} className="w-7 h-7 object-contain" />
                )}
            </span>
            <span>{tech.name}</span>
        </div>
    );

    const TechMarqueeRow = ({
        row,
        reverse = false,
        speed = 6500,
    }: {
        row: TechnologyResponse[];
        reverse?: boolean;
        speed?: number;
    }) => {
        if (!row.length) {
            return null;
        }

        return (
            <div
                className="relative overflow-x-hidden overflow-y-visible w-full py-3 -my-3"
                style={fadeMaskStyle}
                dir={reverse ? "rtl" : "ltr"}
            >
                <Swiper
                    modules={[Autoplay]}
                    loop={row.length > 1}
                    loopAdditionalSlides={row.length * 4}
                    speed={speed}
                    autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        waitForTransition: true,
                    }}
                    slidesPerView="auto"
                    spaceBetween={24}
                    allowTouchMove={false}
                    className="tech-marquee-swiper !overflow-visible"
                >
                    {row.map((tech) => (
                        <SwiperSlide key={tech.id} className="!w-auto pb-1">
                            <TechBadge tech={tech} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    };

    return (
        <>
            <div id="techstack" className="w-full bg-white py-16 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 mb-12">
                    <h2 className="text-center text-4xl font-bold mb-4 animate-fade-in-down text-gray-800">
                        Tech Stack
                    </h2>
                    <div
                        className="text-center text-sm text-gray-600 mb-12 animate-fade-in"
                        style={{ animationDelay: "0.2s", animationFillMode: "both" }}
                    >
                        Technologies I work with
                    </div>

                    <div className="space-y-6">
                        {visibleTechs.length > 0 ? (
                            <>
                                <TechMarqueeRow row={row1} speed={7000} />
                                <TechMarqueeRow row={row2} reverse speed={7000} />
                            </>
                        ) : (
                            <p className="text-center text-gray-500 text-lg py-8">
                                Belum ada teknologi yang ditampilkan.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Wave
                flip={false}
                color="#3E8DE3"
                className="animate-fade-in"
                style={{ animationDelay: "0.4s", animationFillMode: "both" } as React.CSSProperties}
            />
        </>
    );
}

export default TechStack;
