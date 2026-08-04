function Footer() {
  return (
    <footer className="flex h-16 items-center justify-center bg-[#143AA2] text-center animate-fade-in">
      <p className="text-sm text-white/95 hover:scale-105 transition-transform duration-300">
        © {new Date().getFullYear()} Rino Oktavian Ridwan. All Rights Reserved.
      </p>
    </footer>
  );
}
export default Footer;
