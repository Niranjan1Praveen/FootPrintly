"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Text, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function ButtonModel({ position, textPosition, day, color }) {
  const { scene } = useGLTF("/glb/button2.glb");
  const router = useRouter();
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    router.push("/quizes");
  };

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.set(color);
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
        fontSize={0.8}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {day}
      </Text>
    </>
  );
}

function RoadModel() {
  const { scene } = useGLTF("/glb/road.glb");
  return <primitive object={scene} position={[0, -5, 0]} scale={[15, 15, 15]} />;
}

export default function ButtonScene() {
  const today = new Date();

  const buttonData = [
    {
      position: [-17, 2, 0],
      textPosition: [-16, 5, 0],
      day: today.toLocaleDateString(),
      color: "#FF9999",
    }, // Light Red
    {
      position: [-12, -2, 0],
      textPosition: [-12, -6, 0],
      day: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
      color: "#99CCFF",
    }, // Light Blue
    {
      position: [-7, 2, 0],
      textPosition: [-7, 5, 0],
      day: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
      color: "#99FF99",
    }, // Light Green
    {
      position: [-2, -2, 0],
      textPosition: [-2, -6, 0],
      day: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
      color: "#FFFF99",
    }, // Light Yellow
    {
      position: [3, 2, 0],
      textPosition: [3, 5, 0],
      day: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
      color: "#FFB6C1",
    }, // Light Pink
    {
      position: [8, -2, 0],
      textPosition: [8, -6, 0],
      day: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
      color: "#D8BFD8",
    }, // Light Purple
    {
      position: [13, 2, 0],
      textPosition: [13, 5, 0],
      day: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
      color: "#FFD699",
    }, // Light Orange
  ];
  const determineFOV = () => {
    return window.innerWidth > 768 ? 45 : 90; 
  };
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 25, 30], fov: determineFOV() }} className="absolute inset-0">
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RoadModel />
          {buttonData.map(({ position, textPosition, day, color }, index) => (
            <ButtonModel key={index} position={position} textPosition={textPosition} day={day} color={color} />
          ))}
        </Suspense>
        <OrbitControls enableRotate={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// useFrame(() => {
  //   if (modelRef.current) {
  //     modelRef.current.rotation.y += 0.005;
  //   }
  // });