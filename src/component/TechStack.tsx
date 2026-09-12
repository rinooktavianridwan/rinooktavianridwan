import type { TechnologyResponse } from "../api/types";
import { isEmojiIcon } from "../utils/icon.util";
import Wave from "./Wave";
import { useEffect, useRef, useState } from "react";

type TechStackProps = {
    technologies: TechnologyResponse[];
};

type TechMarqueeRowProps = {
    row: TechnologyResponse[];
    moveRight?: boolean;
    speed?: number;
    rowKey: string;
    fadeMaskStyle: React.CSSProperties;
};

function TechBadge({ tech }: { tech: TechnologyResponse }) {
    return (
        <div
            className="inline-flex items-center flex-shrink-0 px-6 py-3 rounded-2xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group relative overflow-hidden"
            style={{
                backgroundColor: `${tech.color}12`,
                color: tech.color,
                border: `2px solid ${tech.color}60`,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `linear-gradient(90deg, transparent, ${tech.color}30, transparent)` }} />
            <span className="mr-2 relative z-10">
                {isEmojiIcon(tech.iconUrl) ? (
                    <span className="text-xl">{tech.iconUrl}</span>
                ) : (
                    <img src={tech.iconUrl} alt={tech.name} className="w-6 h-6 object-contain" />
                )}
            </span>
            <span className="relative z-10">{tech.name}</span>
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-2xl" />
        </div>
    );
}

function TechMarqueeRow({ row, moveRight = false, speed = 20000, rowKey, fadeMaskStyle }: TechMarqueeRowProps) {
    const displayRow = moveRight ? [...row].reverse() : row;

    const trackRef = useRef<HTMLDivElement>(null);
    const [trackWidth, setTrackWidth] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const measure = () => {
            const firstCopy = track.querySelector('[data-marquee-copy="first"]');
            if (firstCopy) {
                setTrackWidth(firstCopy.getBoundingClientRect().width);
            }
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(track);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [rowKey]);

    if (!row.length) {
        return null;
    }

    return (
        <div
            className="relative overflow-x-hidden overflow-y-visible w-full py-2 -my-2"
            style={fadeMaskStyle}
        >
            <div
                ref={trackRef}
                className={`flex gap-4 items-center ${moveRight ? "animate-marquee-rtl" : "animate-marquee-ltr"}`}
                style={{
                    animationDuration: `${speed}ms`,
                    ...(trackWidth > 0 && { "--marquee-width": `${trackWidth}px` }),
                } as React.CSSProperties}
                role="list"
                aria-label={moveRight ? "Tech stack marquee right to left" : "Tech stack marquee left to right"}
            >
                <div data-marquee-copy="first" className="flex gap-4 items-center flex-shrink-0">
                    {displayRow.map((tech, index) => (
                        <div key={`${tech.id}-${rowKey}-${index}`} className="flex-shrink-0 pb-1" role="listitem">
                            <TechBadge tech={tech} />
                        </div>
                    ))}
                </div>
                <div data-marquee-copy="second" className="flex gap-4 items-center flex-shrink-0">
                    {displayRow.map((tech, index) => (
                        <div key={`${tech.id}-${rowKey}-${index}-copy`} className="flex-shrink-0 pb-1" role="listitem">
                            <TechBadge tech={tech} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TechStack({ technologies }: TechStackProps) {
    const visibleTechs = technologies.filter((tech) => tech.isVisible);

    const fadeMaskStyle: React.CSSProperties = {
        maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    };

    return (
        <>
            <div id="techstack" className="w-full bg-white py-20 pb-24 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%233E8DE3%22 fillOpacity%3D%220.02%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
              
              <div className="container mx-auto px-4 relative z-10">
                  <div className="text-center mb-16 animate-fade-in-up">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3E8DE3]/10 border border-[#3E8DE3]/20 text-[#3E8DE3] text-sm font-medium mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#3E8DE3] animate-pulse" />
                        Tech Stack
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
                          Technologies I Work With
                      </h2>
                      <div className="text-center text-base text-gray-500 mb-8 max-w-2xl mx-auto">
                          A curated collection of tools and frameworks I use to build modern web applications
                      </div>
                  </div>

<div className="space-y-8">
                       {visibleTechs.length > 0 ? (
                           <>
                               <div className="relative">
                                 {/* Tambahan z-10 agar efek bayangan putih berada di atas animasi berjalan */}
                                 <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                                 <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
<TechMarqueeRow
    row={visibleTechs}
    moveRight={true}
    speed={60000}
    rowKey="top"
    fadeMaskStyle={fadeMaskStyle}
/>
                               </div>

                               <div className="relative">
                                 <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                                 <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
<TechMarqueeRow
    row={visibleTechs}
    moveRight={false}
    speed={60000}
    rowKey="bottom"
    fadeMaskStyle={fadeMaskStyle}
/>
                               </div>
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
    