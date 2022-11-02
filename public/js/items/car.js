import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();
const car = new Promise((res, rej) => {
	loader.load(
		"/3d/car/scene.gltf",
		function (gltf) {
			res(gltf.scene);
		},
		undefined,
		function (error) {
			console.error({ error });
			rej(error);
		}
	);
});

export default car;
