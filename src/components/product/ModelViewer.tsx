"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";

/** Procedural cutting board geometry — demo model, no .glb needed */
function CuttingBoard({ shape = "rect" }: { shape?: "rect" | "round" }) {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <group>
                {shape === "rect" ? (
                    // Rectangular board: 400×280×18 mm → scaled to Three.js units
                    <RoundedBox args={[4, 0.18, 2.8]} radius={0.15} smoothness={4}>
                        <meshStandardMaterial
                            color="#c4956a"
                            roughness={0.6}
                            metalness={0.05}
                        />
                    </RoundedBox>
                ) : (
                    // Round board: Ø350×18 mm
                    <mesh>
                        <cylinderGeometry args={[1.75, 1.75, 0.18, 64]} />
                        <meshStandardMaterial
                            color="#b8845a"
                            roughness={0.6}
                            metalness={0.05}
                        />
                    </mesh>
                )}
                {/* Subtle wood grain line */}
                <mesh position={[0, 0.095, 0]}>
                    {shape === "rect" ? (
                        <boxGeometry args={[3.8, 0.005, 0.02]} />
                    ) : (
                        <boxGeometry args={[3.2, 0.005, 0.02]} />
                    )}
                    <meshStandardMaterial color="#a5734a" roughness={0.8} />
                </mesh>
            </group>
        </Float>
    );
}

function LoadingFallback() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                <p className="mt-3 text-sm text-zinc-500">Loading 3D Model…</p>
            </div>
        </div>
    );
}

interface ModelViewerProps {
    productId: string;
    shape?: "rect" | "round";
}

export default function ModelViewer({ productId, shape = "rect" }: ModelViewerProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const t = useTranslations("viewer3d");
    return (
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {t("title")}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                        aria-label={isPlaying ? "Pause rotation" : "Play rotation"}
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {t("interactive")}
                    </span>
                </div>
            </div>

            {/* Canvas */}
            <div className="h-[400px] w-full">
                <Suspense fallback={<LoadingFallback />}>
                    <Canvas camera={{ position: [5, 3, 5], fov: 35 }}>
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[5, 5, 5]} intensity={0.8} />
                        <CuttingBoard shape={shape} />
                        <ContactShadows
                            position={[0, -0.15, 0]}
                            opacity={0.4}
                            scale={10}
                            blur={2}
                        />
                        <Environment preset="apartment" />
                        <OrbitControls
                            autoRotate={isPlaying}
                            autoRotateSpeed={2}
                            enableZoom={true}
                            enablePan={false}
                            minDistance={3}
                            maxDistance={10}
                        />
                    </Canvas>
                </Suspense>
            </div>

            {/* Controls hint */}
            <div className="border-t border-zinc-200 px-4 py-2 dark:border-zinc-800">
                <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
                    {t("hint")}
                </p>
            </div>
        </div>
    );
}
