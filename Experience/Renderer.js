import Experience from "./Experience.js";

import * as THREE  from"three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

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
            alpha: true,
            powerPreference: "high-performance"
        });
        
        // Modern Three.js settings
        this.renderer.useLegacyLights = false;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        // Enhanced tone mapping for better visuals
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        // High quality shadows
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Better rendering settings
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        
        // Clear color for better contrast
        this.renderer.setClearColor(new THREE.Color('#0a0a0a'), 0);
        
        this.setPostProcessing();
    }

    setPostProcessing() {
        // Create effect composer
        this.effectComposer = new EffectComposer(this.renderer);
        
        // Render pass
        this.renderPass = new RenderPass(this.scene, this.camera.orthograpicCamera);
        this.effectComposer.addPass(this.renderPass);
        
        // Subtle bloom effect (reduced since we have brighter lights)
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.sizes.width, this.sizes.height),
            0.15,  // reduced strength
            0.6,   // reduced radius
            0.2    // higher threshold
        );
        this.effectComposer.addPass(this.bloomPass);
        
        // Output pass for proper color space
        this.outputPass = new OutputPass();
        this.effectComposer.addPass(this.outputPass);
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        
        // Update post-processing
        this.effectComposer.setSize(this.sizes.width, this.sizes.height);
        this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        
        // Update bloom pass
        this.bloomPass.resolution.set(this.sizes.width, this.sizes.height);
    }
    update(){
        // Use post-processing instead of direct rendering
        this.effectComposer.render();
    }
    

}