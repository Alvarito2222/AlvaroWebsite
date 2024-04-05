import Experience from "../Experience.js";
import * as THREE  from"three";
import GSAP from "gsap";
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
        this.sunLight = new THREE.DirectionalLight(new THREE.Color(0.7019607843137254, 0.8431372549019608, 0.9176470588235294), 4);
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
    
    switchTheme(theme){
        if(theme=== "dark"){
            GSAP.to(this.sunLight.color,{
                r: 0.32941176470588235,
                g:0.3058823529411765,
                b:0.796078431372549,
            });
            GSAP.to(this.ambientLight.color,{
                r:0.32941176470588235,
                g:0.3058823529411765,
                b:0.796078431372549,
            });
            GSAP.to(this.sunLight, {
                intensity : 4.5, 
            })
            GSAP.to(this.ambientLight, {
                intensity : 4.5, 
            })

        }else{
            GSAP.to(this.sunLight.color,{
                r:0.7019607843137254,
                g:0.8431372549019608,
                b:0.9176470588235294,
            });
            GSAP.to(this.ambientLight.color,{
                r:0.7019607843137254,
                g:0.8431372549019608,
                b:0.9176470588235294,
            });
        }
    }

    resize(){
        


    }
    update(){
        
    }

}