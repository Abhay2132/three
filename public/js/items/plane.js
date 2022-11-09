import * as THREE from "three";
const s = 100;

const planeGeometry = new THREE.PlaneGeometry( s,s,s,s)//20, 20, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
//plane.receiveShadow = true;

export default plane;
