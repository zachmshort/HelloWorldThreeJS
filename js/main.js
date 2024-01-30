import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


let mouseX = window.innerWidth / 2; //keeps track of mouse position
let mouseY = window.innerHeight / 2;

let object; //object from blender, global var

let controls; // variable for moving mouse

let objToRender = 'first3dscene'; //name of .glb file

const loader = new GLTFLoader(); //loads glb/gltf file

// const progressBarContainer = document.getElementById("progressBarContainer");
// const progressBar = document.getElementById("progressBar");

//Load the file
loader.load(
  `models/${objToRender}.glb`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    // progressBarContainer.style.display = 'none';
  },
  // function (xhr) {
  //   const percentageLoaded = (xhr.loaded / xhr.total) * 100;
  //   console.log(percentageLoaded + '% loaded');

  //   // Update the progress bar width
  //   progressBar.style.width = percentageLoaded + '%';
  // },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); //alpha: true = transparent bg
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement); //add the renderer to the DOM

camera.position.z = objToRender === "first3dscene" ? 100 : 500; //sets distance from object

//lights
const topLight = new THREE.DirectionalLight(0xffffff, 2); // (color, intensity)
topLight.position.set(1000, 1000, 1000) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "first3dscene" ? 5 : 1);
scene.add(ambientLight);

//mouse controls
if (objToRender === "first3dscene") {
  controls = new OrbitControls(camera, renderer.domElement);
}

//renders scene
function animate() {
  requestAnimationFrame(animate);

  // //Make the scene move w/ mouse (good for things you want to track mouse like an eye)
  // if (object && objToRender === "monkey1") {
  //   //I've played with the constants here until it looked good 
  //   object.rotation.y = -3 + mouseX / window.innerWidth * 3;
  //   object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  // }
  renderer.render(scene, camera);
}

//resizes the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//mouse position to make the object move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//start
animate();