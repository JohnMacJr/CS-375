import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting temporary before
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Load 3D Model
const loader = new GLTFLoader();
loader.load(
    'assets/Spaceship2.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(3, 0, 0);
        model.scale.set(1, 1, 1);
        model.rotation.y = -Math.PI / 2;
        scene.add(model);
    }
);

// Textured Plane
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('assets/swamp_mud.png');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);

const planeGeometry = new THREE.PlaneGeometry(120, 170);
const planeMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
scene.add(plane);

camera.position.set(8, 8, 0);
camera.lookAt(0, 0, 0);

const scrollSpeed = 0.05;

function animate() {
    groundTexture.offset.x -= scrollSpeed;

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
