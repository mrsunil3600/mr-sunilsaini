"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import {
  SiTypescript,
  SiSpringboot,
  SiDocker,
  SiApachekafka,
  SiRedis,
  SiMysql,
  SiPostman
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";

import { SiteTheme, useSiteTheme } from "@/hooks/use-site-theme";

type TechNode = {
  label: string;
  position: [number, number, number];
  icon: ReactNode;
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
  iconGlow: string;
  awsColor: string;
  kafkaColor: string;
  mysqlColor: string;
};

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
    nodeColors: ["#7AF2FF", "#A284FF", "#8DC2FF", "#6D92FF", "#CEC1FF", "#FFD36D"],
    iconGlow: "drop-shadow(0 0 10px rgba(255,255,255,0.22)) drop-shadow(0 0 18px rgba(0,231,255,0.18))",
    awsColor: "#FFB347",
    kafkaColor: "#F5F7FF",
    mysqlColor: "#7FD3FF"
  },
  light: {
    core: "#E8EDF7",
    coreGradient: ["#F3F7FF", "#DCEBFF", "#CDE3FF"],
    coreEmissive: "#A8C7FF",
    shell: "#AFC8F8",
    sparkles: "#FFFFFF",
    pointA: "#B8A7FF",
    pointB: "#9EE7FF",
    pointSpot: "#FFFFFF",
    nodeColors: ["#9DD6FF", "#C7B8FF", "#A7E5FF", "#FFD0E1", "#BCE7C6", "#FFD8A8"],
    iconGlow: "drop-shadow(0 0 6px rgba(255,255,255,0.55)) drop-shadow(0 0 12px rgba(148,163,184,0.22))",
    awsColor: "#FF9900",
    kafkaColor: "#111111",
    mysqlColor: "#3D6F8F"
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
    if (!context) return null;

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
    return () => gradientTexture?.dispose();
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
const buildTechNodes = (palette: HeroPalette): TechNode[] => [
  {
    label: "Kafka",
    position: [0.15, 1.95, 0.95],
    icon: <SiApachekafka size={28} color={palette.kafkaColor} />
  },
  {
    label: "Java",
    position: [-1.55, 1.15, 1.1],
    icon: <FaJava size={28} color="#EA2D2E" />
  },
  {
    label: "TypeScript",
    position: [1.45, 1.1, 1.05],
    icon: <SiTypescript size={27} color="#3178C6" />
  },
  {
    label: "Spring Boot",
    position: [-1.95, 0.15, 0.45],
    icon: <SiSpringboot size={29} color="#6DB33F" />
  },
  {
    label: "MySQL",
    position: [1.75, 0.2, 0.25],
    icon: <SiMysql size={30} color={palette.mysqlColor} />
  },
  {
    label: "Redis",
    position: [-1.45, -1.05, 0.85],
    icon: <SiRedis size={27} color="#DC382D" />
  },
  {
    label: "Postman",
    position: [-.6, -1.5, 1],
    icon: <SiPostman size={29} color="#FF6C37" />
  },
  {
    label: "Docker",
    position: [0.95, -1.55, 0.95],
    icon: <SiDocker size={30} color="#2496ED" />
  },
  {
    label: "EC2",
    position: [1.75, -0.95, 0.75],
    icon: (
      <div className="flex items-center gap-1">
        <FaAws size={20} color={palette.awsColor} />
        <span
          className="text-[10px] font-bold tracking-wide"
          style={{ color: palette.awsColor }}
        >
          EC2
        </span>
      </div>
    )
  },
  {
    label: "S3",
    position: [1.0, 1.75, -0.2],
    icon: (
      <div className="flex items-center gap-1">
        <FaAws size={20} color={palette.awsColor} />
        <span
          className="text-[10px] font-bold tracking-wide"
          style={{ color: palette.awsColor }}
        >
          S3
        </span>
      </div>
    )
  }
];

const FloatingNodes = ({ palette }: { palette: HeroPalette }) => {
  const techNodes = buildTechNodes(palette);

  return (
    <group>
      {techNodes.map((node, index) => (
        <Float
           key={node.label}
  speed={1 + (index % 3) * 0.18}
  rotationIntensity={0.5}
  floatIntensity={0.75}
        >
          <group position={node.position}>
            <mesh>
              <dodecahedronGeometry args={[0.14, 0]} />
              <meshStandardMaterial
                color={palette.nodeColors[index % palette.nodeColors.length]}
                emissive={palette.nodeColors[index % palette.nodeColors.length]}
                emissiveIntensity={0.22}
                transparent
                opacity={0.08}
              />
            </mesh>

            <Html distanceFactor={7} center>
              <div
                title={node.label}
                className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{
                  minWidth: 28,
                  minHeight: 28,
                  background: "transparent",
                  filter: palette.iconGlow
                }}
              >
                {node.icon}
              </div>
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
        camera={{ position: [0, 0, 5.9], fov: 48 }}
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