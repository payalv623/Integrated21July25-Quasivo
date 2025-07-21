import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { a, useSpring, config } from "@react-spring/three";
import { useNavigate } from "react-router-dom"; // 

export default function Tile3D({
  position = [0, 0, 0],
  frontImage,
  backImage,
  backImagePosition = 0.1,
    redirectTo,
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate(); // <-- Initialize navigation


  // Smooth flip animation based on hover state
  const { rotation } = useSpring({
    rotation: hovered ? [0, Math.PI, 0] : [0, 0, 0],
    config: config.default,
  });

  // Subtle float animation
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <a.group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
       onClick={() => {
        if (redirectTo) {
          navigate(redirectTo);
        }
      }}
    >
      {/* Front Side */}
      <Image url={frontImage} position={[0, 0, 0.051]} scale={[1.6, 1.6, 1]} />

      {/* Back Side (rotated to face the back) */}
      <Image
        url={backImage}
        position={[0, 0, -0.051]}
        rotation={[0, Math.PI, 0]} // flipped to be readable from back
        scale={[1.6, 2, 1]}
      />
    </a.group>
  );
}
