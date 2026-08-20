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
        className="flex flex-col w-full bg-[#3E8DE3] justify-center items-center pt-12 pb-4"
      >
        <h2 className="text-center text-4xl font-bold text-white mb-2 animate-fade-in-down">
          Projects
        </h2>
        <p
          className="text-center text-sm text-white/80 mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          A few things I've built
        </p>
        <div className="flex w-full justify-center items-center">
          {visibleProjects.length > 0 ? (
            <CustomSwipper
              className="min-w-[100px] md:max-w-[800px] h-[440px] md:h-[350px] transition-all duration-300 ease-in-out"
              navigationId="projects"
            >
              {visibleProjects.map((project) => (
                <SwiperSlide key={project.id}>
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

      <Wave flip={true} color="#3E8DE3" />
    </>
  );
}

export default Portofolio;
