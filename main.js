import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x232b2f);
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const dragControls = new DragControls( objects, camera, renderer.domElement );

let controls = new MapControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

// const axesHelper = new THREE.AxesHelper(150);
// scene.add(axesHelper);

camera.position.set( 0, 100, 140 );

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const pointLight = new THREE.PointLight();
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

class Sphere extends THREE.Mesh {
	constructor () {
		super();
		this.geometry = new THREE.SphereGeometry(20);
		this.material = new THREE.MeshBasicMaterial({color: 'crimson', wireframe: true});
	}
}

class Cube extends THREE.Mesh {
	constructor (x, y, z, color) {
		super();
		this.geometry = new THREE.BoxGeometry(x,y,z);
		this.material = new THREE.MeshBasicMaterial({color: color});
	}
}

const cube = new Cube(5, 5, 5, 0xD5BF86 );
cube.position.set(2.5, 2.5, 2.5);
scene.add(cube);

const cube2 = new Cube(10,10,10, 0xDC143C );
cube2.position.set(15, 5, 15);
scene.add(cube2);

const cube3 = new Cube(15,15,15, 0xF1F0CC );
cube3.position.set(27.5, 7.5, -27.5);
scene.add(cube3);

const cube4 = new Cube(20,20,20, 0x334195 );
cube4.position.set(-30, 10, 30);
scene.add(cube4);

const cube5 = new Cube(30,30,30, 0x3C0919 );
cube5.position.set(-20, 15, -20);
scene.add(cube5);

const sphere = new Sphere();
sphere.position.y = 0;
scene.add(sphere)

const planeGeometry = new THREE.PlaneGeometry(200, 200);
const planeMaterial = new THREE.MeshBasicMaterial({
	color: 0xd6d8d6,
	side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.1;
scene.add(plane);

const gridHelper = new THREE.GridHelper(200, 20, new THREE.Color(0x7b7d7b), new THREE.Color(0x7b7d7b));
scene.add(gridHelper);

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

if ( WebGL.isWebGLAvailable() ) {
	animate();

} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);

}

window.addEventListener('resize', function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});