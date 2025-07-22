// import logo from "../../assets/images/QuasivoLOGO.jpg";
import logo from "../../assets/images/Justlogo.png";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="absolute w-full flex justify-between items-center pt-2 h-19 md:h-[12vh] lg:h-[12vh]  pb-4 px-4 sm:pt-4 sm:pb-6 sm:px-6 ">
      <img
        src={logo}
        alt="Quasivo"
        className="
    w-auto 
    mt-4 
    sm:mt-5 
    md:mt-6 
    lg:mt-8 
    xl:mt-8
    h-[5rem] 
    ml-[-1.3rem]
    sm:h-[9rem] 
    md:h-[9rem] 
    lg:h-[8rem] 
    xl:h-[10rem] 
    max-w-[12rem] opacity-100
    xl:ml-[-2rem] 

  "
      />

      <nav className="text-white text-lg">
        <Link to="/about-us">
          <button
            className="relative z-10  mt-[1rem] bg-transparent text-white border border-blue-500
                px-4 py-2 text-sm
                sm:px-6 sm:py-3 sm:text-base 
                md:px-8 md:py-4 md:text-lg
                xl:px-9 xl:py-3.5 xl:text-xl
                rounded-lg font-semibold tracking-wide
                transition-all duration-300 transform
                hover:bg-blue-900/20 hover:text-cyan-200 hover:shadow-lg hover:scale-105
                w-full sm:w-auto overflow-hidden cursor-pointer focus:outline-none"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)", // for Safari
            }}
          >
            ENTER THE FUTURE
          </button>
        </Link>
      </nav>
    </header>
  );
}
