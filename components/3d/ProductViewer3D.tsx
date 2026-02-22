"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ShoeProxyModel() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.006;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.8, 0.26, 220, 24]} />
      <meshPhysicalMaterial color="#b0f8ff" roughness={0.12} metalness={0.72} clearcoat={1} reflectivity={1} />
    </mesh>
  );
}

export default function ProductViewer3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 48 }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[2, 3, 1]} intensity={2.4} color="#8cf7ff" />
      <ShoeProxyModel />
      <Environment preset="city" />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
