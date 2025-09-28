import Experience from "./Experience.js";

import * as THREE  from"three";
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            45, // Increased FOV for more immersive view
            this.sizes.aspect,
            0.1,
            1000
            );
        this.scene.add(this.perspectiveCamera)

        // Back to good camera position with tiny adjustments
        this.perspectiveCamera.position.x = -2.5;
        this.perspectiveCamera.position.y = 2.2;
        this.perspectiveCamera.position.z = 5.5;
        
        // Look at the centered room
        this.perspectiveCamera.lookAt(0, 0.15, 0);
        
        
    }

    createOrthographicCamera(){
        
        this.orthograpicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );
        this.orthograpicCamera.position.x = -1.7;
        this.orthograpicCamera.position.y = 1.5
        this.orthograpicCamera.position.z = 5;
        this.orthograpicCamera.rotation.x= -Math.PI / 10;
        this.scene.add(this.orthograpicCamera);

       // this.helper = new THREE.CameraHelper(this.orthograpicCamera);
        //this.scene.add(this.helper);

        
        const size=20;
        const divisions=20;
       // const gridHelper = new THREE.GridHelper( size, divisions);
       // this.scene.add(gridHelper);
        //const axesHelper = new THREE.AxesHelper(10);
        //this.scene.add(axesHelper);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas); 
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        
        // Set target back to centered room
        this.controls.target.set(0, 0.15, 0);
        
        // Limit camera movement for better UX
        this.controls.maxPolarAngle = Math.PI * 0.75; // Prevent camera from going too low
        this.controls.minDistance = 3;
        this.controls.maxDistance = 15;
        
        // Smooth rotation limits
        this.controls.maxAzimuthAngle = Math.PI * 0.5;
        this.controls.minAzimuthAngle = -Math.PI * 0.5;
        
        this.controls.update();
    }

    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();


        this.orthograpicCamera.left =  (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthograpicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthograpicCamera.top = this.sizes.frustrum / 2;
        this.orthograpicCamera.value = -this.sizes.frustrum / 2;
        this.orthograpicCamera.updateProjectionMatrix();
    }

    update(){
       // console.log(this.perspectiveCamera.position);
        this.controls.update();

      /*  this.helper.matrixWorldAutoUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthograpicCamera.position);
        this.helper.rotation.copy(this.orthograpicCamera.rotation);*/
    }

}