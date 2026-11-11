import * as THREE from "three";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function cordPoints(progress: number, strand = 0): THREE.Vector3[] {
  const count = 280;
  const pts: THREE.Vector3[] = [];
  const p = THREE.MathUtils.clamp(progress, 0.0001, 1);
  const shown = Math.max(2, Math.floor(count * p));
  const off = strand * 0.045;

  for (let i = 0; i < shown; i++) {
    const t = i / (count - 1);

    if (t < 0.14) {
      const u = t / 0.14;
      pts.push(new THREE.Vector3(lerp(-1.8, 1.8, u), 0.15 + off, 0));
      continue;
    }

    if (t < 0.3) {
      const u = (t - 0.14) / 0.16;
      const a = u * Math.PI * 2;
      const x = Math.sin(a) * 0.42;
      const y = Math.sin(a * 2) * 0.55 + off;
      const z = Math.cos(a) * 0.12;
      pts.push(new THREE.Vector3(x, y, z));
      continue;
    }

    const u = (t - 0.3) / 0.7;
    const theta = u * Math.PI * 16 + strand * 0.9;
    const bag = Math.min(1, u / 0.72);
    const profile =
      Math.pow(Math.sin(bag * Math.PI), 0.65) * 0.78 + 0.12 * Math.sin(theta * 3);
    let y = lerp(0.85, -1.05, bag) + 0.04 * Math.sin(theta);
    let x = Math.cos(theta) * profile;
    let z = Math.sin(theta) * profile * 0.62;

    if (u > 0.72 && u < 0.9) {
      const h = (u - 0.72) / 0.18;
      const arc = Math.sin(h * Math.PI);
      x = lerp(x, Math.sin(h * Math.PI) * 0.35, h);
      y = lerp(-0.2, 1.15, arc);
      z = lerp(z, 0.05, h);
    }

    if (u >= 0.9) {
      const f = (u - 0.9) / 0.1;
      const n = strand + i * 0.17;
      x = lerp(-0.5, 0.5, (n % 7) / 7) + Math.sin(i) * 0.02;
      y = lerp(-1.05, -1.45, f);
      z = 0.15 + (n % 3) * 0.04;
    }

    pts.push(new THREE.Vector3(x, y, z));
  }

  return pts;
}

export function tubeFromPoints(points: THREE.Vector3[], radius: number) {
  if (points.length < 2) {
    const fallback = new THREE.LineCurve3(
      new THREE.Vector3(-0.2, 0, 0),
      new THREE.Vector3(0.2, 0, 0),
    );
    return new THREE.TubeGeometry(fallback, 8, radius, 6, false);
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const segs = Math.min(360, Math.max(12, points.length * 2));
  return new THREE.TubeGeometry(curve, segs, radius, 7, false);
}
