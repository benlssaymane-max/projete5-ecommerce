"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, Environment, MeshReflectorMaterial } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Link from 'next/link';

type StrikeState = {
  strikeId: number;
  seed: number;
};

function FloatingLogo({ flashRef }: { flashRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !materialRef.current) return;

    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.15;

    const glow = 0.35 + flashRef.current * 2.2;
    materialRef.current.emissiveIntensity = glow;
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <torusKnotGeometry args={[0.62, 0.2, 220, 24]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#dff9ff"
          emissive="#7c3aed"
          metalness={0.88}
          roughness={0.08}
          clearcoat={1}
          reflectivity={1}
          envMapIntensity={2.4}
        />
      </mesh>
    </group>
  );
}

function LightningBolt({ seed, flashRef }: { seed: number; flashRef: React.MutableRefObject<number> }) {
  const coreRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);

  const boltGeometry = useMemo(() => {
    const start = new THREE.Vector3(0, 3.5, 0);
    const end = new THREE.Vector3(0, 0.1, 0);
    const points: THREE.Vector3[] = [start.clone()];

    const segments = 14;
    for (let i = 1; i < segments; i += 1) {
      const t = i / segments;
      const y = THREE.MathUtils.lerp(start.y, end.y, t);
      const offset = 0.45 * (1 - t) * (Math.sin(seed * 5.1 + i * 1.3) + Math.cos(seed * 8.3 + i * 2.1));
      const zOffset = 0.35 * (1 - t) * Math.sin(seed * 6.7 + i * 1.7);
      points.push(new THREE.Vector3(offset, y, zOffset));
    }

    points.push(end.clone());
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 80, 0.03, 8, false);
  }, [seed]);

  useEffect(() => {
    return () => boltGeometry.dispose();
  }, [boltGeometry]);

  useFrame(() => {
    if (!coreRef.current || !glowRef.current) return;
    const alpha = THREE.MathUtils.clamp(flashRef.current * 1.2, 0, 1);
    coreRef.current.opacity = alpha;
    glowRef.current.opacity = alpha * 0.42;
  });

  return (
    <group>
      <mesh geometry={boltGeometry}>
        <meshBasicMaterial ref={coreRef} color="#ffffff" toneMapped={false} transparent opacity={0} />
      </mesh>
      <mesh geometry={boltGeometry} scale={[1.3, 1, 1.3]}>
        <meshBasicMaterial ref={glowRef} color="#00d4ff" transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Sparks({ strikeId }: { strikeId: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 140;

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const velocities = useMemo(() => new Float32Array(count * 3), [count]);
  const life = useMemo(() => new Float32Array(count), [count]);

  useEffect(() => {
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.7 + Math.random() * 2.5;
      const spread = Math.random() * 0.7;

      positions[i3] = (Math.random() - 0.5) * 0.05;
      positions[i3 + 1] = 0.15;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.05;

      velocities[i3] = Math.cos(angle) * speed * spread;
      velocities[i3 + 1] = 1.1 + Math.random() * 2.2;
      velocities[i3 + 2] = Math.sin(angle) * speed * spread;

      life[i] = 0.35 + Math.random() * 0.7;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute('position');
      attr.needsUpdate = true;
    }
  }, [count, life, positions, strikeId, velocities]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    let alive = false;
    for (let i = 0; i < count; i += 1) {
      if (life[i] <= 0) continue;
      alive = true;

      const i3 = i * 3;
      life[i] -= delta;
      velocities[i3 + 1] -= 3.8 * delta;

      positions[i3] += velocities[i3] * delta;
      positions[i3 + 1] += velocities[i3 + 1] * delta;
      positions[i3 + 2] += velocities[i3 + 2] * delta;
    }

    pointsRef.current.visible = alive;
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.size = 0.04;
    const attr = pointsRef.current.geometry.getAttribute('position');
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.04} transparent opacity={0.92} depthWrite={false} />
    </points>
  );
}

