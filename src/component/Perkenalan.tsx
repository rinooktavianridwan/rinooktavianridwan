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
    "DevOps Explorer"
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
        className="flex flex-col py-8 md:py-24 items-center mt-16 justify-center bg-[#3E8DE3] animate-fade-in"
      >
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 md:px-32 gap-8 md:gap-0">
          {/* Foto Profil - First on mobile, second on desktop */}
          <div className="flex w-full md:w-auto justify-center items-center order-1 md:order-2 animate-slide-in-right" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="relative border-[#143AA2] flex justify-center items-center rounded-full bg-transparent w-36 h-36 border-4 md:w-56 md:h-56 md:border-8 animate-pulse-slow hover:scale-110 transition-transform duration-500">
              <div className="relative rounded-full bg-transparent shadow-lg border-[#143AA2] border-[2.5px] w-32 h-32 md:border-4 md:w-48 md:h-48">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="absolute h-full object-cover scale-[1.5] top-[-30px] right-[15.5px] md:top-[-44px] md:right-[23.4px]"
                  style={{
                    clipPath: "inset(0 0 0 0 round 0 0 48.5% 48.5%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Teks Perkenalan - Second on mobile, first on desktop */}
          <div className="flex flex-col w-full items-center md:items-start text-center md:text-left order-2 md:order-1">
            <p className="text-xl font-bold mb-2 md:text-3xl animate-slide-in-left" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              {name}
            </p>

            {/* Typing Animation */}
            <div className="text-lg md:text-2xl font-semibold mb-4 h-8 animate-slide-in-left" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <span className="text-[#143AA2] bg-white px-3 py-1 rounded-md shadow-md">
                I'm a <span className="text-[#3E8DE3] font-bold">{typedRole}</span>
                <span className="animate-blink">|</span>
              </span>
            </div>

            <p className="text-sm md:text-lg animate-slide-in-left max-w-xl" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              {bio}
            </p>
          </div>
        </div>
      </div>
      {/* Gelombang Menghadap ke Bawah */}
      <Wave
        flip={true}
        color="#3E8DE3"
        className="animate-fade-in"
        style={{ animationDelay: '0.6s', animationFillMode: 'both' } as React.CSSProperties}
      />
    </>
  );
}

export default Perkenalan;
