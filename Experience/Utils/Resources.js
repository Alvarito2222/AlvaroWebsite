import * as THREE from 'three';
import EventEmitter from "events";
import Experience from "../Experience.js";
import Assets from "./Assets.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
 
export default class Resources extends EventEmitter{

    constructor() {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.Assets = Assets;
        
        this.items = {};
        this.queue = this.Assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }
    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

    }
    startLoading(){
        for(const asset of this.Assets){
            if(asset.type==="glbModel"){
                this.loaders.gltfLoader.load(asset.path,(file)=>{
                    this.singleAssetLoaded(asset, file);
                });
            }//else if(asset.type ===)
        }

    }
    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;

        

        if(this.loaded == this.queue){

            
            this.emit("ready");
        }
    }
}