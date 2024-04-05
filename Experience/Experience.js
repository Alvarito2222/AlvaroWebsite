import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import Assets from './Utils/Assets';

import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Theme from './Theme.js';
import World from './World/World';
import Controls from './World/Controls';


export default class Experience{
    static instance;
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(Assets);
        this.theme = new Theme();
        this.world = new World();
        this.controls = new Controls();


        this.time.on("update", ()=>{
            this.update();
        });
        this.sizes.on("resize", ()=>{
            this.resize();
        });
        
    }

        
    update(){
        this.camera.update();
        this.renderer.update();
        this.world.update();
        this.controls.update();
       
    }
    resize(){
        this.camera.resize();
        this.renderer.resize();
}
}