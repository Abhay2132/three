import nipplejs from "nipplejs";
function addJoystick(opt) {
	const options = {
		//    zone: document.getElementById('joystickWrapper1'),
		size: 100,
		multitouch: true,
		maxNumberOfNipples: 2,
		mode: "static",
		restJoystick: true,
		shape: "circle",
		position: { top: "50px", left: "50px" },
		dynamicPage: true,
		...opt,
	};

	return nipplejs.create(options);
}

export default addJoystick;
