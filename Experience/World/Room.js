import Experience from "../Experience.js";

import * as THREE  from"three";
import GSAP from "gsap";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

       this.resources = this.experience.resources;
       this.room = this.resources.items.room;
       this.actualRoom = this.room.scene;
       this.lerpx = {
        current: 0,
        target: 0,
        ease:0.7
       };

       this.lerpy = {
        current: 0,
        target: 0,
        ease:0.7
       };

      
       
       this.setModel();
       this.onMouseMove();
       
    }

    setModel(){
        this.actualRoom.children.forEach(child=>{
            child.castShadow =true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow =true;
                    groupchild.receiveShadow = true;
                })
            }

        })
            
        
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.07,0.07,0.07);
    }
    
    onMouseMove(){
        window.addEventListener("mousemove",(e) => {
            
            this.rotationy = ((e.clientX - window.innerWidth / 2)*2) / window.innerWidth  ;
            this.lerpy.target = this.rotationy*0.1;

           
        });

        window.addEventListener("mousemove",(s) => {
            
            

            this.rotationx = ((s.clientY - window.innerWidth / 2)*2) / window.innerWidth  ;
            this.lerpx.target = this.rotationx*0.1;

            
        });

    }

    resize(){
        


    }
    update(){
        this.lerpy.current = GSAP.utils.interpolate(
            this.lerpy.current,
            this.lerpy.target,
            this.lerpy.ease
        );
        this.lerpx.current = GSAP.utils.interpolate(
            this.lerpx.current,
            this.lerpx.target,
            this.lerpx.ease
        );
       

        this.actualRoom.rotation.x = this.lerpx.current;
        this.actualRoom.rotation.y = this.lerpy.current;
       
        
    }

}