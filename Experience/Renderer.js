import Experience from "./Experience.js";

import * as THREE  from"three";

export default class Renderer{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.camera = this.experience.camera;
        
        

        this.setRenderer();
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,

        });
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.renderer.gammaOutput = true; // Ensures that colors are correctly gamma-corrected
        this.renderer.gammaFactor = 2.2;
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);


    }
    update(){
       // this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.orthograpicCamera);
    
       /* // Enable the scissor test
        this.renderer.setScissorTest(true);
    
        // Set the scissor rectangle
        this.renderer.setScissor(
            this.sizes.width - this.sizes.width / 3,
            this.sizes.height - this.sizes.height / 3,
            this.sizes.width / 3,
            this.sizes.height / 3
        );
    
        // Set the viewport
        this.renderer.setViewport(
            this.sizes.width - this.sizes.width / 3,
            this.sizes.height - this.sizes.height / 3,
            this.sizes.width / 3,
            this.sizes.height / 3
        );
    
        // Render the part of the scene inside the scissor rectangle
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
    
        // Disable the scissor test
        this.renderer.setScissorTest(false);*/
    }
    

}