import * as THREE from 'three';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a green cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.x = +2;
cube.position.y = +2;

// Textured Plane
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('assets/swamp_mud.png');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
scene.add(plane);

camera.position.set(8, 8, 0); 
camera.lookAt(0, 0, 0);      

function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
