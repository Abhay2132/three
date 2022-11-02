const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-5, 1, 10); //default; light shining from top
light.castShadow = true; // default false
scene.add(light);

//Create a sphere that cast shadows (but does not receive them)
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add(sphere);
sphere.position.y = 5;
//Create a plane that receives shadows (but does not cast them)
const ps = 40;
const planeGeometry = new THREE.PlaneGeometry(ps, ps, ps, ps);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);

//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);

plane.rotation.x = 5;
scene.cb = () => {};

export default scene;
