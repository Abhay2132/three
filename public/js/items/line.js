import * as THREE from "three";

const material = new THREE.LineBasicMaterial({ color: 0xffffff });

const p1 = new THREE.Vector3(-10, 0, 0);
const p2 = new THREE.Vector3(0, 10, 0);
const p3 = new THREE.Vector3(10, 0, 0);

const points = [p1, p2, p3];

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);

export { line };
