"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useAnimations, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

import { useSiteTheme } from "@/hooks/use-site-theme";

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

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh || !mesh.material) {
        return;
      }

      const applyTune = (material: THREE.Material) => {
        const standard = material as THREE.MeshStandardMaterial;
        if (!("roughness" in standard)) {
          return;
        }

        standard.roughness = Math.max(0.35, standard.roughness * 0.95);
        standard.metalness = Math.max(0.08, standard.metalness * 0.75);
        standard.envMapIntensity = 0.86;
        standard.needsUpdate = true;
      };

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(applyTune);
        return;
      }

      applyTune(mesh.material);
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const targetX = state.pointer.x * 0.16;
    const targetYRotation = 0.42 + state.pointer.x * 0.22;

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
      groupRef.current.position.y = -1.05 + Math.sin(t * 1.3) * 0.02 + Math.cos(t * 0.5) * 0.006;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetYRotation + Math.sin(t * 0.35) * 0.04,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} scale={1.7} position={[0, -1.05, 0]} rotation={[0, 0.42, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
};

const SmokeOverlay = ({ opacity }: { opacity: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/smog.png");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.2, 1]}>
      <planeGeometry args={[5, 3.4]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

useGLTF.preload("/MyModel1.glb");

export const AvatarScene = () => {
  const theme = useSiteTheme();
  const isLightTheme = theme === "light";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      <div
        className={`absolute inset-0 ${
          isLightTheme
            ? "bg-[radial-gradient(circle_at_50%_6%,rgba(205,158,96,0.4),transparent_38%),radial-gradient(circle_at_18%_78%,rgba(40,119,93,0.22),transparent_45%),linear-gradient(160deg,#f7f1e7_0%,#efe5d4_45%,#e6d6c3_100%)]"
            : "bg-[radial-gradient(circle_at_50%_6%,rgba(124,82,255,0.46),transparent_38%),radial-gradient(circle_at_18%_78%,rgba(0,231,255,0.2),transparent_45%),linear-gradient(160deg,#07102a_0%,#0c1840_45%,#14285a_100%)]"
        }`}
      />
      <div className="cosmic-starfield absolute inset-0 opacity-35" />
      <div
        className={`absolute inset-0 ${
          isLightTheme ? "bg-gradient-to-t from-[#e7d4ba]/28 via-transparent to-transparent" : "bg-gradient-to-t from-black/18 via-transparent to-transparent"
        }`}
      />

      <Canvas
        camera={{ position: [0, 0.50, 2.18], fov: 28 }}
        dpr={[1, 1.4]}
        performance={{ min: 0.7 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = isLightTheme ? 1.12 : 1.2;
        }}
      >
        <ambientLight intensity={isLightTheme ? 0.9 : 0.82} />
        <hemisphereLight
          intensity={0.82}
          color={isLightTheme ? "#fff7e8" : "#d9e8ff"}
          groundColor={isLightTheme ? "#5a4c36" : "#2f255f"}
        />
        <directionalLight position={[2, 3, 3]} intensity={1.08} color={isLightTheme ? "#ffe2b7" : "#e0dcff"} />
        <directionalLight position={[-2, 2, 2]} intensity={0.72} color={isLightTheme ? "#9fceb9" : "#9eeeff"} />
        <pointLight position={[0, 1.6, 2]} intensity={6.8} color={isLightTheme ? "#d7a56c" : "#7af2ff"} />
        <pointLight position={[0, 0.7, -1.6]} intensity={4.6} color={isLightTheme ? "#2f7f62" : "#8f6dff"} />
        <pointLight position={[0, 1.0, 2.4]} intensity={4.2} color={isLightTheme ? "#b56a80" : "#c3dbff"} />

        <Suspense fallback={null}>
          <AvatarModel />
          <SmokeOverlay opacity={isLightTheme ? 0.07 : 0.11} />
        </Suspense>

        <ContactShadows position={[0, -1.08, 0]} opacity={0.34} width={2.2} height={2.2} blur={1.35} far={2} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};
