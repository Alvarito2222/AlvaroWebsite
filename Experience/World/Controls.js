import Experience from "../Experience.js";
import Camera from "../Camera.js";

import * as THREE  from"three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
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


        
        gsap.registerPlugin(ScrollTrigger);

        

    }

    setupASScroll() {
        const asscroll = new ASScroll({
          disableRaf: true,
          ease: 0.08,
          touchMultiplier: 1.0,
          wheelMultiplier: 1.0
        });
      
        gsap.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement
        });
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { 
              top: 0, 
              left: 0, 
              width: window.innerWidth, 
              height: window.innerHeight 
            };
          }
        });
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable();
        });
        
        return asscroll;
      }

    setSmoothScroll(){
        // Disable smooth scroll - not working well
        // this.asscroll = this.setupASScroll();
        console.log("Smooth scroll disabled - using native browser scrolling");
    }

    setScrollTrigger(){

        ScrollTrigger.matchMedia({
            // Large Desktop (1440px+) - Keep original size
            "(min-width: 1400px)": () => {
                this.room.scale.set(0.07, 0.07, 0.07); // Keep original size

                // First Section
                this.firstMoveTimeline = new gsap.timeline({
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

                // Second Section - Original scaling for 1440px+
                this.secondMoveTimeLine = new gsap.timeline({
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
                    x: 0.18, // Original scale
                    y: 0.15,
                    z: 0.18,
                },"same");
            },
            
            // Medium-Large Desktop (1200px - 1399px)
            "(min-width: 1200px) and (max-width: 1399px)": () => {
                this.room.scale.set(0.06, 0.06, 0.06); // Your suggested scale

                this.firstMoveTimeline = new gsap.timeline({
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

                this.secondMoveTimeLine = new gsap.timeline({
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
                    x: 0.16, // Your suggested scale
                    y: 0.16,
                    z: 0.16,
                },"same");
            },
            
            // Medium Desktop (1000px - 1199px)
            "(min-width: 1000px) and (max-width: 1199px)": () => {
                this.room.scale.set(0.05, 0.05, 0.05); // Your suggested scale

                this.firstMoveTimeline = new gsap.timeline({
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

                this.secondMoveTimeLine = new gsap.timeline({
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
                    x: 0.14, // Your suggested scale
                    y: 0.14,
                    z: 0.14,
                },"same");
            },
            
            //Regular Mobile (561px - 968px)
            "(min-width: 561px) and (max-width: 968px)": () => {
                //Resets - centered position more to the left
                this.room.scale.set(0.04,0.04,0.04) // Smaller mobile scale
                this.room.position.set(-0.5,0,0); // Move to the left

                //First Section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                    x: -0.3,  // Move to the left
                    y: 0,
                    z: 0
                },"same").to(this.room.scale,{
                    x:0.04,  // Keep smaller
                    y:0.04,
                    z:0.04
                },"same")

                //Second Section
                this.secondMoveTimeLine = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale,{
                    x: 0.17,  // A bit more zoomed in
                    y: 0.17,
                    z: 0.17,
                },"2nd").to(this.room.position, {
                    x: 3.2,   // A bit more to the right
                    y: 0.3,   // Slightly higher
                    z: 0.8,   // More forward for better view
                },"2nd");
            },
            
            //Small Mobile (560px and below)
            "(max-width: 560px)": () => {
                //Resets - much smaller and properly centered
                this.room.scale.set(0.025, 0.025, 0.025) // Much smaller for tiny screens
                this.room.position.set(-1.2, 0, 0); // Way more to the left for proper centering

                //First Section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                    x: -1.0,  // Way more to the left for centering
                    y: 0,
                    z: 0
                },"same").to(this.room.scale,{
                    x: 0.025,  // Stay small
                    y: 0.025,
                    z: 0.025
                },"same")

                //Second Section - Keep the good zoom behavior
                this.secondMoveTimeLine = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub : 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale,{
                    x: 0.17,  // Same zoom as regular mobile
                    y: 0.17,
                    z: 0.17,
                },"2nd").to(this.room.position, {
                    x: 3.2,   // Same zoom position as regular mobile
                    y: 0.3,
                    z: 0.8,
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