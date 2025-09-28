import Experience from "../Experience.js";

import * as THREE  from"three";
import { gsap } from "gsap";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

       this.resources = this.experience.resources;
       this.room = this.resources.items.room;
       this.actualRoom = this.room.scene;

      
       
       this.setModel();
       this.setAnimation();
       
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
        
        // Keep room centered
        this.actualRoom.position.set(0, 0.1, 0);
        
        // Keep original rotation or very slight adjustment
        this.actualRoom.rotation.set(0, 0, 0);
    }

    setAnimation(){
        // Subtle floating animation for the entire room (only Y position)
        gsap.to(this.actualRoom.position, {
            y: 0.2,
            duration: 6,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
        
        // Remove the rotation animation since we want it centered and stable
        // The room will only move with mouse up/down and floating animation
    }
    
    // Removed mouse interaction - room stays perfectly centered

    resize(){
        


    }
    update(){
        // No manual updates needed - GSAP handles all animations
        // Room stays perfectly centered with only floating animation
    }

}