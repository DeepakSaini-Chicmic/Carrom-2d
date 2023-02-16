import { _decorator, Component, Node, resources, Texture2D, Sprite, SpriteFrame, UITransform, tween, Vec3, Vec2, Vec4, } from 'cc';
const { ccclass, property } = _decorator;

import InstanceOfObjects, { LoadedResources } from './LoadedResources';

@ccclass('DynamicResourceLoading')
export class DynamicResourceLoading extends Component {

    // GLOBAL ARRAY FOR STORING FETCHED 
    spriteArr: SpriteFrame[];

    @property({type:Node})
    Loadingcircle:Node;
    
    onLoad() {
        
        let Background=LoadedResources.getInstance();
        let BackgroundAssets = Background.BackgroundresourceLoad("Assets/Carrom/Background")
        // let LoaderAssets = Background.LoaderresourceLoad("Assets/Carrom/LandingScreen/Loader")
        BackgroundAssets.then((BackgroundAssets)=>{
            Background.ArrayOfSprites.forEach(element => {
                console.log("Resources loaded!");
                if(element.name === "bg"){
                    this.node.getChildByName("Background").getComponent(Sprite).spriteFrame=element;
                }
            });
        })
        .catch(err=>console.log("Background not Loaded!"))
        
        // LoaderAssets.then((LoaderAssets)=>{
        //     Background.ArrayOfSprites.forEach(element => {
        //         console.log("Resources loaded!");
        //         if(element.name==="loading icon"){
        //             console.log("Loader Loaded")
        //             this.node.getChildByName("LoadingIcon").getComponent(Sprite).spriteFrame=element;
        //         }
        //         if(element.name==="loading icon- loader"){
        //             this.node.getChildByName("LoadingIconLoader").getComponent(Sprite).spriteFrame=element;
        //             let nodes = this.node.getChildByName("LoadingIconLoader");
        //             tween(nodes)
        //             .by(1,{angle : -360})
        //             .repeatForever()
        //             .start()
        //         }
        //     });
        // })
        // .catch(err=>console.log("Loader Not Loaded!"))
        tween(this.Loadingcircle)
                    .by(1,{angle : -360})
                    .repeatForever()
                    .start()
    }
        // console.log("Array Of Sprites Loaded:> ",Background.ArrayOfSprites[0]);


    start() {

    }

    update(deltaTime: number) {
        
    }
}

