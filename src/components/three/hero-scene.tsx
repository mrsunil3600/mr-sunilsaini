"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

import { SiteTheme, useSiteTheme } from "@/hooks/use-site-theme";

type TechNode = {
  label: string;
  position: [number, number, number];
};

type HeroPalette = {
  core: string;
  coreGradient: [string, string, string];
  coreEmissive: string;
  shell: string;
  sparkles: string;
  pointA: string;
  pointB: string;
  pointSpot: string;
  nodeColors: string[];
  chipBorder: string;
  chipBackground: string;
  chipText: string;
  chipShadow: string;
};

const techNodes: TechNode[] = [
  { label: "TS", position: [2.4, 1.2, 0] },
  { label: "SpringBoot", position: [-2.2, 0.8, -0.2] },
  { label: "Cloud", position: [1.9, -1.4, 0.6] },
  { label: "AI", position: [-1.8, -1.2, 0.5] },
  { label: "MicroServices", position: [0, 2.2, -0.6] }
];

// TODO(USER): Change these light theme colors as you like.
// Use HEX values only (example: #F6EBDD).
const USER_LIGHT_HERO_COLORS = {
  core: "#FFFFFF",
  coreGradientTop: "#FFFFFF",
  coreGradientMid: "#FFFFFF",
  coreGradientBottom: "#FFFFFF",
  coreEmissive: "#FFFFFF",
  shell: "#FFFFFF",
  sparkles: "#FFFFFF",
  pointA: "#FFFFFF",
  pointB: "#FFFFFF",
  pointSpot: "#FFFFFF",
  node1: "#FFFFFF",
  node2: "#FFFFFF",
  node3: "#FFFFFF",
  node4: "#FFFFFF",
  node5: "#FFFFFF",
  chipBorder: "rgba(255, 255, 255, 0.72)",
  chipBackground: "linear-gradient(120deg,rgba(255,255,255,0.55),rgba(255,255,255,0.42))",
  chipText: "#2F2F2F",
  chipShadow: "rgba(255,255,255,0.4)"
} as const;

const palettes: Record<SiteTheme, HeroPalette> = {
  cyber: {
    core: "#7A63FF",
    coreGradient: ["#8D73FF", "#4C79FF", "#48D9FF"],
    coreEmissive: "#3A8BFF",
    shell: "#0B6DFF",
    sparkles: "#C8DCFF",
    pointA: "#7C52FF",
    pointB: "#00E7FF",
    pointSpot: "#DBE6FF",
    nodeColors: ["#7AF2FF", "#A284FF", "#8DC2FF", "#6D92FF", "#CEC1FF"],
    chipBorder: "rgba(141, 194, 255, 0.35)",
    chipBackground: "linear-gradient(120deg,rgba(124,82,255,0.45),rgba(11,109,255,0.28))",
    chipText: "#f4f7ff",
    chipShadow: "rgba(11,109,255,0.28)"
  },
  light: {
    core: USER_LIGHT_HERO_COLORS.core,
    coreGradient: [
      USER_LIGHT_HERO_COLORS.coreGradientTop,
      USER_LIGHT_HERO_COLORS.coreGradientMid,
      USER_LIGHT_HERO_COLORS.coreGradientBottom
    ],
    coreEmissive: USER_LIGHT_HERO_COLORS.coreEmissive,
    shell: USER_LIGHT_HERO_COLORS.shell,
    sparkles: USER_LIGHT_HERO_COLORS.sparkles,
    pointA: USER_LIGHT_HERO_COLORS.pointA,
    pointB: USER_LIGHT_HERO_COLORS.pointB,
    pointSpot: USER_LIGHT_HERO_COLORS.pointSpot,
    nodeColors: [
      USER_LIGHT_HERO_COLORS.node1,
      USER_LIGHT_HERO_COLORS.node2,
      USER_LIGHT_HERO_COLORS.node3,
      USER_LIGHT_HERO_COLORS.node4,
      USER_LIGHT_HERO_COLORS.node5
    ],
    chipBorder: USER_LIGHT_HERO_COLORS.chipBorder,
    chipBackground: USER_LIGHT_HERO_COLORS.chipBackground,
    chipText: USER_LIGHT_HERO_COLORS.chipText,
    chipShadow: USER_LIGHT_HERO_COLORS.chipShadow
  }
};

const HeroMesh = ({ palette }: { palette: HeroPalette }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 512;

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, palette.coreGradient[0]);
    gradient.addColorStop(0.52, palette.coreGradient[1]);
    gradient.addColorStop(1, palette.coreGradient[2]);

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;

    return texture;
  }, [palette.coreGradient]);

  useEffect(() => {
    return () => {
      gradientTexture?.dispose();
    };
  }, [gradientTexture]);

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
        <torusKnotGeometry args={[1.08, 0.31, 132, 24]} />
        <meshPhysicalMaterial
          color={palette.core}
          map={gradientTexture ?? undefined}
          emissive={palette.coreEmissive}
          emissiveIntensity={0.32}
          roughness={0.24}
          metalness={0.86}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      <mesh ref={shellRef} scale={1.45} rotation={[0.2, 0.4, 0]}>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshStandardMaterial color={palette.shell} wireframe transparent opacity={0.24} />
      </mesh>
    </group>
  );
};

const FloatingNodes = ({ palette }: { palette: HeroPalette }) => {
  return (
    <group>
      {techNodes.map((node, index) => (
        <Float key={node.label} speed={1.4} rotationIntensity={0.75} floatIntensity={1.1}>
          <group position={node.position}>
            <mesh>
              <dodecahedronGeometry args={[0.18, 0]} />
              <meshStandardMaterial
                color={palette.nodeColors[index % palette.nodeColors.length]}
                emissive={palette.nodeColors[index % palette.nodeColors.length]}
                emissiveIntensity={0.45}
              />
            </mesh>
            <Html distanceFactor={8} center>
              <span
                className="rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide"
                style={{
                  border: `1px solid ${palette.chipBorder}`,
                  background: palette.chipBackground,
                  color: palette.chipText,
                  boxShadow: `0 0 12px ${palette.chipShadow}`
                }}
              >
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
  const theme = useSiteTheme();
  const palette = palettes[theme];

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 48 }}
        dpr={[1, 1.45]}
        performance={{ min: 0.7 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.82} />
        <pointLight position={[3, 3, 4]} intensity={28} color={palette.pointA} />
        <pointLight position={[-3, -2, 1]} intensity={24} color={palette.pointB} />
        <spotLight position={[0, 6, 0]} intensity={20} angle={0.26} penumbra={0.9} color={palette.pointSpot} />

        <Sparkles count={48} speed={0.35} size={1.2} scale={[7, 5, 4]} color={palette.sparkles} />

        <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.65}>
          <HeroMesh palette={palette} />
        </Float>
        <FloatingNodes palette={palette} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.42} />
      </Canvas>
    </div>
  );
};
