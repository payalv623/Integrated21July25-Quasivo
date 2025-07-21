// src/components/landingPage/GlowingOrb.jsx

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";

export default function GlowingOrb() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2) * 0.2; // scale between 0.8 and 1.2
    ref.current.scale.set(pulse, pulse, pulse);
  });
  return (
    <mesh ref={ref} position={[-0.27, -1.1, 0]}>
      <sphereGeometry args={[0.3, 10, 16]} />
      <MeshWobbleMaterial
        color="#00c0d1"
        emissive="#00ccff"
        emissiveIntensity={2}
        speed={1}
        factor={0.6}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}
