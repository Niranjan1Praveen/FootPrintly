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
        zIndex: "-50",
        position: "absolute",
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Physics gravity={[0, 0, 0]}>
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
  const [isDragging, setDragging] = useState(false);

  // 🛠️ Set initial position only once (Prevents resetting)
  useEffect(() => {
    if (ref.current) {
      ref.current.setTranslation(
        { x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] },
        true
      );
    }
  }, []);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerUp = () => {
    setDragging(false);
    if (ref.current) {
      ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true); // Stop sudden movement
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging && ref.current) {
      ref.current.setTranslation(
        { x: e.point.x, y: Math.max(1, e.point.y), z: e.point.z },
        true
      );
      ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      restitution={1}
      gravityScale={3}
      type="dynamic"
    >
      <BallCollider args={[1.5]} />
      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#1CB0F6" />
      </mesh>
    </RigidBody>
  );
}
