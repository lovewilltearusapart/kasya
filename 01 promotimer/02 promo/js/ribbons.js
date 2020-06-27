THREE.TextureLoader.prototype.crossOrigin = '';
var renderer, scene, camera, geometry, material, mesh;

var pointLightPrimary, lightPrimaryDirection;
var pointLightSecondary, lightSecondaryDirection;
var lightDistance = 80;
var lightSpeed = 0.05;

init();
animate();

function init() {
	// Renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor (0x000000, 1);
	document.body.appendChild( renderer.domElement );

	// Scene
	scene = new THREE.Scene();
  scene.background = new THREE.Color("#000000");
  scene.fog = new THREE.FogExp2(0x000000, 0.015);

	// Camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, -10, 0);
	camera.rotation.x = (90*Math.PI)/180;
  camera.rotation.z = -(90*Math.PI)/180;
	camera.setFocalLength(4);
  
  var light = new THREE.AmbientLight( 0x00b7ff, 0.9 );
  scene.add( light );
  
	// Light
	pointLightPrimary = new THREE.PointLight( 0x00b7ff, 1, 80, 2 );
	pointLightPrimary.position.set( -10, lightDistance, 0 );
	scene.add( pointLightPrimary );
  
  // var sphereSize = 1;
  // var pointLightHelper = new THREE.PointLightHelper( pointLightPrimary, sphereSize );
  // scene.add( pointLightHelper );

	pointLightSecondary = new THREE.PointLight( 0xffffc7, 1, 80, 2 );
	pointLightSecondary.position.set( 10, -lightDistance, 0 );
	scene.add( pointLightSecondary );
  
 
  // var pointLightHelper2 = new THREE.PointLightHelper( pointLightSecondary, sphereSize );
  // scene.add( pointLightHelper2 );

	// Planes
  var image = document.createElement('img');
  var alphaMap = new THREE.Texture(image);
  image.onload = function()  {
      alphaMap.needsUpdate = true;
  };
  image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzNjk1NjkxQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjk1NjkyQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjM2OTU2OEZCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjM2OTU2OTBCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WU2ohAAAAH0lEQVR42mJgoDVg/P//P0kamBgGHRj1w0jxA0CAAQBKrgwBw+YutwAAAABJRU5ErkJggg==';
  
	geometry = new THREE.PlaneGeometry( 320, 320, 320, 320 );
	material = new THREE.MeshPhongMaterial({ color: "SteelBlue", transparent: true, side: THREE.DoubleSide, alphaTest: 0.15, opacity: 1 });
  material.shininess = 10;
  material.alphaMap = alphaMap;
  material.alphaMap.magFilter = THREE.NearestFilter;
  material.alphaMap.wrapT = THREE.RepeatWrapping;
  material.alphaMap.repeat.y = 1;
  
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 0, -60 );
  mesh.rotation.set(0, 0, -(90*Math.PI)/180);
	scene.add( mesh );
  
	// var meshTop1 = mesh.clone();
	// meshTop1.position.set( 0, -20, -30 );
	// meshTop1.rotation.set(0, 0, -(90*Math.PI)/180);
	// scene.add(meshTop1);

	var meshBottom1 = mesh.clone();
	meshBottom1.position.set( 0, 0, 60 );
	meshBottom1.rotation.set(0, 0, -(90*Math.PI)/180);
	scene.add(meshBottom1);

	// var meshBottom2 = mesh.clone();
	// meshBottom2.position.set( 0, 20, 30 );
	// meshBottom2.rotation.set(0, 0, -(90*Math.PI)/180);
	// scene.add(meshBottom2);

	window.addEventListener('resize', function() {
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();
	});
}

function animate(timestamp) {
  var center = new THREE.Vector2(100,0);
  requestAnimationFrame(animate);
  var verticesLength = mesh.geometry.vertices.length;
  for (var i = 0; i < verticesLength; i++) {
    var v = mesh.geometry.vertices[i];
    var dist = new THREE.Vector2(v.x, v.y).sub(center);
    var size = 15.0;
    var magnitude = 20;
    v.z = Math.sin(dist.length()/-size + (timestamp/1200)) * magnitude;
  }

	// Change target position
	if (pointLightSecondary.position.y >= lightDistance) {
		lightPrimaryDirection = -1;
	} else if (pointLightSecondary.position.y <= -lightDistance) {
		lightPrimaryDirection = 1;
	}
	pointLightSecondary.position.y += lightSpeed * lightPrimaryDirection;

	if (pointLightPrimary.position.y >= lightDistance) {
		lightSecondaryDirection = -1;
	} else if (pointLightPrimary.position.y <= -lightDistance) {
		lightSecondaryDirection = 1;
	}
	pointLightPrimary.position.y += lightSpeed * lightSecondaryDirection;

  mesh.geometry.verticesNeedUpdate = true;
	camera.rotation.z += 0.0008;
  renderer.render(scene, camera);
}
