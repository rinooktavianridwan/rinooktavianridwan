import { useState, useRef } from "react";
import ArrowUp from "../icon/ArrowUp";
import CustomSwipper from "../../swiper/customSwipper";
import { SwiperSlide } from "swiper/react";
import type { ProjectResponse } from "../../api/types";

interface CardProps {
  project: ProjectResponse;
}

function Card({ project }: CardProps) {
  const [show, setShow] = useState(false);
  const { title, description, images, websiteUrl, githubUrl, documentationUrl, technologies } =
    project;
  const swiperRef = useRef<any>(null);

  return (
    <>
      <div className="group relative flex flex-col bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl w-full h-full p-6 border border-gray-100 hover:border-[#3E8DE3]/20">
        {/* Top accent bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 transition-all duration-500 h-1 bg-gradient-to-r from-[#143AA2] to-[#3E8DE3] rounded-b-lg" />
        
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-900 group-hover:text-[#143AA2] transition-colors duration-300">
          {title}
        </h3>

        <div className="bg-gradient-to-br from-[#3E8DE3]/5 to-[#143AA2]/5 rounded-xl w-full p-4 relative overflow-hidden flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="w-full md:col-span-7 relative">
              {images && images.length > 0 ? (
                <div className="relative h-full min-h-[220px] max-h-[280px] rounded-lg overflow-hidden bg-gray-50">
                  <CustomSwipper 
                    navigationId={`card-images-${project.id}`}
                    className="h-full"
                  >
                    {images.map((img, idx) => (
                      <SwiperSlide key={img.id} className="h-full flex items-center justify-center px-2">
                        <img
                          src={img.imageUrl}
                          alt={`${title} - screenshot ${idx + 1}`}
                          className="w-full h-full object-contain max-h-[260px] transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </SwiperSlide>
                    ))}
                  </CustomSwipper>
                  
                  {/* Image indicators */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => swiperRef.current?.swiper?.slideToLoop(idx)}
                          className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/75 transition-all duration-300"
                          aria-label={`View image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[220px] text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">No images available</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5 md:col-span-5 md:pl-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 min-h-[150px] max-h-[220px] md:min-h-[180px] md:max-h-[240px] overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-base text-gray-700 leading-relaxed">{description}</p>
              </div>

              {technologies && technologies.length > 0 && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Technologies</h4>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {technologies.map((tech) => (
                      <span
                        key={tech.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full"
                        style={{
                          backgroundColor: `${tech.color}15`,
                          color: tech.color,
                          border: `1px solid ${tech.color}40`,
                        }}
                      >
                        {tech.iconUrl && tech.iconUrl.length <= 2 && /\p{Emoji}/u.test(tech.iconUrl) ? (
                          <span className="text-xs">{tech.iconUrl}</span>
                        ) : tech.iconUrl && !/\p{Emoji}/u.test(tech.iconUrl) ? (
                          <img src={tech.iconUrl} alt="" className="w-3 h-3 object-contain" />
                        ) : null}
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <a
              href={websiteUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                websiteUrl
                  ? "bg-[#143AA2] text-white hover:bg-[#102c7b] hover:shadow-lg hover:shadow-[#143AA2]/30"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-disabled={!websiteUrl}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>Live Demo</span>
            </a>
            <a
              href={githubUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                githubUrl
                  ? "bg-gray-900 text-white hover:bg-gray-700 hover:shadow-lg"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-disabled={!githubUrl}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Code</span>
            </a>
          </div>

          <div className="w-full mt-6">
            <button
              type="button"
              onClick={() => setShow(true)}
              disabled={!documentationUrl}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                documentationUrl
                  ? "bg-gradient-to-r from-[#143AA2] to-[#3E8DE3] text-white hover:from-[#102c7b] hover:to-[#2E5C99] hover:shadow-lg hover:shadow-[#143AA2]/40"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-disabled={!documentationUrl}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{documentationUrl ? "Watch Demo" : "No Demo Available"}</span>
              <div className="transform rotate-45 transition-transform group-hover:rotate-90">
                <ArrowUp />
              </div>
            </button>
          </div>
        </div>
      </div>

      {show && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
          onClick={() => setShow(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Demo video for ${title}`}
        >
          <div className="relative w-11/12 md:w-4/5 lg:w-[72%] xl:w-[65%] max-w-[1200px] animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close video"
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
              onClick={() => setShow(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {documentationUrl ? (
              <iframe
                src={documentationUrl}
                title={`${title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video rounded-xl shadow-2xl"
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center w-full aspect-video bg-gray-900 rounded-xl">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4 animate-pulse">
                  <svg className="w-10 h-10 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg">Video Not Added Yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Card;