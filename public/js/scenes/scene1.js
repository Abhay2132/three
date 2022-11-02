import * as THREE from "three";
import ajs from "../items/joystick.js";
import { $ , log } from "../hlpr.js";
import Car from "../items/car.js";
import plane from "../items/plane.js";

const scene = new THREE.Scene();
const ninety = Math.PI * 0.5;
const maxJSdistance = 1/50;
const maxAcceleration = 0.02;
const defaultMaxSpeed = 3.5;
let maxSpeed = defaultMaxSpeed;
const msi = 1 / maxSpeed;
let angle = 0;
let speed = 0;
let moving = 0;
let dir = "";
let acceleration = 0;
let defaultFriction = 0.01;
let friction = defaultFriction;
var car = false;
var jm = false;
const dt = ((Math.PI / 180)* 2);
const boost = 0.02;
let speedDir = 1;

// Load Plane
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// add axes  + grid
var axes = new THREE.AxesHelper(50);
const gridHelper = new THREE.GridHelper(1000, 60);
scene.add(axes);
scene.add(gridHelper);

// SetUp Lighting + bg
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(-5, 1, 10);
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-5, 1, -10);
scene.add(light2);
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(5, 1, 0);
scene.add(light3);
scene.background = new THREE.Color(0xffffff);

// Load Car + Joystick
Car.then((c) => {
	const axesHelper = new THREE.AxesHelper( 500 );
	c.add( axesHelper );
	c.position.y = 2.4;
	const s = 0.06;
	c.scale.set(s, s, s);
	scene.add(c);
	car = c;

	jm = ajs({ zone: $("#jsc"), color: "#333" });
	addJSevents(jm[0]);
});

scene.cb = ({ controls, camera }) => {
	if (!car) return;
	updateSpeed();
	switch( dir ) {
		case "right" : 
			maxSpeed = 2.0;
			car.rotation.y -= dt * Math.abs(speed) * msi;
			break;
		case "left" : 
			maxSpeed = 2.0;
			car.rotation.y += dt * Math.abs(speed) * msi;
			break;
		default : maxSpeed = defaultMaxSpeed;
	};
	let a = car.rotation.y// - ninety;
	let x = parseFloat((speed * Math.cos(a)).toFixed(3));
	let z = -1 * parseFloat((speed * Math.sin(a)).toFixed(3));
	log("y : " + (car.rotation.y * 180 / Math.PI).toFixed(1) + "&deg;",
			"x : " + x,
			"z : " + z,
			"speed : " + speed.toFixed(2));
		
	if(speed == 0) return;
	car.position.x += x;
	car.position.z += z;
    
	camera.position.sub(controls.target);
	controls.target.copy(car.position);
	camera.position.add(car.position);
};

// Joystick Event Listeners
function onmove(evt, data) {
	moving = 1;
	angle = data.angle.radian;
	//speed = parseFloat((boost * data.distance).toFixed(3));
	switch ( dir ) {
		case "down" : acceleration = -1 * maxAcceleration * data.distance * maxJSdistance;
			break;
		default : acceleration = maxAcceleration * data.distance * maxJSdistance;
	}
}

function onend(evt) {
	console.log(dir);
	maxSpeed = defaultMaxSpeed;
	moving = 0;
	dir = "up";
	acceleration = 0;
	friction = defaultFriction;
}

function addJSevents ( js ) {
	js.on("move", onmove);
	js.on("end", onend);
	js.on("dir:right", () => { dir = "right"; });
	js.on("dir:left", () => { dir = "left"; });
	js.on("dir:up", () => { dir = "up"; });
	js.on("dir:down", () => { dir = "down"; });
}

function updateSpeed () {
	speed += acceleration;
	speed += speed > 0 ? -friction : friction;
	if ( Math.abs(speed) > maxSpeed ) speed = speed > 0 ? maxSpeed : -maxSpeed;
	if (acceleration == 0 && Math.abs(speed) <= defaultFriction ) speed = 0;
}

export default scene;
