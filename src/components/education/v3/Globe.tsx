"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath } from "d3-geo";
import type { Topology, GeometryCollection } from "topojson-specification";
import { ORIGINS, MELBOURNE } from "./v3Data";

const R = 1;
const ARC_SEGMENTS = 90;

function toVec(lat: number, lng: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

/** Rasterise world land to an equirectangular mask so we can test thousands of points cheaply. */
async function landMask(W = 1024, H = 512) {
  const topo = (await import("world-atlas/land-110m.json")).default as unknown as Topology<{ land: GeometryCollection }>;
  const land = feature(topo, topo.objects.land);
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;
  const proj = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  geoPath(proj, ctx)(land);
  ctx.fill();
  const data = ctx.getImageData(0, 0, W, H).data;
  return (lat: number, lng: number) => {
    const x = Math.min(W - 1, Math.max(0, Math.floor(((lng + 180) / 360) * W)));
    const y = Math.min(H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * H)));
    return data[(y * W + x) * 4 + 3] > 128;
  };
}

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.55, "rgba(255,255,255,1)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export default function Globe({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    const globe = new THREE.Group();
    scene.add(globe);

    // Ocean sphere
    const baseGeo = new THREE.SphereGeometry(R * 0.992, 72, 72);
    const baseMat = new THREE.MeshBasicMaterial({ color: 0x0c2152 });
    globe.add(new THREE.Mesh(baseGeo, baseMat));

    // Atmosphere glow (fresnel on a back-facing shell)
    const atmoGeo = new THREE.SphereGeometry(R * 1.16, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      uniforms: { c: { value: new THREE.Color(0x5ba3d9) } },
      vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: "uniform vec3 c; varying vec3 vN; void main(){ float i = pow(0.68 - dot(vN, vec3(0.0, 0.0, 1.0)), 2.4); gl_FragColor = vec4(c, 1.0) * i; }",
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Land dots (added once the mask is ready)
    const tex = dotTexture();
    let dotsGeo: THREE.BufferGeometry | null = null;
    const dotsMat = new THREE.PointsMaterial({ size: 0.026, map: tex, vertexColors: true, transparent: true, alphaTest: 0.3, depthWrite: false });
    landMask().then((isLand) => {
      if (disposed) return;
      const N = 42000, golden = Math.PI * (3 - Math.sqrt(5));
      const pos: number[] = [], col: number[] = [];
      const sky = new THREE.Color(0x7fb8e6), sky2 = new THREE.Color(0xc4def5), yellow = new THREE.Color(0xf5c518);
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const lat = (Math.asin(y) * 180) / Math.PI;
        const lng = ((((golden * i * 180) / Math.PI) % 360) + 360) % 360 - 180;
        if (!isLand(lat, lng)) continue;
        const v = toVec(lat, lng, R * 1.002);
        pos.push(v.x, v.y, v.z);
        const aus = lat < -10 && lat > -44.5 && lng > 112 && lng < 154.5;
        const c = aus ? yellow : Math.random() > 0.7 ? sky2 : sky;
        col.push(c.r, c.g, c.b);
      }
      dotsGeo = new THREE.BufferGeometry();
      dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      dotsGeo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      globe.add(new THREE.Points(dotsGeo, dotsMat));
    });

    // Arcs from origins to Melbourne
    const end = toVec(MELBOURNE.lat, MELBOURNE.lng);
    const disposables: { dispose: () => void }[] = [baseGeo, baseMat, atmoGeo, atmoMat, dotsMat, tex];
    const arcs = ORIGINS.map((o, i) => {
      const start = toVec(o.lat, o.lng);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(R + start.distanceTo(end) * 0.42);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(ARC_SEGMENTS);

      const ghostGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const ghostMat = new THREE.LineBasicMaterial({ color: 0x5ba3d9, transparent: true, opacity: 0.18 });
      globe.add(new THREE.Line(ghostGeo, ghostMat));

      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const mat = new THREE.LineBasicMaterial({ color: 0xf5c518, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
      globe.add(new THREE.Line(geo, mat));

      const cometGeo = new THREE.SphereGeometry(0.014, 12, 12);
      const cometMat = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
      const comet = new THREE.Mesh(cometGeo, cometMat);
      globe.add(comet);

      const dotGeo = new THREE.SphereGeometry(0.012, 10, 10);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(start);
      globe.add(dot);

      disposables.push(ghostGeo, ghostMat, geo, mat, cometGeo, cometMat, dotGeo, dotMat);
      return { curve, geo, comet, offset: i * 0.47 };
    });

    // Melbourne marker + pulse ring
    const melGeo = new THREE.SphereGeometry(0.022, 16, 16);
    const melMat = new THREE.MeshBasicMaterial({ color: 0xf5c518 });
    const mel = new THREE.Mesh(melGeo, melMat);
    mel.position.copy(end);
    globe.add(mel);
    const ringGeo = new THREE.RingGeometry(0.03, 0.038, 40);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf5c518, transparent: true, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(end.clone().multiplyScalar(1.003));
    ring.lookAt(end.clone().multiplyScalar(2));
    globe.add(ring);
    disposables.push(melGeo, melMat, ringGeo, ringMat);

    // Orientation: face South-East Asia / Australia
    const focus = toVec(-8, 120);
    const baseY = -Math.atan2(focus.x, focus.z);
    const focusAfterY = focus.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), baseY);
    const baseX = Math.atan2(focusAfterY.y, focusAfterY.z);
    let dragY = 0, dragX = 0, curY = baseY, curX = baseX;
    globe.rotation.set(baseX, baseY, 0);

    // Drag to rotate
    let dragging = false, lastX = 0, lastY = 0;
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      dragY += (e.clientX - lastX) * 0.006;
      dragX = Math.max(-0.6, Math.min(0.6, dragX + (e.clientY - lastY) * 0.004));
      lastX = e.clientX; lastY = e.clientY;
    };
    const onUp = () => { dragging = false; };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    // Size
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight || w;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Only animate while visible
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);

    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const sway = reduce ? 0 : Math.sin(t * 0.2) * 0.1;
      curY += (baseY + sway + dragY - curY) * 0.06;
      curX += (baseX + dragX - curX) * 0.06;
      globe.rotation.set(curX, curY, 0);
      if (!dragging) dragX *= 0.985;

      // Arc travel: head runs 0 → 1, tail follows
      for (const a of arcs) {
        const p = reduce ? 1.4 : ((t * 0.32 + a.offset) % 1.6);
        const head = Math.min(p, 1), tail = Math.max(0, Math.min(p - 0.4, 1));
        const s = Math.floor(tail * ARC_SEGMENTS), e = Math.ceil(head * ARC_SEGMENTS) + 1;
        a.geo.setDrawRange(s, Math.max(0, e - s));
        a.comet.visible = p < 1;
        if (p < 1) a.comet.position.copy(a.curve.getPoint(head));
      }

      const pulse = (t * 0.8) % 1;
      ring.scale.setScalar(1 + pulse * 2.4);
      ringMat.opacity = 1 - pulse;

      // Project the Melbourne label
      if (label.current) {
        mel.getWorldPosition(tmp);
        const facing = tmp.clone().normalize().dot(camera.position.clone().normalize()) > 0.15;
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * el.clientWidth, y = (-tmp.y * 0.5 + 0.5) * el.clientHeight;
        label.current.style.transform = `translate(${x}px, ${y}px)`;
        label.current.style.opacity = facing ? "1" : "0";
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      dotsGeo?.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={className} style={{ position: "relative" }}>
      <div ref={host} style={{ position: "absolute", inset: 0, cursor: "grab", touchAction: "pan-y" }} aria-hidden="true" />
      <div ref={label} className="v3-globe-label" aria-hidden="true"><span>Melbourne</span></div>
    </div>
  );
}
