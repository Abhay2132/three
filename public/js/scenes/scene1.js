import * as THREE from "three";
import ajs from "../items/joystick.js";
import { $ , log } from "../hlpr.js";
import Car from "../items/car.js";
import plane from "../items/plane.js";
import {cube} from "../items/cube.js";

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
var jm = false;
const dt = ((Math.PI / 180)* 2);
const boost = 0.02;
let speedDir = 1;

// Load Plane
plane.rotation.x = - Math.PI / 2;
plane.add(new THREE.AxesHelper(50));
scene.add(plane);

// add axes  + grid
//scene.add(new THREE.GridHelper(1000, 60));

// SetUp Lighting + bg
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 100, 50 );
//light.castShadow = true;
light.add( new THREE.AxesHelper( 10 ) );

scene.add(light);
/*
light.shadow.mapSize.width = 512*10; // default
light.shadow.mapSize.height = 512*10; 
light.shadow.camera.near = 0.5*10; // default
light.shadow.camera.far = 500*50; // default
*/
scene.background = new THREE.Color(0xffffff);


// Load Car + Joystick
const car = cube;
scene.add(car);
/*
Car.then((c) => {
	const axesHelper = new THREE.AxesHelper( 500 );
	c.add( axesHelper );
	c.position.y = 2.4;
	const s = 1;
	c.scale.set(s, s, s);
	//c.traverse(node => {if(node.isMesh) node.castShadow = true; });
	scene.add(c);
	car = c;

});
*/
jm = ajs({ zone: $("#jsc"), color: "#333" });
addJSevents(jm[0]);

scene.cb = ({ controls, camera }) => {
	if (!car) return;
	maxSpeed = dir == "up" ? defaultMaxSpeed : 2.0;
	updateSpeed();
	switch( dir ) {
		case "right" : 
			car.rotation.y -= dt * Math.abs(speed) * msi;
			break;
		case "left" : 
			car.rotation.y += dt * Math.abs(speed) * msi;
			break;
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
	switch ( dir) {
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
/*
const width = window.innerWidth;
const height = window.innerHeight;
scene.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
*/
export default scene;
