import * as THREE from "three";

const geometry = new THREE.BoxGeometry(2, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: 0x52ff61,
	wireframe: false,
});
const cube = new THREE.Mesh(geometry, material);

export { cube };
