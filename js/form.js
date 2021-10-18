import * as THREE from 'three';
import { TrackballControls } from './TrackballControls';
import { CSS3DRenderer, CSS3DObject } from './CSS3DRenderer';

let camera, scene, renderer;
let controls;

function Element( id, x, y, z, ry ) {

    const div = document.createElement( 'div' );
    div.style.width = '480px';
    div.style.height = '360px';
    div.style.backgroundColor = '#000';

    const iframe = document.createElement( 'iframe' );
    iframe.style.width = '480px';
    iframe.style.height = '360px';
    iframe.style.border = '0px';
    iframe.src = ['https://docs.google.com/forms/d/e/1FAIpQLSe1PPbSbFHF2RS9tfatjz7Bz0xHDozq-YEjboaa3Z6hDDGh5g/viewform?embedded=true'];
    div.appendChild( iframe );

    const object = new CSS3DObject( div );
    object.position.set( x, y, z );
    object.rotation.y = ry;

    return object;

};

init();
animate();

function init() {

    const container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( 500, 350, 750 );

    scene = new THREE.Scene();

    renderer = new CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    const group = new THREE.Group();
    group.add( new Element( '', 0, 0, 240, 0 ) );
    scene.add( group );

    controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 4;

    window.addEventListener( 'resize', onWindowResize );

    // Block iframe events when dragging camera

    const blocker = document.getElementById( 'blocker' );
    blocker.style.display = 'none';

    controls.addEventListener( 'start', function () {

        blocker.style.display = '';

    } );
    controls.addEventListener( 'end', function () {

        blocker.style.display = 'none';

    } );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );

}