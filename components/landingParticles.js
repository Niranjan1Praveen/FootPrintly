"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { useRef, useEffect, useState } from "react";

export default function LandingParticles() {
  return (
    <Canvas
      className="h-screen"
      camera={{ position: [0, 10, 10] }}
      style={{
        zIndex: "-500",
        position: "absolute",
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Physics gravity={[0, 0.4, 0]}>
        {[...Array(40)].map((_, i) => {
          const randomX = Math.random() * 4 - 2;
          const randomY = Math.random() * 2 + 2;
          const randomZ = Math.random() * 4 - 2;

          return (
            <DraggableSphere
              key={i}
              initialPosition={[randomX, randomY, randomZ]}
            />
          );
        })}
      </Physics>
    </Canvas>
  );
}

function DraggableSphere({ initialPosition }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.setTranslation(
        { x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] },
        true
      );
    }
  }, []);

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      restitution={0.3}
      gravityScale={3}
      type="dynamic"
    >
      <BallCollider args={[1.5]} />
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#1CB0F6" />
      </mesh>
    </RigidBody>
  );
}
