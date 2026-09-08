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
    "Brawijaya University student passionate about creating innovative web solutions. Focused on full-stack development and continuously exploring new technologies.";
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
        className="flex flex-col py-8 md:py-24 items-center mt-16 justify-center bg-[#3E8DE3] animate-fade-in"
      >
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 md:px-32 gap-8 md:gap-0">
          {/* Foto Profil */}
          <div
            className="flex w-full md:w-auto justify-center items-center order-1 md:order-2 animate-slide-in-right"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <div className="relative border-[#143AA2] flex justify-center items-center rounded-full bg-transparent w-36 h-36 border-4 md:w-56 md:h-56 md:border-8 shadow-xl animate-pulse-slow hover:scale-110 transition-transform duration-500">
              <div className="relative rounded-full bg-transparent shadow-lg border-[#143AA2] border-[2.5px] w-32 h-32 md:border-4 md:w-48 md:h-48 overflow-hidden">
                <img
                  src={profilePicture}
                  alt={name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Teks Perkenalan */}
          <div className="flex flex-col w-full items-center md:items-start text-center md:text-left order-2 md:order-1">
            <h1
              className="text-2xl font-bold mb-2 md:text-4xl tracking-tight text-white drop-shadow-sm animate-slide-in-left"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {name}
            </h1>

            <div
              className="text-lg md:text-2xl font-semibold mb-4 h-9 animate-slide-in-left"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <span className="inline-flex items-center text-[#143AA2] bg-white px-4 py-1.5 rounded-full shadow-md">
                I'm a&nbsp;
                <span className="text-[#3E8DE3] font-bold">{typedRole}</span>
                <span className="animate-blink ml-0.5">|</span>
              </span>
            </div>

            <p
              className="text-sm md:text-lg text-white/90 leading-relaxed animate-slide-in-left max-w-xl"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              {bio}
            </p>

            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border-2 border-white text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white hover:text-[#3E8DE3] transition-all duration-300 animate-slide-in-left"
                style={{ animationDelay: "0.5s", animationFillMode: "both" }}
              >
                View CV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
      <Wave
        flip={true}
        color="#3E8DE3"
        className="animate-fade-in"
        style={{ animationDelay: "0.6s", animationFillMode: "both" } as React.CSSProperties}
      />
    </>
  );
}

export default Perkenalan;
