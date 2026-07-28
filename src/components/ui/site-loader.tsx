"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getOrFetchModelBlobUrl } from "@/lib/model-cache";

interface SiteLoaderProps {
  onComplete?: () => void;
}

export const SiteLoader = ({ onComplete }: SiteLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING CORE SYSTEMS");

  useEffect(() => {
    let isMounted = true;

    async function preloadAssets() {
      try {
        // Step 1: Pre-import 3D scene modules
        setStatusText("LOADING 3D GRAPHICS ENGINE");
        await Promise.all([
          import("@/components/three/avatar-scene"),
          import("@/components/three/hero-scene")
        ]);

        if (isMounted) setProgress(25);

        // Step 2: Preload & Cache 3D Model into IndexedDB
        setStatusText("CACHING 3D MESH & DRACO DECODER");
        await getOrFetchModelBlobUrl("/MyModel1.glb", (pct) => {
          if (isMounted) {
            setProgress(25 + Math.round(pct * 0.6));
          }
        });

        // Step 3: Preload critical textures and images
        if (isMounted) {
          setStatusText("OPTIMIZING TEXTURES & ASSETS");
          const imagesToPreload = ["/smog.png", "/my.jpg"];
          let loaded = 0;

          await Promise.all(
            imagesToPreload.map(
              (src) =>
                new Promise<void>((resolve) => {
                  const img = new Image();
                  img.src = src;
                  img.onload = img.onerror = () => {
                    loaded++;
                    if (isMounted) {
                      setProgress(85 + Math.round((loaded / imagesToPreload.length) * 15));
                    }
                    resolve();
                  };
                })
            )
          );
        }

        if (isMounted) {
          setProgress(100);
          setStatusText("SYSTEMS READY");
          setTimeout(() => {
            if (isMounted) {
              setIsFinished(true);
              onComplete?.();
            }
          }, 350);
        }
      } catch (err) {
        console.warn("Preloader exception:", err);
        if (isMounted) {
          setProgress(100);
          setIsFinished(true);
          onComplete?.();
        }
      }
    }

    preloadAssets();

    return () => {
      isMounted = false;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#040611] p-8 sm:p-14 text-slate-100 select-none overflow-hidden"
        >
          {/* Background Ambient Orbs & Grid */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,82,255,0.18),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(0,231,255,0.12),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 cosmic-starfield opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Top Bar: Brand Logo & Status Indicator */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent-300/30 bg-accent-500/10 font-mono text-sm font-bold text-mint-300 shadow-[0_0_15px_rgba(0,231,255,0.2)]">
                SS
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-wider text-white">
                  SUNIL SAINI
                </span>
                <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                  Software Engineer
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-accent-300/20 bg-slate-900/60 px-3 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-400" />
              </span>
              <span className="font-mono text-[10px] font-medium tracking-widest text-slate-300 uppercase">
                Interactive 3D Experience
              </span>
            </div>
          </div>

          {/* Center Content: Ultra-Sleek Progress Display */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-8">
            <div className="relative">
              {/* Huge Monospace Percentage Counter */}
              <div className="font-display text-7xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
                {String(progress).padStart(2, "0")}
                <span className="text-3xl sm:text-5xl font-mono text-mint-400 ml-1">%</span>
              </div>
            </div>

            <div className="space-y-3 w-full max-w-md">
              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] text-slate-300 uppercase">
                <span className="text-accent-300">[</span>
                <span className="text-slate-200">{statusText}</span>
                <span className="text-accent-300">]</span>
              </div>

              {/* Minimalist Progress Line */}
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-800/80">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-accent-400 to-mint-400 shadow-[0_0_12px_rgba(0,231,255,0.6)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar: System Footer Info */}
          <div className="relative z-10 flex items-center justify-between w-full font-mono text-[10px] text-slate-400 uppercase tracking-widest border-t border-slate-800/60 pt-4">
            <span>MODELS CACHED LOCALLY</span>
            <span className="hidden sm:inline-block">SPRING BOOT • KAFKA • WEBSOCKET • THREE.JS</span>
            <span className="text-mint-300">v1.0.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
