//THREEJS RELATED VARIABLES 

var scene,
	camera, fieldOfView, aspectRatio, nearPlane, farPlane,
	gobalLight, shadowLight, backLight,
	renderer,
	container,
	controls;

var prevBtn, nextBtn;
var expl = document.getElementsByClassName("expl")[0];
var step = 0;
var steps = 10;


function initNav() {
	prevBtn = document.getElementsByClassName("previous")[0];
	nextBtn = document.getElementsByClassName("next")[0];
	stepMarker = document.getElementsByClassName("marker")[0];
	prevBtn.addEventListener("mousedown", previousStep);
	nextBtn.addEventListener("mousedown", nextStep);
	updateStep();
}

function nextStep() {
	step++;
	step = step % steps;
	updateStep();
}

function previousStep() {
	step--;
	if (step < 0) step += steps;
	updateStep();
}

function colorChange(c) {
	var x = c.id;
	mMat = new THREE.MeshStandardMaterial({
		color: c.value,
		side: THREE.DoubleSide,
		shading: THREE.SmoothShading,
		roughness: 1,
	});
	if (x == "legL") {
		hero.legL.material = mMat;
	}
	if (x == "legR") {
		hero.legR.material = mMat;
	}
	if (x == "handL") {
		hero.handL.material = mMat;
	}
	if (x == "handR") {
		hero.handR.material = mMat;
	}
	if (x == "torso") {
		hero.torso.material = mMat;
	}
	if (x == "head") {
		hero.head.material = mMat;
	}
}
function setCameraZ(c){
	if(c.id=="cameraX"){
		camera.position.x = c.value;
	}
	if(c.id=="cameraY"){
		camera.position.y = c.value;
	}
	if(c.id=="cameraZ"){
		camera.position.z = c.value;
	}
}



function resetHeroMaterials() {
	hero.legR.material = brownMat;
	hero.legL.material = brownMat;
	hero.handR.material = brownMat;
	hero.handL.material = brownMat;
	hero.torso.material = blueMat;
	hero.head.material = blueMat;
}

function updateStep() {
	stepMarker.innerHTML = (step + 1) + "/" + steps;
}

// OTHER VARIABLES

var PI = Math.PI;
var hero;
var clock;
var container;
//var gui = new dat.GUI();

// MATERIALS

var brownMat = new THREE.MeshStandardMaterial({
	color: 0x401A07,
	side: THREE.DoubleSide,
	shading: THREE.SmoothShading,
	roughness: 1,
});

var blackMat = new THREE.MeshPhongMaterial({
	color: 0x100707,
	shading: THREE.FlatShading,
});

var redMat = new THREE.MeshPhongMaterial({
	color: 0xAA5757,
	shading: THREE.FlatShading,
});

var blueMat = new THREE.MeshPhongMaterial({
	color: 0x5b9696,
	shading: THREE.FlatShading,
});

var whiteMat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	shading: THREE.FlatShading,
});

var currentMaterial = new THREE.MeshPhongMaterial({
	color: 0xff0000,
	shading: THREE.FlatShading,
});


function initScreenAnd3D() {
	container = document.getElementById('world');
	HEIGHT = container.offsetHeight;
	WIDTH = container.width;
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;

	scene = new THREE.Scene();

	scene.fog = new THREE.Fog(0xd6eae6, 150, 300);

	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 50;
	nearPlane = 1;
	farPlane = 2000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);
	camera.position.x = 0;
	camera.position.z = 100;
	camera.position.y = 0;
	// camera.lookAt(new THREE.Vector3(0, 1, 0));

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
	renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);

	window.addEventListener('resize', handleWindowResize, false);

	clock = new THREE.Clock();
	handleWindowResize();
}

