function startNewTree() {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(/* will default white */);
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 5;
	const geometry = new THREE.BoxGeometry(1, 1, 1);

	const leaveDarkMaterial = new THREE.MeshLambertMaterial({
		color: 0x91e56e
	});
	const leaveDarkSecondaryMaterial = new THREE.MeshLambertMaterial({
		color: 0x71b356
	});
	const leaveLightMaterial = new THREE.MeshLambertMaterial({
		color: 0xa2ff7a
	});
	const stemMaterial = new THREE.MeshLambertMaterial({
		color: 0x7d5a4f
	});

	const light = new THREE.DirectionalLight(0xeeffd3, 1);
	light.position.set(0, 0, 1);
	scene.add(light);

	const tree = new THREE.Group();

	const stem = new THREE.Mesh(geometry, stemMaterial);
	stem.position.set(0, 0, 0);
	stem.scale.set(0.3, 3, 0.3);
	tree.add(stem);

	const leave1 = new THREE.Mesh(geometry, leaveDarkMaterial);
	leave1.position.set(0.5, 1.6, 0.5);
	leave1.scale.set(0.8, 0.8, 0.8);
	tree.add(leave1);

	const leave2 = new THREE.Mesh(geometry, leaveDarkMaterial);
	leave2.position.set(-0.4, 1.3, -0.4);
	leave2.scale.set(0.7, 0.7, 0.7);
	tree.add(leave2);

	const leave3 = new THREE.Mesh(geometry, leaveDarkMaterial);
	leave3.position.set(0.4, 1.7, -0.5);
	leave3.scale.set(0.7, 0.7, 0.7);
	tree.add(leave3);

	const leaveDark = new THREE.Mesh(geometry, leaveDarkMaterial);
	leaveDark.position.set(0, 1.2, 0);
	leaveDark.scale.set(1, 2, 1);
	tree.add(leaveDark);

	const leaveLight = new THREE.Mesh(geometry, leaveLightMaterial);
	leaveLight.position.set(0, 1.2, 0);
	leaveLight.scale.set(1.1, 0.5, 1.1);
	tree.add(leaveLight);

	const ground = new THREE.Mesh(geometry, leaveDarkSecondaryMaterial);
	ground.position.set(0, -1, 0);
	ground.scale.set(2.4, 0.1, 2.4);
	tree.add(ground);

	tree.rotation.y = 1;
	tree.rotation.x = 0.5;

	scene.add(tree);

	const renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const state = {
		stem: 0
	};

	function render() {
		requestAnimationFrame(render);

		tree.rotation.y += 0.007;

		stem.scale.set(state.stem, 3, state.stem);

		if (state.stem < 0.3) {
			state.stem += 0.001;
		}

		renderer.render(scene, camera);
	}

	render();
}

function getRemainingTime(endtime) {
	const total = Date.parse(endtime) - Date.parse(new Date());
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const seconds = Math.floor((total / 1000) % 60);

	return {
		total,
		minutes,
		seconds
	};
}

function startNewPomodoro() {
	const time = dayjs()
		.add(25, "minutes")
		.toDate();

	startNewTree();

	setInterval(() => {
		const minutesElement = document.querySelector("#minutes");
		const secondsElement = document.querySelector("#seconds");

		const remainingTime = getRemainingTime(time);

		minutesElement.textContent = remainingTime.minutes;
		secondsElement.textContent = remainingTime.seconds;
	}, 1000);
}
