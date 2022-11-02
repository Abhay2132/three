import * as THREE from "three";
const s = 80;

const geometry = new THREE.PlaneGeometry(s, s);
const material = new THREE.MeshBasicMaterial({
	color: 0xff7782,
	side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);

/*
const planeGeometry = new THREE.PlaneGeometry( s, s,s,s);
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
*/
/*
var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var texture = new THREE.TextureLoader().load( '/home/admin/Documents/ThreeJS/img/pattern1.jpeg' );
    var planeMaterial = new THREE.MeshLambertMaterial( { map: texture } );
    //var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0,0,0);
*/
export default plane;
