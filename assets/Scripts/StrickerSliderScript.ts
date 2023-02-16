import { _decorator, Component, Node,Slider, Vec3, UITransform, Input, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StrickerSlider')
export class StrickerSlider extends Component {
    
    @property({type:Node})
    Striker:Node;

    @property({type:Node})
    HoverGreen:Node;



    // @property({type:Node})
    // StrickerHover : Node;

    // previousPosition=this.Striker.getPosition()

    onLoad()
    {   
        
        // this.Striker.setPosition(0,-112);
        // this.node.children[0].setPosition(0,0);
        let StrikerPosition = this.Striker.getPosition();
        this.node.on(Input.EventType.TOUCH_START,()=>{
            this.HoverGreen.getComponent(UITransform).width=45;
            this.HoverGreen.getComponent(UITransform).height=45;
            this.Striker.getChildByName("hover_rotating").getComponent(UITransform).setContentSize(25,38);
            
        })
        
        this.node.on('slide',()=>{
            // let SliderStriker=this.node.getComponent(Slider).progress
            // this.Striker.children[0].getComponent(UITransform).width=45;
            // this.Striker.children[0].getComponent(UITransform).height=45;
            this.Striker.setPosition(
                170*(this.node.getComponent(Slider).progress-0.5),
                this.Striker.getPosition().y)
        },this)
        this.node.on(Input.EventType.TOUCH_CANCEL,()=>{
            this.HoverGreen.getComponent(UITransform).width=60;
            this.HoverGreen.getComponent(UITransform).height=60;
            this.Striker.getChildByName("hover_rotating").getComponent(UITransform).setContentSize(32,45);
        })
        this.node.on(Input.EventType.TOUCH_END,()=>{
            this.HoverGreen.getComponent(UITransform).width=60;
            this.HoverGreen.getComponent(UITransform).height=60;
            this.Striker.getChildByName("hover_rotating").getComponent(UITransform).setContentSize(32,45);
        })
    }
    start() {

    }

    update(deltaTime: number) {

    }
}

