import {
  _decorator,
  Component,
  Node,
  resources,
  SpriteFrame,
  Sprite,
} from "cc";
const { ccclass, property } = _decorator;
@ccclass("LoadedResources")
export class LoadedResources extends Component {

  
  ArrayOfSprites: SpriteFrame[] = [];
  private static instance: LoadedResources = null;
  private LoadedResources() {}
  static getInstance(): LoadedResources {
    if (!this.instance) {
      this.instance = new LoadedResources();
      //   this.instance.resourceLoad()
    }
    return LoadedResources.instance;
  }

  BackgroundresourceLoad(folder: string) {
    return new Promise((resolve, reject) => {
      resources.preloadDir("Assets/Carrom/Background");
      resources.loadDir(
        "Assets/Carrom/Background",
        SpriteFrame,
        (err: Error, assets: SpriteFrame[]) => {
          if (err) {
            reject(err);
          } else {
            this.ArrayOfSprites = assets;
          }
          resolve(this.ArrayOfSprites);
        }
      );
    });
  }

//   LoaderresourceLoad(folder: string) {
//     return new Promise((resolve, reject) => {
//         resources.preloadDir("Assets/Carrom/LandingScreen");
//         resources.loadDir(
//         "Assets/Carrom/LandingScreen",
//         SpriteFrame,
//         (err: Error, assets: SpriteFrame[]) => {
//           if (err) {
//             reject(err);
//           } else {
//             this.ArrayOfSprites = assets;
//           }
//           resolve(this.ArrayOfSprites);
//         }
//       );
//     });
//   }
  // resources.preloadDir(folder, SpriteFrame)
  // else{

  // resources.loadDir("folder",(err:Error, assets:SpriteFrame[])=>{if(err){
  //     reject(err);

  //     })
  //     => {
  //       //   const spriteFrame = new SpriteFrame();
  //       console.log(this.spritesArray);
  // }

  //   this.node.getComponent(Sprite).spriteFrame = assets[0];
  //     });
  //   }
  //   indexof(txt): SpriteFrame {
  //     // for(let i=0;i<this.spritesArray.length();i++){
  //     return;
  //   }

  start() {}

  update(deltaTime: number) {}
}
let InstanceOfObjects = LoadedResources.getInstance();

export default InstanceOfObjects;
