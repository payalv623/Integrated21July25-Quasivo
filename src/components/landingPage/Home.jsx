import Header from "./Header";
import Hero from "./Hero";
import Particles from "./Particles";
import humanShadow from "../../assets/images/AllrounderHuman.png";

export default function Home() {
  return (
    <div className="relative text-white font-sans overflow-hidden min-h-screen">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at center, #000319 25%, #000D32 90%,#000D32 30%)",
        }}
      />
      {/* Particles */}
      <Particles id="tsparticles" />
      {/* Header */}
      <Header />
      {/* Hero Image */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[30vh] h-[17.7%] z-10 pointer-events-none" />
      {/* , #000D30 3% */}

      <img
        src={humanShadow}
        alt="Human Shadow"
        className="absolute z-10  md:top-[15%] lg:top-[10%] xl:top-[15%] 2xl:top-[5%]  left-1/2 -translate-x-1/2 pointer-events-none
      opacity-110 mix-blend-lighten md:object-contain xl:object-contain object-contain 
      w-[99vw] top-[15%]  md:w-[130vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[60vw] xl:h-[85%] lg:scale-75 md:h-[65%] md:scale-84 xl:scale-140
      h-[58%] scale-115  max-w-none 2xl:h-[80vh]  2xl:scale-[1.4]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%,#00021a 100%)",
        }}
      />
      {/* Main Content */}
      {/* Headline Section */}
      <div
        className="
    absolute z-20
    top-[66%] sm:top-[60%] md:top-[76%] lg:top-[42%] xl:top-[80%] 
    left-1/2 transform -translate-x-1/2
    text-center pointer-events-none px-4 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%]
  "
      >
        <h1
          className="text-xl sm:text-sm md:text-xl lg:text-4xl 2xl:mt-[3%] 
                font-extrabold text-white drop-shadow-lg
                leading-tight m-0"
        >
          THE FUTURE THINKS DIFFERENTLY
        </h1>

        <h3
          className="
      text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl
      font-light text-slate-200 mt-2
      leading-snug"
        >
          Let's meet action, and innovation leads the way. Let your vision align with
          tomorrow’s intelligence
        </h3>
      </div>

      <Hero />
    </div>
  );
}
