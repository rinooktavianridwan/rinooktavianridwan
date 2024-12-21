function Perkenalan() {
  return (
    <>
      <div
        id="bio"
        className="flex flex-col h-80 items-center mt-16 justify-center bg-blue-100"
      >
        <div className="flex flex-row justify-between items-center w-full px-8 md:px-32">
          {/* Teks Perkenalan */}
          <div className="flex flex-col w-full items-start">
            <p className="text-xl font-bold mb-4 md:text-3xl">Rino Oktavian Ridwan</p>
            <p className="text-md md:text-lg">
              Mahasiswa Universitas Brawijaya, memiliki minat di bidang
              front-end developer dan full-stack developer.
            </p>
          </div>

          {/* Foto Profil */}
          <div className="flex w-full justify-center items-center">
            <div className="relative border-blue-500 flex justify-center items-center rounded-full bg-transparent w-36 h-36 border-4 md:w-56 md:h-56 md:border-8">
              <div className="relative rounded-full bg-transparent shadow-lg border-blue-500 border-2 w-32 h-32  md:border-4 md:w-48 md:h-48">
                <img
                  src="/profile.png"
                  alt="Profile"
                  className="absolute w-full h-full object-cover scale-125"
                  style={{
                    clipPath: "circle(48% at 50% 42%)",
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
          className="w-full h-32 scale-y-[-1] fill-blue-100"
        >
          <path d="M0,80 C100,50 300,30 450,70 C600,110 750,50 900,80 C1050,110 1400,60 1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </>
  );
}

export default Perkenalan;
