//Escena
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 10, 140);
//Camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;
camera.position.y = 50;
camera.position.x = 5;
 
//Plano
const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff }));
plane.rotation.x = -0.5 * Math.PI;

//Agregar mesh 
scene.add(plane);

//Stats
var stats;
stats = new Stats();
stats.setMode(2); // 0: fps, 1: ms, 2memory
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "100px";
stats.domElement.style.top = "10px";
document.getElementById("myStats").appendChild(stats.domElement);

//Agregar Cubos
var controls = new (function () {
    this.addBuilding = function () {
    var Width = random(8,12);
    var Height = random (20, 40);
    var positionX = random(-40, 40);
    var positionZ = random(-40, 40);
    var material = getRandomColor();
    const color1 = new THREE.Color().setHex(material);
    var cube = new THREE.Mesh(new THREE.BoxGeometry(Width,Height, Width), new THREE.MeshBasicMaterial( { color: color1 }) );
    cube.position.x = positionX; 
    cube.position.y = 10;
    cube.position.z = positionZ;
    scene.add(cube);
    };
});

//DatGui
var gui = new dat.GUI();
gui.add(controls, 'addBuilding');

//Controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
    stats.update();
}
animate();

//Numeros Random
function random (min, max){
    return Math.floor((Math.random() *( max - min + 1))+ min);
}
//Colores Random
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }