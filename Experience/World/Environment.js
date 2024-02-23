import Experience from "../Experience.js";
import * as THREE  from"three";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
       
       
       this.setSunlight();
       
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.near = 0.1;
        this.sunLight.shadow.camera.far = 50;
        this.sunLight.shadow.mapSize.set(2024,2024);
        this.sunLight.shadow.normalBias = 0.01;
        this.sunLight.shadow.bias = -0.0001;
       // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        //this.scene.add(helper);
        this.sunLight.position.set(-1,2 ,3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 3 );
        //this.ambientLight.castShadow = true;
        //this.ambientLight.shadow.camera.far = 10;
        //this.ambientLight.shadow.mapSize.set(2048,2048);
        //this.ambientLight.shadow.normalBias = 0.05;
        this.ambientLight.position.set(0, 3,0);
       // const helper = new THREE.CameraHelper(this.ambientLight);
        //this.scene.add(helper);
        this.scene.add(this.ambientLight);
        this.pointLight = new THREE.PointLight("#ffffff", 1 );
        this.pointLight.position.set(0, 2, 0);
        this.pointLight.distance = 15;
        this.scene.add(this.pointLight);

  
    }
    

    resize(){
        


    }
    update(){
        
    }

}