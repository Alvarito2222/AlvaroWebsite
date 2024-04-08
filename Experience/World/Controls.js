import Experience from "../Experience.js";
import Camera from "../Camera.js";

import * as THREE  from"three";
import GSAP from "gsap";
import  ScrollTrigger  from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';


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
            this.setSmoothScroll();
            this.setScrollTrigger();
            

        });


        
        GSAP.registerPlugin(ScrollTrigger);

        

    }

    setupASScroll() {
        const asscroll = new ASScroll({
          disableRaf: true });
      
      
          GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){

        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)":  () => {
                
                this.room.scale.set(0.07,0.07,0.07);

                // First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.00131;
                    }
                })


                // Second Section
                this.secondMoveTimeLine = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeLine.to(this.room.position, {
                    x: ()=>{
                        return 1;
                    },
                    z : ()=>{
                        return this.sizes.height * 0.0032;
                    }
                },"same");
                this.secondMoveTimeLine.to(this.room.scale, {
                    x: 0.18,
                    y: 0.15,
                    z: 0.06,
                },"same");
            },

            //Mobile
            "(max-width: 968px)":  () => {
                

                //Resets 
                this.room.scale.set(0.05,0.05,0.05)
                this.room.position.set(0,0,0);

                //First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * -0.00142;
                    }
                },"same").to(this.room.scale,{
                    x:0.04,
                    y:0.04,
                    z:0.04
                },"same")

                //Second Section
                this.secondMoveTimeLine = new GSAP.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale,{
                    x: 0.18,
                    y: 0.15,
                    z: 0.06,
                },"2nd").to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.01042;
                    }
                },"2nd");
            },

            
          
            all:  ()=> {
                
             
            },
          });


    }

    resize(){
        


    }
    update(){
       

    }

}