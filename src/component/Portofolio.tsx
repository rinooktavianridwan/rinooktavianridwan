// Portofolio.jsx
import CustomSwipper from "../swiper/customSwipper"; // Import CustomSwipper
import Card from "./card/Card"; // Import Card
import { SwiperSlide } from "swiper/react"; // Import SwiperSlide
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
        <h2 className="text-center text-4xl font-bold mb-8">Projects</h2>
        <div className="flex w-full justify-center items-center">
          {visibleProjects.length > 0 ? (
            <CustomSwipper
              className=" min-w-[100px] md:max-w-[800px] h-[440px] md:h-[350px] transition-all duration-300 ease-in-out"
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

      {/* Gelombang Menghadap ke Bawah */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-32 scale-y-[-1] fill-[#3E8DE3]"
        >
          <path d="M0,80 C100,50 300,30 450,70 C600,110 750,50 900,80 C1050,110 1400,60 1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </>
  );
}

export default Portofolio;