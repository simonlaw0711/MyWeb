import "/style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(6, 6, 6);

const controls = new OrbitControls( camera, renderer.domElement );


// init THREEx
var domEvents	= new THREEx.DomEvents(camera, renderer.domElement)

// init dynamictexture w 5 h 5
var dynamictexture = new THREEx.DynamicTexture(5, 5);
dynamictexture.context.font = "bolder 90px verdana";
dynamictexture.texture.needsUpdate = true;
dynamictexture.clear('#d35400').drawText('Email', undefined, 256, 'green');

//Email
var dynamictexture = new THREEx.DynamicTexture(512, 512);
dynamictexture.context.font = "bolder 90px verdana";
dynamictexture.texture.needsUpdate = true;
dynamictexture.clear('#34B7F1').drawText('Email', undefined, 256, 'white');

const geometry = new THREE.BoxGeometry(18, 18, 18)
var material = new THREE.MeshBasicMaterial({color: 0xffffff, map: dynamictexture.texture, opacity:1, transparent: true});

const email = new THREE.Mesh(geometry, material)
scene.add(email)


var url	= 'mailto:lyming9811@gmail.com'
THREEx.Linkify(domEvents, email, url)

//Form
var dynamictexture2 = new THREEx.DynamicTexture(512, 512);
dynamictexture2.context.font = "bolder 90px verdana";
dynamictexture2.texture.needsUpdate = true;
dynamictexture2.clear('#D4AF37').drawText('Form', undefined, 256, 'white');

const geometry2= new THREE.BoxGeometry(18, 18, 18)
var material2 = new THREE.MeshBasicMaterial({color: 0xffffff, map: dynamictexture2.texture, opacity:1, transparent: true});
const form = new THREE.Mesh(geometry2, material2)
form.position.x = 40
scene.add(form)

var url2 = '/test/form.html'
THREEx.Linkify(domEvents, form, url2)

//Whatsapp
var dynamictexture3 = new THREEx.DynamicTexture(512, 512);
dynamictexture3.context.font = "bolder 90px verdana";
dynamictexture3.texture.needsUpdate = true;
dynamictexture3.clear('#25D366').drawText('Whatsapp', undefined, 256, 'White');

const geometry3 = new THREE.BoxGeometry(18, 18, 18)
var material3 = new THREE.MeshBasicMaterial({color: 0xffffff, map: dynamictexture3.texture, opacity:1, transparent: true});
const Whatsapp = new THREE.Mesh(geometry3, material3)
Whatsapp.position.x = -40
scene.add(Whatsapp)

var url3 = 'https://wa.link/mya3xd'
THREEx.Linkify(domEvents, Whatsapp, url3)

//Background
const callTexture = new THREE.TextureLoader().load("./bg.jpg");
scene.background = callTexture;

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();


function animate() {

	requestAnimationFrame( animate );
    controls.update();
	email.rotation.y += 0.05
	form.rotation.y += 0.05
	Whatsapp.rotation.y += 0.05
	dynamictexture.texture
	renderer.render( scene, camera );

}
animate()

