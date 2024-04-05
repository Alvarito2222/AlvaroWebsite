import Experience from "../Experience.js";
import Camera from "../Camera.js";

import * as THREE  from"three";
import GSAP from "gsap";
import  ScrollTrigger  from "gsap/ScrollTrigger.js";


export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time=this.experience.time;
        this.camera= this.experience.camera;

        this.resources.on("ready", ()=> {

            this.room = this.experience.world.room.actualRoom;
            this.setPath();
        });


        GSAP.registerPlugin(ScrollTrigger);

        

    }

    setPath(){
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.room.position,  {
            x: () => {
                return this.sizes.width * 0.0012;
            },
            scrollTrigger: {
                trigger: ".first-move",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,

            },
        });
    }


    resize(){
        


    }
    update(){
       

    }

}