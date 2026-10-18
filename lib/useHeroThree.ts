"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import * as THREE from "three";
import type { ThemeMode } from "./useThemeMode";

const HERO_COLOR = { dark: 0xf0a44a, light: 0x8f5714 };

/**
 * A small rotating wireframe icosahedron docked in the terminal card header.
 * Purely decorative, fixed 34x34 footprint — never touches or displaces content.
 */
export function useHeroObject(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mode: ThemeMode,
  reducedMotion: boolean
) {
  const matRef = useRef<THREE.MeshBasicMaterial | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(34, 34, false);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 10);
    camera.position.set(0, 0, 4.2);

    const geometry = new THREE.IcosahedronGeometry(1.15, 0);
    const material = new THREE.MeshBasicMaterial({
      color: HERO_COLOR[mode],
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    matRef.current = material;

    let alive = true;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden) {
        last = t;
        return;
      }
      const dt = Math.min((t - last) * 0.001, 0.05);
      last = t;
      mesh.rotation.y += dt * 0.6;
      mesh.rotation.x += dt * 0.28;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, reducedMotion]);

  useEffect(() => {
    matRef.current?.color.setHex(HERO_COLOR[mode]);
  }, [mode]);
}

/**
 * An "AI core" motif: nested wireframe solids drifting behind the hero copy,
 * confined to the hero section, low opacity, non-interactive, and parallaxing
 * gently with scroll. Never displaces text.
 */
export function useHeroScene(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mode: ThemeMode,
  reducedMotion: boolean
) {
  const matsRef = useRef<THREE.MeshBasicMaterial[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section") ?? null;
    if (!canvas || !section || reducedMotion) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    const group = new THREE.Group();
    const color = HERO_COLOR[mode];
    const specs = [
      { geo: new THREE.IcosahedronGeometry(2.6, 0), op: 0.22, speed: [0.06, 0.09, 0] as const },
      { geo: new THREE.OctahedronGeometry(1.5, 0), op: 0.16, speed: [-0.1, 0.05, 0.03] as const },
      { geo: new THREE.TorusGeometry(3.6, 0.02, 8, 64), op: 0.14, speed: [0.03, -0.07, 0] as const },
    ];
    const shapes = specs.map((s) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: s.op,
      });
      const mesh = new THREE.Mesh(s.geo, material);
      group.add(mesh);
      return { mesh, material, speed: s.speed };
    });
    group.position.set(2.6, 0.4, -2);
    scene.add(group);
    matsRef.current = shapes.map((s) => s.material);

    const resize = () => {
      const w = section.clientWidth || innerWidth;
      const h = section.clientHeight || innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.position.x = w > 900 ? 2.6 : 0;
    };
    resize();
    addEventListener("resize", resize);

    let alive = true;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden) {
        last = t;
        return;
      }
      const dt = Math.min((t - last) * 0.001, 0.05);
      last = t;
      shapes.forEach((s) => {
        s.mesh.rotation.x += dt * s.speed[0];
        s.mesh.rotation.y += dt * s.speed[1];
        s.mesh.rotation.z += dt * s.speed[2];
      });
      const rect = section.getBoundingClientRect();
      const seen = Math.min(1, Math.max(0, 1 - rect.top / innerHeight));
      group.position.y = 0.4 - seen * 1.6;
      group.rotation.y = seen * 0.4;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      shapes.forEach((s) => {
        s.mesh.geometry.dispose();
        s.material.dispose();
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, reducedMotion]);

  useEffect(() => {
    const color = HERO_COLOR[mode];
    matsRef.current.forEach((m) => m.color.setHex(color));
  }, [mode]);
}
