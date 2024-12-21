import Perkenalan from "../component/Perkenalan";
import Portofolio from "../component/Portofolio";
import Contact from "../component/Contact";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Content() {
  return (
    <div>
      <Perkenalan />
      <Portofolio />
      <Contact />
    </div>
  );
}

export default Content;
