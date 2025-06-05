function Perkenalan() {
  return (
    <>
      <div
        id="bio"
        className="flex flex-col py-8 md:py-24 items-center mt-16 justify-center bg-[#3E8DE3]"
      >
        <div className="flex flex-row justify-between items-center w-full px-8 md:px-32">
          {/* Teks Perkenalan */}
          <div className="flex flex-col w-full items-start">
            <p className="text-xl font-bold mb-4 md:text-3xl">
              Rino Oktavian Ridwan
            </p>
            <p className="text-sm md:text-lg">
              A student at Brawijaya University with a passion for front-end and
              full-stack development. I am enthusiastic about creating
              innovative and user-friendly web solutions while continuously
              enhancing my skills in web development and software engineering.
            </p>
          </div>
          {/* Foto Profil */}
          <div className="flex w-full justify-center items-center">
            <div className="relative border-[#143AA2] flex justify-center items-center rounded-full bg-transparent w-36 h-36 border-4 md:w-56 md:h-56 md:border-8">
              <div className="relative rounded-full bg-transparent shadow-lg border-[#143AA2] border-[2.5px] w-32 h-32  md:border-4 md:w-48 md:h-48">
                <img
                  src="/Foto_Diri.png"
                  alt="Profile"
                  className="absolute h-full object-cover scale-[1.5] top-[-30px] right-[15.5px] md:top-[-44px] md:right-[23.4px]"
                  style={{
                    clipPath: "inset(0 0 0 0 round 0 0 48.5% 48.5%)",
                  }}
                />
              </div>
            </div>
          </div>
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

export default Perkenalan;