function handleWindowResize() {
	HEIGHT = container.offsetHeight;
	WIDTH = container.offsetWidth;
	windowHalfX = WIDTH / 2;
	windowHalfY = HEIGHT / 2;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

function createLights() {
	globalLight = new THREE.AmbientLight(0xffffff, 1);
	shadowLight = new THREE.DirectionalLight(0xffffff, 1);
	shadowLight.position.set(10, 8, 8);
	shadowLight.castShadow = true;
	shadowLight.shadow.camera.left = -40;
	shadowLight.shadow.camera.right = 40;
	shadowLight.shadow.camera.top = 40;
	shadowLight.shadow.camera.bottom = -40;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
	shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;
	scene.add(globalLight);
	scene.add(shadowLight);
}

Hero = function() {
	this.runningCycle = 0;
	this.mesh = new THREE.Group();
	this.body = new THREE.Group();
	this.mesh.add(this.body);

	var torsoGeom = new THREE.CubeGeometry(8, 8, 8, 1); //
	this.torso = new THREE.Mesh(torsoGeom, blueMat);
	this.torso.position.y = 8;
	this.torso.castShadow = true;
	this.body.add(this.torso);

	var handGeom = new THREE.CubeGeometry(3, 3, 3, 1);
	this.handR = new THREE.Mesh(handGeom, brownMat);
	this.handR.position.z = 7;
	this.handR.position.y = 8;
	this.body.add(this.handR);

	this.handL = this.handR.clone();
	this.handL.position.z = -this.handR.position.z;
	this.body.add(this.handL);

	var headGeom = new THREE.CubeGeometry(16, 16, 16, 1); //
	this.head = new THREE.Mesh(headGeom, blueMat);
	this.head.position.y = 21;
	this.head.castShadow = true;
	this.body.add(this.head);

	var legGeom = new THREE.CubeGeometry(8, 3, 5, 1);

	this.legR = new THREE.Mesh(legGeom, brownMat);
	this.legR.position.x = 0;
	this.legR.position.z = 7;
	this.legR.position.y = 0;
	this.legR.castShadow = true;
	this.body.add(this.legR);

	this.legL = this.legR.clone();
	this.legL.position.z = -this.legR.position.z;
	this.legL.castShadow = true;
	this.body.add(this.legL);

	this.body.traverse(function(object) {
		if (object instanceof THREE.Mesh) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
	});
}
var speed = 1;
function setSpeed(c){
	speed = c.value;
}

Hero.prototype.run = function() {
	var s = 0.03;
	var t = this.runningCycle;
	// console.log(t)

	if (step > 8) t *= 2;
	t = t % (2 * PI);

	var amp = 4;
	var disp = .2;

	this.legR.rotation.z = 0;
	this.legR.position.y = 0;
	this.legR.position.x = 0;
	this.legL.rotation.z = 0;
	this.legL.position.y = 0;
	this.legL.position.x = 0;

	if (step > 0) {
		this.runningCycle += speed * s;
		this.legR.position.x = Math.cos(t) * amp;
		this.legR.position.y = -Math.sin(t) * amp;
	}
	if (step > 1) {
		this.legL.position.x = Math.cos(t + PI) * amp;
		this.legL.position.y = -Math.sin(t + PI) * amp;
	}
	if (step > 2) {
		this.legL.position.y = Math.max(0, this.legL.position.y);
		this.legR.position.y = Math.max(0, this.legR.position.y);
	}
	if (step > 3) {
		this.torso.position.y = 8 - Math.cos(t * 2) * amp * .2;
		this.head.position.y = 21 - Math.cos(t * 2) * amp * .3;
	}
	if (step > 4) {
		this.torso.rotation.y = -Math.cos(t + PI) * amp * .05;
	}
	if (step > 5) {
		this.handR.position.x = -Math.cos(t) * amp;
		this.handR.rotation.z = -Math.cos(t) * PI / 8;
		this.handL.position.x = -Math.cos(t + PI) * amp;
		this.handL.rotation.z = -Math.cos(t + PI) * PI / 8;
	}
	if (step > 6) {
		this.head.rotation.x = Math.cos(t) * amp * .02;
		this.head.rotation.y = Math.cos(t) * amp * .01;
	}
	if (step > 7) {
		if (t > PI) {
			this.legR.rotation.z = Math.cos(t * 2 + PI / 2) * PI / 4;
			this.legL.rotation.z = 0;
		} else {
			this.legR.rotation.z = 0;
			this.legL.rotation.z = Math.cos(t * 2 + PI / 2) * PI / 4;
		}
	}
}

function createHero() {
	hero = new Hero();
	hero.mesh.position.y = -15;
	scene.add(hero.mesh);
}
var rot = -.2;

function loop() {

	hero.run();
	//rot+=.01;
	hero.mesh.rotation.y = -Math.PI / 4 + Math.sin(rot * Math.PI / 8);
	render();
	requestAnimationFrame(loop);
}

function render() {
	renderer.render(scene, camera);
}

window.addEventListener('load', init, false);

function init(event) {
	initScreenAnd3D();
	createLights();
	createHero();
	loop();
	initNav();
}


// Trigo Circle



var cAngle = 0;
var tp = {
	radiusArc: 10,
	centerX: 60,
	centerY: 60,
	radiusLines: 50,
};
