import { useTypingEffect } from "../hooks/useTypingEffect";
import type { UserResponse } from "../api/types";
import Wave from "./Wave";

type PerkenalanProps = {
  profile?: UserResponse;
};

function Perkenalan({ profile }: PerkenalanProps) {
  const roles = [
    "Full-Stack Developer",
    "Frontend Enthusiast",
    "Backend Developer",
    "DevOps Explorer",
  ];

  const name = profile?.name || "Rino Oktavian Ridwan";
  const bio =
    profile?.bio ||
    "Passionate about creating innovative web applications. Focused on building reliable systems and continuously exploring new technologies.";
  const profilePicture = profile?.profilePictureUrl || "/Foto_Diri.png";

  const cvUrl = import.meta.env.VITE_CV_URL || "";

  const typedRole = useTypingEffect({
    texts: roles,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
  });

  return (
    <>
      <div
        id="bio"
        className="relative flex flex-col py-16 md:py-32 items-center mt-16 justify-center bg-[#3E8DE3] animate-fade-in overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#143AA2]/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-20 lg:px-32 gap-12 md:gap-0 relative z-10">
          {/* Foto Profil */}
          <div
            className="flex w-full md:w-auto justify-center items-center order-1 md:order-2 animate-slide-in-right relative"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 md:-inset-6 rounded-full bg-gradient-to-r from-[#143AA2] to-[#3E8DE3] opacity-30 blur-2xl animate-pulse-slow" />
              {/* Middle ring */}
              <div className="absolute -inset-2 md:-inset-3 rounded-full border-2 border-[#143AA2]/50 animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
              {/* Inner ring */}
              <div className="relative border-4 md:border-8 border-[#143AA2] rounded-full bg-white/10 backdrop-blur-sm shadow-2xl w-36 h-36 md:w-56 md:h-56 lg:w-64 lg:h-64 overflow-hidden group hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3E8DE3]/20 to-[#143AA2]/20" />
                <img
                  src={profilePicture}
                  alt={name}
                  className="w-full h-full object-cover object-center relative z-10"
                />
              </div>
            </div>
            {/* Floating decoration dots */}
            <div className="absolute -top-4 -right-4 w-3 h-3 bg-[#143AA2] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-4 -right-6 w-2 h-2 bg-[#3E8DE3] rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
            <div className="absolute -top-2 left-4 w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.6s" }} />
          </div>

          {/* Teks Perkenalan */}
          <div className="flex flex-col w-full items-center md:items-start text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-6 animate-slide-in-left" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-[#143AA2] to-[#3E8DE3] rounded-full opacity-20 blur" />
              </span>
              <span className="relative z-10">Software Engineer</span>
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white drop-shadow-lg animate-slide-in-left"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            <div
              className="text-lg md:text-2xl lg:text-3xl font-semibold mb-6 h-10 lg:h-12 animate-slide-in-left"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full shadow-lg">
                <span className="text-white/70">I'm a&nbsp;</span>
                <span className="bg-gradient-to-r from-[#143AA2] to-[#3E8DE3] bg-clip-text text-transparent font-bold">{typedRole}</span>
                <span className="animate-blink ml-1 text-white/50">|</span>
              </span>
            </div>

            <p
              className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed animate-slide-in-left max-w-2xl lg:max-w-xl"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              {bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-in-left" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
              {cvUrl && (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-[#3E8DE3] transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-[#143AA2]/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span>View CV</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              )}
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                <span>View Projects</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Wave
        flip={true}
        color="#3E8DE3"
        className="animate-fade-in -mt-px"
        style={{ animationDelay: "0.6s", animationFillMode: "both" } as React.CSSProperties}
      />
    </>
  );
}

export default Perkenalan;
