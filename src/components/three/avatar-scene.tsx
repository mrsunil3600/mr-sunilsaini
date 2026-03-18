"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  OrbitControls,
  useGLTF,
  useAnimations,
  Center
} from "@react-three/drei";
import * as THREE from "three";

const AvatarModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF("/MyModel1.glb");
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }
  }, [actions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.01 - 0.9;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={1.6}
      position={[0, -1.4, 0]}
      rotation={[0, 0.6, 0]}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
};

/* 🌫️ SMOG OVERLAY COMPONENT */
const SmokeOverlay = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  /* 🖼️ CHANGE YOUR SMOG PNG HERE */
  const texture = useLoader(THREE.TextureLoader, "/smog.png");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.2, 1]}>
      <planeGeometry args={[6, 4]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </mesh>
  );
};

export const AvatarScene = () => {
  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Car2.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <Canvas
        camera={{ position: [0, 0.6, 2.6], fov: 30 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      >

        <ambientLight intensity={0.5} />

        <directionalLight position={[2, 3, 3]} intensity={0.8} />
        <directionalLight position={[-2, 2, 2]} intensity={0.5} />

        <pointLight position={[0, 2, 2]} intensity={8} />

        <Float speed={0.5} rotationIntensity={0.15} floatIntensity={0.4}>
          <AvatarModel />
        </Float>

        {/* 🌫️ SMOG IN FRONT OF CHARACTER */}
        <SmokeOverlay />

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.70}
          width={3}
          height={3}
          blur={2.5}
          far={2}
        />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

      </Canvas>
    </div>
  );
};