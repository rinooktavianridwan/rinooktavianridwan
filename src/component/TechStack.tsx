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
        moveRight = false,
        speed = 6500,
        rowKey,
    }: {
        row: TechnologyResponse[];
        moveRight?: boolean;
        speed?: number;
        rowKey: string;
    }) => {
        if (!row.length) {
            return null;
        }

        // Trik: Jika bergerak ke kanan (menggunakan RTL), kita harus membalik array-nya 
        // agar elemen pertama (index 0) tetap muncul duluan.
        const displayRow = moveRight ? [...row].reverse() : row;

        return (
            <div
                className="relative overflow-x-hidden overflow-y-visible w-full py-3 -my-3"
                style={fadeMaskStyle}
                // Menggunakan dir="rtl" menggantikan reverseDirection yang sering nge-bug
                dir={moveRight ? "rtl" : "ltr"}
            >
                <Swiper
                    key={`swiper-${rowKey}`} // Membedakan instance Swiper agar tidak bentrok
                    modules={[Autoplay]}
                    loop={true}
                    loopAdditionalSlides={row.length * 4}
                    speed={speed}
                    autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        waitForTransition: true,
                    }}
                    slidesPerView="auto"
                    spaceBetween={24}
                    allowTouchMove={false}
                    className={`tech-marquee-swiper-${rowKey} !overflow-visible`}
                >
                    {displayRow.map((tech, index) => (
                        <SwiperSlide
                            key={`${tech.id}-${rowKey}-${index}`}
                            className="!w-auto pb-1"
                            dir="ltr" // WAJIB ADA: Mengembalikan arah teks menjadi normal agar nama seperti "Next.js" tidak terbalik
                        >
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
                                {/* Baris Atas: Urutan normal, gerak kiri ke kanan */}
                                <TechMarqueeRow
                                    row={visibleTechs}
                                    moveRight={true}
                                    speed={7000}
                                    rowKey="top"
                                />

                                {/* Baris Bawah: Urutan dibalik + offset, gerak kanan ke kiri */}
                                <TechMarqueeRow
                                    row={[
                                        ...visibleTechs.slice(Math.ceil(visibleTechs.length / 2)),
                                        ...visibleTechs.slice(0, Math.ceil(visibleTechs.length / 2)),
                                    ].reverse()}
                                    moveRight={false}
                                    speed={7000}
                                    rowKey="bottom"
                                />
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
