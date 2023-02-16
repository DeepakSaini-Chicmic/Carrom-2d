import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

import { PUCKTYPE } from './ConstantsScript';

@ccclass('PlucksLoadingScript')
export class PlucksLoadingScript extends Component {
    
    @property({type:SpriteFrame})
    Black_Pluck : SpriteFrame = null;

    @property({type:SpriteFrame})
    Red_Pluck : SpriteFrame = null;

    @property({type:SpriteFrame})
    White_Pluck : SpriteFrame = null;
    
    start() {

    }

    SetPuck(Which_Puck : PUCKTYPE){
        switch(Which_Puck){
            case PUCKTYPE.BLACK :
            {
                this.node.getComponent(Sprite).spriteFrame=this.Black_Pluck;
                break;
            }
            
            case PUCKTYPE.RED : 
            {
                this.node.getComponent(Sprite).spriteFrame=this.Red_Pluck;
                break;
            }
            
            case PUCKTYPE.WHITE:
            {
                this.node.getComponent(Sprite).spriteFrame=this.White_Pluck;
                break;
            }
        }
    }

    update(deltaTime: number) {
        
    }
}

