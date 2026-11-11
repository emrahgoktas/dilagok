"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { cordPoints, tubeFromPoints } from "./cordPath";

function Strand({
  progress,
  strand,
  radius,
  color,
}: {
  progress: number;
  strand: number;
  radius: number;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const bucket = Math.round(progress * 90);
  const geo = useMemo(() => {
    const pts = cordPoints(Math.max(0.02, bucket / 90), strand);
    return tubeFromPoints(pts, radius);
  }, [bucket, strand, radius]);

  return (
    <mesh ref={mesh} geometry={geo}>
      <meshStandardMaterial
        color={color}
        roughness={0.42}
        metalness={0.08}
        emissive={color}
        emissiveIntensity={0.04}
      />
    </mesh>
  );
}

function Rig({
  progress,
  mouse,
}: {
  progress: number;
  mouse: { x: number; y: number };
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    const targetY = mouse.x * 0.55;
    const targetX = -mouse.y * 0.25;
    g.current.rotation.y += (targetY - g.current.rotation.y) * Math.min(1, dt * 3);
    g.current.rotation.x += (targetX - g.current.rotation.x) * Math.min(1, dt * 3);
    const settle = progress > 0.82 ? (progress - 0.82) / 0.18 : 0;
    g.current.position.y += ( -settle * 0.22 - g.current.position.y) * Math.min(1, dt * 2);
  });

  return (
    <group ref={g}>
      <Strand progress={progress} strand={0} radius={0.032} color="#F4EFE6" />
      <Strand progress={progress} strand={1} radius={0.022} color="#D9C7A8" />
      <Strand progress={progress} strand={2} radius={0.018} color="#C4A574" />
    </group>
  );
}

export default function CordCanvas({
  progress,
  mouse,
}: {
  progress: number;
  mouse: { x: number; y: number };
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.4], fov: 35 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <spotLight position={[2.4, 3.2, 2]} intensity={2.2} angle={0.45} color="#F4EFE6" />
      <pointLight position={[-2, 1, 2]} intensity={0.6} color="#C4A574" />
      <Rig progress={progress} mouse={mouse} />
    </Canvas>
  );
}
