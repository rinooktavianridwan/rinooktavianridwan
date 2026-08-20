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
        className="flex flex-col py-8 md:py-24 items-center mt-16 justify-center bg-gradient-to-br from-[#4A97ED] via-[#3E8DE3] to-[#2E6FBF] animate-fade-in"
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
                  className="absolute h-full object-cover scale-[1.5] top-[-30px] right-[15.5px] md:top-[-44px] md:right-[23.4px]"
                  style={{
                    clipPath: "inset(0 0 0 0 round 0 0 48.5% 48.5%)",
                  }}
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
          </div>
        </div>
      </div>
      <Wave
        flip={true}
        color="#2E6FBF"
        className="animate-fade-in"
        style={{ animationDelay: "0.6s", animationFillMode: "both" } as React.CSSProperties}
      />
    </>
  );
}

export default Perkenalan;
