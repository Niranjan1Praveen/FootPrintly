"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture, SoftShadows } from "@react-three/drei";
import * as THREE from "three";

const FootMesh = () => {
  const { scene, materials } = useGLTF("/glb/footmodel.glb"); // Load the GLB model
  const texture = useTexture("/glb/texture.jpeg"); // Ensure the file exists in public/logo/

  // ✅ Ensure the texture is applied correctly
  if (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  }

  if (materials) {
    Object.values(materials).forEach((mat) => {
      mat.map = texture || null; // Set the texture
      mat.color = new THREE.Color("cyan"); // ✅ Set foot color to blue
      mat.transparent = true; // ✅ Enable transparency
      mat.opacity = 0.8; // ✅ Adjust transparency
      mat.needsUpdate = true;
    });
  }

  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
};

const FootModel = () => {
  return (
    <Canvas shadows camera={{ position: [0, 7, 0], fov: 50 }} style={{ height: "50vh" }}>
      <SoftShadows size={20} samples={16} focus={0.95} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 3]} intensity={1} castShadow />

      {/* Render the FootMesh inside Canvas */}
      <FootMesh />

      <OrbitControls />
    </Canvas>
  );
};

export default FootModel;
