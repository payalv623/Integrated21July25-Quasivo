import Particles from "./Particles";
import Scene from "./Scene";

export default function Hero() {
  return (
    <section className="min-h-[60vh] sm:min-h-screen w-full flex flex-col justify-center items-center text-white text-center overflow-hidden">
      <Particles />
      <Scene />
    </section>
  );
}
