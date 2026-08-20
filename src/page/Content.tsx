import Perkenalan from "../component/Perkenalan";
import TechStack from "../component/TechStack";
import Portofolio from "../component/Portofolio";
import Contact from "../component/Contact";
import { usePortfolioData } from "../hooks/usePortfolioData";

function LoadingState() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#4A97ED] via-[#3E8DE3] to-[#2E6FBF] gap-4">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      <p className="text-white font-semibold animate-pulse">Memuat data...</p>
    </div>
  );
}

function Content() {
  const { data, loading, error } = usePortfolioData();

  if (error) {
    // Tetap tampilkan data fallback ke user, ini cuma buat kebutuhan debug.
    console.warn("Portfolio API gagal, menampilkan data fallback:", error);
  }

  if (loading) {
    return <LoadingState />;
  }

  const { profile, contacts, projects, technologies } = data;

  return (
    <div>
      <Perkenalan profile={profile} />
      <TechStack technologies={technologies} />
      <Portofolio projects={projects} />
      <Contact contacts={contacts} />
    </div>
  );
}

export default Content;