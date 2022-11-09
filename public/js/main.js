import * as THREE from "three";
//import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import scene from "./scenes/scene1.js";
import Stats from "stats.js";

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

requestAnimationFrame(animate);
const width = window.innerWidth;
const height = window.innerHeight;
const camera = scene.camera || new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
//const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#viewport"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
scene.camera = camera;

const controls = new OrbitControls(camera, renderer.domElement);

controls.maxPolarAngle = Math.PI * 0.48;
controls.enablePan = false;
camera.position.set(0, 360, 370);
//controls.update();

function animate() {
	requestAnimationFrame(animate);
	stats.begin();
	!!scene.cb && scene.cb({ camera, controls });
	controls.update();
	renderer.render(scene, camera);
	stats.end();
}
animate();

window.onresize = function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};

document.body.onclick = () => document.documentElement.requestFullscreen();
