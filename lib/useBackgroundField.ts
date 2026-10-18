"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import * as THREE from "three";
import type { ThemeMode } from "./useThemeMode";

const FIELD = {
  dark: { base: 0x3c3830, acc: 0xf0a44a, amp: 0.6 },
  light: { base: 0xc4bba8, acc: 0xb0741f, amp: 0.46 },
};

const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uT; uniform float uP; uniform float uAmp; uniform float uCell;
uniform vec2 uRes; uniform vec2 uM; uniform vec3 uBase; uniform vec3 uAcc;
float h21(vec2 p){ return fract(sin(dot(p, vec2(27.61, 57.23))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = h21(i), b = h21(i + vec2(1.0, 0.0)), c = h21(i + vec2(0.0, 1.0)), d = h21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); }
float fbm(vec2 p){ float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * vn(p); p *= 2.05; a *= 0.5; }
  return s; }
void main(){
  float ar = uRes.x / max(uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * vec2(ar, 1.0);
  vec2 q = p * 1.15; q.y += uP * 0.7;
  float t = uT * 0.11;
  vec2 w = vec2(fbm(q * 0.9 + vec2(t, 0.0)), fbm(q * 0.9 + vec2(3.7, -t * 0.8)));
  float f = fbm(q * 1.25 + w * 1.9 - vec2(0.0, t * 1.2));
  float plume = smoothstep(0.42, 0.86, f);
  float plume2 = smoothstep(0.50, 0.95, fbm(q * 0.75 - w * 1.2 + vec2(t * 0.6, 2.3)));
  float rad = length(p * vec2(0.82, 1.0));
  float rings = pow(max(sin(rad * 13.0 - uT * 0.55), 0.0), 8.0) * smoothstep(1.15, 0.30, rad);
  float near = exp(-length(p - uM * vec2(ar, -1.0) * 0.5) / 0.40);
  float lit = plume * 0.85 + plume2 * 0.55 + rings * 0.5 + near * 0.35;
  float clear = smoothstep(0.30, 0.92, length(p * vec2(0.62, 1.0)));
  float vign = smoothstep(1.45, 0.20, rad);
  vec3 col = mix(uBase, uAcc, clamp(lit * 0.9, 0.0, 1.0));
  gl_FragColor = vec4(col, clamp(lit, 0.0, 1.2) * uAmp * vign * clear);
}
`;

type FieldUniforms = {
  uT: { value: number };
  uP: { value: number };
  uCell: { value: number };
  uRes: { value: THREE.Vector2 };
  uM: { value: THREE.Vector2 };
  uBase: { value: THREE.Color };
  uAcc: { value: THREE.Color };
  uAmp: { value: number };
};

/**
 * A grid of "inference cells" behind the page — waves of activation rolling
 * through a WebGL field, brightening as the reader scrolls and drifting
 * toward the pointer. Purely decorative; disabled visuals never block content.
 */
export function useBackgroundField(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mode: ThemeMode,
  reducedMotion: boolean,
  progressRef: RefObject<number>
) {
  const uniformsRef = useRef<FieldUniforms | null>(null);
  // Seeds the shader with whichever theme was active the instant it mounts;
  // later flips are handled by the retint effect below, so this never needs
  // to change (and mutating it on every render would violate render purity).
  const modeRef = useRef(mode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const cellSize = () => (innerWidth < 780 ? 0.085 : 0.062);
    const c0 = FIELD[modeRef.current];
    const u: FieldUniforms = {
      uT: { value: 0 },
      uP: { value: 0 },
      uCell: { value: cellSize() },
      uRes: { value: new THREE.Vector2(innerWidth, innerHeight) },
      uM: { value: new THREE.Vector2(0, 0) },
      uBase: { value: new THREE.Color(c0.base) },
      uAcc: { value: new THREE.Color(c0.acc) },
      uAmp: { value: c0.amp },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));
    uniformsRef.current = u;

    const resize = () => {
      const w = canvas.clientWidth || innerWidth;
      const h = canvas.clientHeight || innerHeight;
      renderer.setSize(w, h, false);
      u.uRes.value.set(w, h);
      u.uCell.value = cellSize();
    };
    resize();
    addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
    };
    addEventListener("pointermove", onMove);

    let alive = true;
    let raf = 0;
    const k = reducedMotion ? 0.2 : 1;
    let clock = 0;
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
      const p = progressRef.current ?? 0;
      clock += dt * k * (1 + p * 0.9);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      u.uT.value = clock;
      u.uP.value = p;
      u.uM.value.set(mouse.x, mouse.y);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [canvasRef, reducedMotion, progressRef]);

  // Retint the field in place when the theme flips — no reinit needed.
  useEffect(() => {
    const u = uniformsRef.current;
    if (!u) return;
    const c = FIELD[mode];
    u.uBase.value.setHex(c.base);
    u.uAcc.value.setHex(c.acc);
    u.uAmp.value = c.amp;
  }, [mode]);
}
