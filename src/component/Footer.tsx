function Footer() {
  return (
    <footer className="relative bg-[#143AA2] text-white">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full" fill="#143AA2">
          <path d="M0,60 C150,30 300,80 450,50 C600,20 750,80 900,50 C1050,20 1200,60 1200,60 L1200,80 L0,80 Z" />
        </svg>
      </div>
      
      <div className="relative pt-10 pb-6 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/70">
            © 2024 Rino Oktavian Ridwan. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
