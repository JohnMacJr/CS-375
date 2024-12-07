import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(12, 15, 0);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xFFD580, 3);
light.position.set(10, 10, 10);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 100;
light.shadow.camera.left = -20;
light.shadow.camera.right = 20;
light.shadow.camera.top = 20;
light.shadow.camera.bottom = -20;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xFFD580, 0.5);
scene.add(ambientLight);

// Textured Plane
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('assets/red_sand.png');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);

const planeGeometry = new THREE.PlaneGeometry(110, 165);
const planeMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
plane.receiveShadow = true;
scene.add(plane);

// Load 3D Model
let ship;
const loader = new GLTFLoader();
loader.load(
    'assets/Spaceship2.glb',
    (gltf) => {
        ship = gltf.scene;
        ship.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        ship.position.set(6, 4, 0);
        ship.scale.set(1, 1, 1);
        ship.rotation.y = -Math.PI / 2;
        scene.add(ship);
    }
);

const scrollSpeed = 0.05;

// Ship Movement Variables
let moveDirection = 0; 
let maxTilt = Math.PI / 8;
const moveSpeed = 0.1;

// Keyboard Event Listeners
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveDirection = 1; // Move left
    } else if (event.key === 'ArrowRight') {
        moveDirection = -1; // Move right
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        moveDirection = 0; // Stop moving
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    groundTexture.offset.x -= scrollSpeed;

    if (ship) {
        const newPositionZ = ship.position.z + moveSpeed * moveDirection;

        if (newPositionZ >= -14 && newPositionZ <= 14) {
            ship.position.z = newPositionZ;
        }

        ship.rotation.z = -moveDirection * maxTilt;
    }
    renderer.render(scene, camera);
}
animate();

