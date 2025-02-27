"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Text, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function ButtonModel({ position, textPosition, day, color }) {
  const { scene } = useGLTF("/glb/button.glb");
  const router = useRouter();
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Rotate the model on the Y-axis
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  const handleClick = () => {
    router.push("/quiz");
  };

  // Apply unique color to each button
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone(); // Clone to avoid modifying globally
      child.material.color.set(color); // Set the unique color
    }
  });

  return (
    <>
      <group
        ref={modelRef}
        position={position}
        scale={hovered ? 1.6 : 1.5}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={scene.clone()} />
      </group>
      <Text
        position={textPosition}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Day {day}
      </Text>
    </>
  );
}

export default function ButtonScene() {
  const buttonData = [
    { position: [-3, 3, 0], textPosition: [2, 3, 0], day: 1, color: "red" },
    { position: [3, -1, 0], textPosition: [-2, -1, 0], day: 2, color: "blue" },
    { position: [-3, -5, 0], textPosition: [2, -5, 0], day: 3, color: "green" },
    { position: [3, -9, 0], textPosition: [-2, -9, 0], day: 4, color: "yellow" },
    {
      position: [-3, -13, 0],
      textPosition: [2, -13, 0],
      day: 5,
      color: "pink",
    },
    {
      position: [3, -17, 0],
      textPosition: [-2, -17, 0],
      day: 6,
      color: "purple",
    },
    {
      position: [-3, -21, 0],
      textPosition: [2, -21, 0],
      day: 7,
      color: "orange",
    },
  ];

  return (
    <div className="h-[100vh]">
      <Canvas camera={{ position: [0, 10, 11], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          {buttonData.map(({ position, textPosition, day, color }, index) => (
            <ButtonModel
              key={index}
              position={position}
              textPosition={textPosition}
              day={day}
              color={color}
            />
          ))}
        </Suspense>
        <OrbitControls/>
      </Canvas>
    </div>
  );
}
