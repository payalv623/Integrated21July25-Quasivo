import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Tile3D from "./Tile3D";
import { useEffect, useState } from "react";
import GlowingOrb from "./GlowingOrb";
import { Trail } from "@react-three/drei";

// Images
import aimlFront from "../../assets/frontVerticalsImages/4.jpg";
import aimlBack from "../../assets/backFlippedImages/7.jpg";
import responsibleFront from "../../assets/frontVerticalsImages/2.jpg";
import responsibleBack from "../../assets/backFlippedImages/6.jpg";
import agenticFront from "../../assets/frontVerticalsImages/3.jpg";
import agenticBack from "../../assets/backFlippedImages/8.jpg";
import dataAnalyticsFront from "../../assets/frontVerticalsImages/1.jpg";
import dataAnalyticsBack from "../../assets/backFlippedImages/5.jpg";

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallDesktop, setIsSmallDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;

      // Zoom-safe queries using matchMedia
      // setIsMobile(window.matchMedia("(max-width: 767px)").matches);
      // setIsTablet(
      //   window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches
      // );
      // setIsSmallDesktop(
      //   window.matchMedia("(min-width: 1024px) and (max-width: 1365px)").matches
      // );

      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsSmallDesktop(width >= 1024 && width < 1366); // New range for 1280x800-like resolutions
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="w-full h-[60vh] sm:h-[80vh] md:h-[100vh] xl:h-[100vh] xxl:h-[100vh] ">
      <Canvas camera={{ position: [0, 0, isMobile ? 15 : 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls enableZoom={false} click={false} />
        {/* <Trail
          width={0.1}
          length={6}
          color={"#00ccff"}
          attenuation={(t) => t * t}
        >
          <GlowingOrb />
        </Trail> */}
        {isMobile ? (
          // 📱 Mobile stacked layout
          <>
            <Tile3D
              position={[-3, -0.8, 4]}
              frontImage={aimlFront}
              backImage={aimlBack}
              backImagePosition={-0.2}
  redirectTo="/NeuralNetwork" 

            />
            <Tile3D
              position={[-3.6, -4, 4]}
              frontImage={responsibleFront}
              backImage={responsibleBack}
              backImagePosition={-0.7}
            />
            <Tile3D
              position={[2.6, -1, 4.5]}
              frontImage={agenticFront}
              backImage={agenticBack}
              backImagePosition={0}
              redirectTo="/agentic-ai"
            />
            <Tile3D
              position={[4.2, -5.1, 1]}
              frontImage={dataAnalyticsFront}
              backImage={dataAnalyticsBack}
              backImagePosition={-0.7}
            />
          </>
        ) : isTablet ? (
          // 📱 Tablet adjusted layout
          <>
            <Tile3D
              position={[-3.8, 1.5, -1]}
              frontImage={aimlFront}
              backImage={aimlBack}
              backImagePosition={-2.2}
  redirectTo="/NeuralNetwork" 

/>
            <Tile3D
              position={[-2.9, -0.8, -1]}
              frontImage={responsibleFront}
              backImage={responsibleBack}
              backImagePosition={-5.7}
            />
            <Tile3D
              position={[2.5, 1.3, -1]}
              frontImage={agenticFront}
              backImage={agenticBack}
              backImagePosition={-5.7}
              redirectTo="/agentic-ai"
            />
            <Tile3D
              position={[2.9, -1, -1.9]}
              frontImage={dataAnalyticsFront}
              backImage={dataAnalyticsBack}
              backImagePosition={-1.7}
            />
          </>
        ) : isSmallDesktop ? (
          // ✨ 1280x800 layout
          <>
            <Tile3D
              position={[-3.5, 1.7, 0.5]}
              frontImage={aimlFront}
              backImage={aimlBack}
              backImagePosition={0.5}
  redirectTo="/NeuralNetwork" 

            />
            <Tile3D
              position={[-3.5, -1.5, 0.5]}
              frontImage={responsibleFront}
              backImage={responsibleBack}
              backImagePosition={0.5}
            />
            <Tile3D
              position={[3.5, 1.7, 0.5]}
              frontImage={agenticFront}
              backImage={agenticBack}
              backImagePosition={0.5}
              redirectTo="/agentic-ai"
            />
            <Tile3D
              position={[3.5, -1.5, 0]}
              frontImage={dataAnalyticsFront}
              backImage={dataAnalyticsBack}
              backImagePosition={0.5}
            />
          </>
        ) : (
          // 💻 Full Desktop layout ()
          <>
            <Tile3D
              position={[-3, 1.8, 3]}
              frontImage={aimlFront}
              backImage={aimlBack}
              backImagePosition={0.7}
  redirectTo="/NeuralNetwork" 
            />
            <Tile3D
              position={[-3.4, -1, 2.5]}
              frontImage={responsibleFront}
              backImage={responsibleBack}
              backImagePosition={0.7}
            />
            <Tile3D
              position={[2.5, 1.5, 3.5]}
              frontImage={agenticFront}
              backImage={agenticBack}
              backImagePosition={0.7}
              redirectTo="/agentic-ai"
            />
            <Tile3D
              position={[3.8, -1.2, 1]}
              frontImage={dataAnalyticsFront}
              backImage={dataAnalyticsBack}
              backImagePosition={0.7}
            />
          </>
        )}
      </Canvas>
    </div>
  );
}
