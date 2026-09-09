import CustomSwipper from "../swiper/customSwipper";
import Card from "./card/Card";
import { SwiperSlide } from "swiper/react";
import Wave from "./Wave";
import type { ProjectResponse } from "../api/types";

type PortofolioProps = {
  projects: ProjectResponse[];
};

function Portofolio({ projects }: PortofolioProps) {
  const visibleProjects = projects.filter((project) => project.isVisible);

  return (
    <>
      <div
        id="projects"
        className="relative flex flex-col w-full bg-[#3E8DE3] justify-center items-center pt-12 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.03%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
              Projects
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight leading-tight">
              Projects I&rsquo;ve Built
            </h2>
            <p className="text-center text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              A selection of projects showcasing my experience in full-stack development
            </p>
          </div>

          <div className="flex w-full justify-center items-center">
            {visibleProjects.length > 0 ? (
              <CustomSwipper
                className="w-full max-w-[95vw] md:max-w-[850px] lg:max-w-[1100px] h-[850px] min-[420px]:h-[750px] sm:h-[650px] md:h-[550px] lg:h-[500px] transition-all duration-300 ease-in-out"
                navigationId="projects"
                disableTouch
              >
                {visibleProjects.map((project) => (
                  <SwiperSlide key={project.id} className="h-full">
                    <Card project={project} />
                  </SwiperSlide>
                ))}
              </CustomSwipper>
            ) : (
              <p className="text-white/80 text-lg text-center py-16">
                Belum ada proyek yang ditampilkan.
              </p>
            )}
          </div>
        </div>
      </div>

      <Wave flip={true} color="#3E8DE3" />
    </>
  );
}

export default Portofolio;
