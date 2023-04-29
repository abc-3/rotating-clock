/*
<script src="https://gsync.io/wp-content/uploads/2020/11/three.min_.js"></script>
*/

// Perspective is one of a few cameras
// FOV - first param is in degrees
var camera = new THREE.PerspectiveCamera( 
    70, window.innerWidth / window.innerHeight, 1, 2500 );
camera.position.z = 1000;

// set up the scene
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// add solids (edge color is white - Earth)
var cube_geometry =	new THREE.BoxBufferGeometry( 280, 280, 280 );
var cube_edges = new THREE.EdgesGeometry( cube_geometry );
var tetrahedron_geometry =	new THREE.TetrahedronBufferGeometry( 250, 0 );
var tetrahedron_edges = new THREE.EdgesGeometry( tetrahedron_geometry );
var dodecahedron_geometry =	new THREE.DodecahedronBufferGeometry( 200, 0 );
var dodecahedron_edges = new THREE.EdgesGeometry( dodecahedron_geometry );
var icosohedron_geometry =	new THREE.IcosahedronBufferGeometry( 200, 0 );
var icosohedron_edges = new THREE.EdgesGeometry( icosohedron_geometry );
var octahedron_geometry =	new THREE.OctahedronBufferGeometry( 200, 0 );
var octahedron_edges = new THREE.EdgesGeometry( octahedron_geometry );
// cube settings - Saturn
var cube_material = new THREE.MeshStandardMaterial(
    {transparent: true, opacity: 0.5, color: 0x7a90ff});
var cube = new THREE.Mesh( cube_geometry, cube_material );
var cube_line_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
var cube_line = new THREE.LineSegments( cube_edges, cube_line_material);
cube.position.set(400, 400, 0);
cube_line.position.set(400, 400, 0);
// tetrahedron - Jupiter
var tetrahedron_material = new THREE.MeshStandardMaterial(
    {transparent: true, opacity: 0.5, color: 0xff9933});
var tetrahedron = new THREE.Mesh( tetrahedron_geometry, tetrahedron_material );
var tetrahedron_line_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
var tetrahedron_line = new THREE.LineSegments( tetrahedron_edges, tetrahedron_line_material);
tetrahedron.position.set(-400, 400, 0);
tetrahedron_line.position.set(-400, 400, 0);
// dodecahedron - Mars
var dodecahedron_material = new THREE.MeshStandardMaterial(
    {transparent: true, opacity: 0.5, color: 0xff7a7a});
var dodecahedron = new THREE.Mesh( dodecahedron_geometry, dodecahedron_material );
var dodecahedron_line_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
var dodecahedron_line = new THREE.LineSegments( dodecahedron_edges, dodecahedron_line_material);
dodecahedron.position.set(400, -400, 0);
dodecahedron_line.position.set(400, -400, 0);
// icosohedron - Venus
var icosohedron_material = new THREE.MeshStandardMaterial(
    {transparent: true, opacity: 0.5, color: 0xb199ff});
var icosohedron = new THREE.Mesh( icosohedron_geometry, icosohedron_material );
var icosohedron_line_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
var icosohedron_line = new THREE.LineSegments( icosohedron_edges, icosohedron_line_material);
icosohedron.position.set(-400, -400, 0);
icosohedron_line.position.set(-400, -400, 0);
// octahedron - Mercury
var octahedron_material = new THREE.MeshStandardMaterial(
    {transparent: true, opacity: 0.5, color: 0x80ffc0});
var octahedron = new THREE.Mesh( octahedron_geometry, octahedron_material );
var octahedron_line_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
var octahedron_line = new THREE.LineSegments( octahedron_edges, octahedron_line_material);

scene.add( tetrahedron );
scene.add( tetrahedron_line );
scene.add( cube );
scene.add( cube_line );
scene.add( octahedron );
scene.add( octahedron_line );
scene.add( dodecahedron );
scene.add( dodecahedron_line );
scene.add( icosohedron );
scene.add( icosohedron_line );

function animate() {
    requestAnimationFrame( animate );
    // small rotation to the shapes & edges
    cube.rotation.x += 0.003;
    cube.rotation.y += 0.003;
    cube_line.rotation.x += 0.003;
    cube_line.rotation.y += 0.003;
    tetrahedron.rotation.x += 0.003;
    tetrahedron.rotation.y += 0.003;
    tetrahedron_line.rotation.x += 0.003;
    tetrahedron_line.rotation.y += 0.003;
    dodecahedron.rotation.x += 0.003;
    dodecahedron.rotation.y += 0.003;
    dodecahedron_line.rotation.x += 0.003;
    dodecahedron_line.rotation.y += 0.003;
    icosohedron.rotation.x += 0.003;
    icosohedron.rotation.y += 0.003;
    icosohedron_line.rotation.x += 0.003;
    icosohedron_line.rotation.y += 0.003;								
    octahedron.rotation.x += 0.003;
    octahedron.rotation.y += 0.003;
    octahedron_line.rotation.x += 0.003;
    octahedron_line.rotation.y += 0.003;
    render();
    window.addEventListener( 'resize', onWindowResize, false );
}
light = new THREE.AmbientLight( {color: 0x404040, intensity: 1.5} );
scene.add(light);
scene.background = new THREE.Color( 0x212529 );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function render() {
    renderer.render( scene, camera );
}
animate();
