import Experience from "../Experience.js";
import * as THREE  from"three";
import { gsap } from "gsap";
import GUI from 'lil-gui'; 

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
       
       // this.gui = new GUI({container: document.querySelector(".hero-main")});
       /* this.obj = {
            colorObj : {r: 0 ,g: 0 , b:0},
            intensity :2,

        };*/
       this.setSunlight();

      // this.setGUI();
       
    }

   /* setGUI(){
        this.gui.addColor(this.obj,"colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj)
            this.ambientLight.color.copy(this.obj.colorObj)
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0,10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity
            this.ambientLight.intensity = this.obj.intensity
        })
    }*/

    setSunlight(){
        // Main directional light (sun) - brighter and warmer
        this.sunLight = new THREE.DirectionalLight(new THREE.Color(1.0, 0.98, 0.95), 6);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.near = 0.1;
        this.sunLight.shadow.camera.far = 50;
        this.sunLight.shadow.mapSize.set(2048, 2048); // Reduced for better performance
        this.sunLight.shadow.normalBias = 0.02;
        this.sunLight.shadow.bias = -0.0002;
        
        // Better sun position for more dramatic lighting
        this.sunLight.position.set(-6, 10, 8);
        this.sunLight.shadow.camera.left = -10;
        this.sunLight.shadow.camera.right = 10;
        this.sunLight.shadow.camera.top = 10;
        this.sunLight.shadow.camera.bottom = -10;
        this.scene.add(this.sunLight);

        // Brighter ambient light for better visibility
        this.ambientLight = new THREE.AmbientLight(new THREE.Color(0.6, 0.7, 0.8), 3.5);
        this.scene.add(this.ambientLight);
        
        // Key light - focused on the desk area (brighter)
        this.keyLight = new THREE.SpotLight(new THREE.Color(1.0, 0.95, 0.8), 5, 25, Math.PI * 0.4, 0.3);
        this.keyLight.position.set(-4, 8, 6);
        this.keyLight.target.position.set(0, 1, 0);
        this.keyLight.castShadow = true;
        this.keyLight.shadow.mapSize.set(1024, 1024);
        this.scene.add(this.keyLight);
        this.scene.add(this.keyLight.target);
        
        // Fill light - brighter blue light from the opposite side
        this.fillLight = new THREE.DirectionalLight(new THREE.Color(0.7, 0.8, 1.0), 3);
        this.fillLight.position.set(6, 6, -3);
        this.scene.add(this.fillLight);
        
        // Rim light for depth (brighter)
        this.rimLight = new THREE.DirectionalLight(new THREE.Color(0.9, 0.95, 1.0), 3.5);
        this.rimLight.position.set(0, 6, -6);
        this.scene.add(this.rimLight);
        
        // Additional accent lights for better illumination
        this.accentLight1 = new THREE.PointLight(new THREE.Color(1.0, 0.9, 0.7), 2, 15);
        this.accentLight1.position.set(3, 4, 3);
        this.scene.add(this.accentLight1);
        
        this.accentLight2 = new THREE.PointLight(new THREE.Color(0.7, 0.8, 1.0), 2, 15);
        this.accentLight2.position.set(-3, 4, -3);
        this.scene.add(this.accentLight2);

  
    }
    
    switchTheme(theme){
        if(theme === "dark"){
            // Dark theme - cooler but still bright enough to see details
            gsap.to(this.sunLight.color, {
                r: 0.5, g: 0.6, b: 0.9, duration: 1
            });
            gsap.to(this.sunLight, {
                intensity: 4.0, duration: 1 // Much brighter for dark mode
            });
            
            gsap.to(this.ambientLight.color, {
                r: 0.4, g: 0.5, b: 0.7, duration: 1
            });
            gsap.to(this.ambientLight, {
                intensity: 2.8, duration: 1 // Much brighter ambient
            });
            
            gsap.to(this.keyLight.color, {
                r: 0.6, g: 0.7, b: 1.0, duration: 1
            });
            gsap.to(this.keyLight, {
                intensity: 4.0, duration: 1 // Brighter key light
            });
            
            gsap.to(this.fillLight, {
                intensity: 2.5, duration: 1 // Much brighter fill
            });
            
            gsap.to(this.rimLight, {
                intensity: 3.0, duration: 1 // Brighter rim
            });
            
            // Make accent lights brighter in dark mode
            gsap.to(this.accentLight1, {
                intensity: 3.0, duration: 1
            });
            gsap.to(this.accentLight2, {
                intensity: 3.0, duration: 1
            });

        } else {
            // Light theme - warm, natural lighting
            gsap.to(this.sunLight.color, {
                r: 1.0, g: 0.98, b: 0.95, duration: 1
            });
            gsap.to(this.sunLight, {
                intensity: 6.0, duration: 1
            });
            
            gsap.to(this.ambientLight.color, {
                r: 0.6, g: 0.7, b: 0.8, duration: 1
            });
            gsap.to(this.ambientLight, {
                intensity: 3.5, duration: 1
            });
            
            gsap.to(this.keyLight.color, {
                r: 1.0, g: 0.95, b: 0.8, duration: 1
            });
            gsap.to(this.keyLight, {
                intensity: 5.0, duration: 1
            });
            
            gsap.to(this.fillLight, {
                intensity: 3.0, duration: 1
            });
            
            gsap.to(this.rimLight, {
                intensity: 3.5, duration: 1
            });
            
            // Normal accent light intensity
            gsap.to(this.accentLight1, {
                intensity: 2.0, duration: 1
            });
            gsap.to(this.accentLight2, {
                intensity: 2.0, duration: 1
            });
        }
    }

    resize(){
        


    }
    update(){
        
    }

}