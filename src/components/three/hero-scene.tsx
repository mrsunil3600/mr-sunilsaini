"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

type TechNode = {
  label: string;
  position: [number, number, number];
  color: string;
};

const techNodes: TechNode[] = [
  { label: "TS", position: [2.4, 1.2, 0], color: "#53e2c8" },
  { label: "SpringBoot", position: [-2.2, 0.8, -0.2], color: "#84e4ef" },
  { label: "Cloud", position: [1.9, -1.4, 0.6], color: "#4fd6e6" },
  { label: "AI", position: [-1.8, -1.2, 0.5], color: "#7dd3fc" },
  { label: "MicroServices", position: [0, 2.2, -0.6], color: "#2ed7b7" }
];

const HeroMesh = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.x = 0.3 + t * 0.2;
      coreRef.current.rotation.y = t * 0.35;
    }

    if (shellRef.current) {
      shellRef.current.rotation.x = -0.6 + t * 0.12;
      shellRef.current.rotation.y = -t * 0.18;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[1.1, 0.34, 220, 28]} />
        <meshPhysicalMaterial
          color="#4fd6e6"
          emissive="#26c6da"
          emissiveIntensity={0.45}
          roughness={0.22}
          metalness={0.82}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh ref={shellRef} scale={1.45} rotation={[0.2, 0.4, 0]}>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshStandardMaterial color="#2ed7b7" wireframe transparent opacity={0.24} />
      </mesh>
    </group>
  );
};

const FloatingNodes = () => {
  const nodeData = useMemo(() => techNodes, []);

  return (
    <group>
      {nodeData.map((node) => (
        <Float key={node.label} speed={1.4} rotationIntensity={0.75} floatIntensity={1.1}>
          <group position={node.position}>
            <mesh>
              <dodecahedronGeometry args={[0.18, 0]} />
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.45} />
            </mesh>
            <Html distanceFactor={8} center>
              <span className="rounded-full border border-white/20 bg-ink-900/85 px-2 py-1 text-[10px] font-semibold tracking-wide text-slate-200">
                {node.label}
              </span>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
};

export const HeroScene = () => {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.6], fov: 48 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 4]} intensity={35} color="#26c6da" />
        <pointLight position={[-3, -2, 1]} intensity={26} color="#2ed7b7" />
        <spotLight position={[0, 6, 0]} intensity={26} angle={0.26} penumbra={0.9} color="#dbeafe" />

        <Sparkles count={90} speed={0.5} size={1.5} scale={[7, 5, 4]} color="#b7ecff" />

        <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.65}>
          <HeroMesh />
        </Float>
        <FloatingNodes />

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  );
};