function StormScene() {
  const [strike, setStrike] = useState<StrikeState>({ strikeId: 0, seed: Math.random() * 100 });
  const nextStrikeRef = useRef(1.5 + Math.random() * 2.8);
  const flashRef = useRef(0);
  const skyGroupRef = useRef<THREE.Group>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  const baseCameraPos = useRef(new THREE.Vector3(0, 0.85, 5.2));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (skyGroupRef.current) {
      skyGroupRef.current.rotation.y += delta * 0.02;
      skyGroupRef.current.position.x = Math.sin(t * 0.12) * 0.12;
    }

    flashRef.current = Math.max(0, flashRef.current - delta * 2.8);
    if (t > nextStrikeRef.current) {
      nextStrikeRef.current = t + 1.8 + Math.random() * 3.6;
      flashRef.current = 1;
      setStrike((prev) => ({ strikeId: prev.strikeId + 1, seed: Math.random() * 1000 }));
    }

    if (flashLightRef.current) {
      flashLightRef.current.intensity = 0.45 + flashRef.current * 11;
    }

    const shake = flashRef.current * 0.09;
    camera.position.set(
      baseCameraPos.current.x + (Math.random() - 0.5) * shake,
      baseCameraPos.current.y + (Math.random() - 0.5) * shake,
      baseCameraPos.current.z + (Math.random() - 0.5) * shake * 0.45
    );
    camera.lookAt(0, 0.35, 0);
  });

  return (
    <>
      <color attach="background" args={['#050816']} />
      <fog attach="fog" args={['#050816', 2.8, 18]} />

      <ambientLight intensity={0.18} />
      <directionalLight position={[2.2, 3.4, 2.8]} intensity={0.6} color="#88a0ff" />
      <pointLight ref={flashLightRef} position={[0, 2.8, 0.7]} distance={12} color="#e6f9ff" intensity={0.5} />
      <pointLight position={[0, 0.2, 1.8]} distance={6} color="#00d4ff" intensity={0.6} />

      <group ref={skyGroupRef}>
        <Cloud position={[0, 2.4, -2]} speed={0.18} opacity={0.44} color="#171a2d" segments={16} bounds={[7, 2.2, 4]} volume={6} />
        <Cloud position={[-1.6, 1.9, -1]} speed={0.15} opacity={0.4} color="#1f2238" segments={14} bounds={[5, 1.6, 3.2]} volume={5} />
        <Cloud position={[2.2, 2.15, -0.6]} speed={0.22} opacity={0.36} color="#20233c" segments={14} bounds={[5.5, 1.9, 3.2]} volume={5} />
      </group>

      <LightningBolt seed={strike.seed} flashRef={flashRef} />
      <FloatingLogo flashRef={flashRef} />
      <Sparks strikeId={strike.strikeId} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <MeshReflectorMaterial
          blur={[380, 120]}
          resolution={512}
          mixBlur={1.2}
          mixStrength={2.1}
          roughness={0.8}
          metalness={0.25}
          color="#050816"
          mirror={0.2}
          depthScale={0.25}
          minDepthThreshold={0.15}
          maxDepthThreshold={1.3}
        />
      </mesh>

      <Environment preset="night" />
    </>
  );
}

export default function HeroSection() {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowScene(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const playUiTone = () => {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 460;
    gain.gain.value = 0.018;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="section-pad grid min-h-[88vh] items-center gap-10 lg:grid-cols-[1.02fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-cyanedge">Cinematic Storm Sequence</p>
          <h1 className="display-font cinematic-text text-5xl font-semibold leading-[0.94] md:text-7xl">
            Lightning Strikes. The Logo Awakens.
          </h1>
          <p className="max-w-xl text-base text-steel md:text-lg">
            Ultra-detailed storm sky simulation with dynamic clouds, electric strikes, reactive glow, sparks, and cinematic camera impact for a high-end hero experience.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/shop" data-magnetic="true" onMouseEnter={playUiTone} className="magnetic rounded-full bg-cyanedge px-6 py-3 text-sm font-semibold text-black shadow-glow">
              Enter Shop
            </Link>
            <Link href="/product/1" data-magnetic="true" onMouseEnter={playUiTone} className="magnetic glass rounded-full px-6 py-3 text-sm font-medium">
              Explore Product
            </Link>
          </div>
          <div className="grid max-w-xl grid-cols-3 gap-3 pt-2">
            <div className="glass rounded-xl p-3">
              <p className="display-font text-xl text-cyanedge">Volumetric</p>
              <p className="text-xs text-steel">Storm Clouds</p>
            </div>
            <div className="glass rounded-xl p-3">
              <p className="display-font text-xl text-cyanedge">Reactive</p>
              <p className="text-xs text-steel">Logo Lighting</p>
            </div>
            <div className="glass rounded-xl p-3">
              <p className="display-font text-xl text-cyanedge">Cinematic</p>
              <p className="text-xs text-steel">Impact Shake</p>
            </div>
          </div>
        </motion.div>

        <div className="glass h-[460px] overflow-hidden rounded-3xl md:h-[580px]">
          {showScene ? (
            <Canvas
              camera={{ position: [0, 0.85, 5.2], fov: 42 }}
              dpr={[1, 1.35]}
              gl={{ antialias: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
            >
              <StormScene />
            </Canvas>
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.2),transparent_45%),linear-gradient(180deg,#060916,#040612)]" />
          )}
        </div>
      </div>
    </section>
  );
}

