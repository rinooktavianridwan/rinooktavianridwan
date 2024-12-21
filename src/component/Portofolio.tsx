// Portofolio.jsx
import CustomSwipper from "../swiper/customSwipper"; // Import CustomSwipper
import Card from "./card/Card"; // Import Card
import { SwiperSlide } from "swiper/react"; // Import SwiperSlide
import {projects} from "../data/projectData";

function Portofolio() {
  return (
    <>
      <div id="projects" className="flex flex-col w-full px-4 bg-white justify-center items-center">
        <h2 className="text-center text-4xl font-bold mb-8">Projects</h2>
        <div className="flex w-full justify-center items-center">
          {/* CustomSwipper */}
          <CustomSwipper className="w-full min-w-[450px] md:max-w-[800px] h-[440px] md:h-[350px] transition-all duration-300 ease-in-out">
            {projects.map((projects, index) => (
              <SwiperSlide key={index} className="flex-[0_0_100%] px-[10px]">
                  <Card
                    title={projects.title}
                    image={projects.image}
                    description={projects.description}
                    documentation={projects.documentation}
                    website={projects.website}
                    github={projects.github}
                  />
              </SwiperSlide>
            ))}
          </CustomSwipper>
        </div>
      </div>

      {/* Gelombang Menghadap ke Bawah */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-32 scale-x-[-1] fill-blue-100"
        >
          <path d="M0,80 C100,50 300,30 450,70 C600,110 750,50 900,80 C1050,110 1400,60 1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </>
  );
}

export default Portofolio;
