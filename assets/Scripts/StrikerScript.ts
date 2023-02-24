import { _decorator, Component, Node, Input, tween, UITransform, Event, Vec3, Vec2, math, RigidBody, RigidBody2D, Slider, Label, AudioSource, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StrikerScript')
export class StrikerScript extends Component {

    @property({type:Node})
    StrikerGreen : Node;

    @property({type:Node})
    StrikerHoverRotating : Node;

    @property({type:Node})
    FrontDirectionArrow:Node;

    @property({type:Node})
    GreenArrow:Node;

    @property({type:Node})
    BackDirectionArrow:Node;

    @property({type:Node})
    TargetArea:Node;

    @property({type:Node})
    Slider:Node;

    @property({type:Node})
    P1ScoreNode:Node;
    
    @property({type:Node})
    P2ScoreNode:Node;

    Reposition=false;
    
    cursorposition:Vec3;
    cursormovePositiononX=0;
    cursormovePositiononY=0;
    StartingPosition:Vec3;


    P1PreviousScore=0;
    P2PreviousScore=0;
    
    P1NewScore=0;
    P2NewScore=0;

    onLoad(){
        this.FrontDirectionArrow.active=false;
        this.GreenArrow.active=false;
        this.BackDirectionArrow.active=false;
        this.TargetArea.active=false;
        this.P1ScoreNode.getComponent(Label).string=this.P1PreviousScore.toString();
        this.P2ScoreNode.getComponent(Label).string=this.P2PreviousScore.toString();

        this.node.getChildByName("Striker").name = "4";
        
        let distancedifferenceonX =0;
        let distancedifferenceonY =0;

        tween(this.StrikerHoverRotating)
            .by(1,{angle:-360})
            .repeatForever()
            .start();
        this.StartingPosition=this.node.getPosition();
        
        this.node.on(Input.EventType.TOUCH_START, (event)=>{
            this.cursorposition=event.getLocation();
            // this.StartingPosition=this.cursorposition
            console.log("Start position: ",this.cursorposition);
            this.MouseDirection();
        },this)
        
        this.node.on(Input.EventType.TOUCH_MOVE,(event)=>{
            this.cursormovePositiononX=event.getUILocation().x;
            this.cursormovePositiononY=event.getUILocation().y;
            console.log("Move Position: ", this.cursormovePositiononX,this.cursormovePositiononY);
            

            distancedifferenceonX = this.cursormovePositiononX-  this.cursorposition.x;
            distancedifferenceonY = this.cursormovePositiononY-  this.cursorposition.y;
            let eucladian = Math.sqrt((distancedifferenceonY*distancedifferenceonY)+(distancedifferenceonX*distancedifferenceonX))
            
            console.log("Scale : ",eucladian*0.0145);
            
            if(eucladian*0.0145<0.92)
            {
                this.TargetArea.setScale(eucladian*0.0145,eucladian*0.0145);
            }


            let anglebetween= (Math.atan2(distancedifferenceonY,distancedifferenceonX));
            console.log("angle: ",anglebetween);
            this.TargetArea.angle=anglebetween*180/Math.PI + 90;

            
            
            console.log("Difference: "+distancedifferenceonX + " and " + distancedifferenceonY);
            
            this.MouseDirection();
        },this)

        this.node.on(Input.EventType.TOUCH_CANCEL, (event)=>{
            this.cursormovePositiononX=event.getLocationX();
            this.cursormovePositiononY=event.getLocationY();
            distancedifferenceonX = this.cursormovePositiononX-  this.cursorposition.x;
            distancedifferenceonY = this.cursormovePositiononY-  this.cursorposition.y;
            this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(-distancedifferenceonX*0.2,-distancedifferenceonY*0.2)
            
            this.node.getComponent(AudioSource).play()
            this.StrikerGreen.active=false;
            this.StrikerHoverRotating.active=false;
            this.FrontDirectionArrow.active=false;
            this.GreenArrow.active=false;
            this.BackDirectionArrow.active=false;
            this.TargetArea.active=false;
            this.TargetArea.setScale(0,0);
            this.Reposition=true;
            
        },this)
        // this.node.on(Input.EventType.TOUCH_END, ()=>{
        //     this.StrikerHoverRotating.active=false;
        //     this.FrontDirectionArrow.active=false;
        //     this.GreenArrow.active=false;
        //     this.BackDirectionArrow.active=false;
        //     this.TargetArea.active=false;
        
        // },this)
        this.rePosition();
    }

    MouseDirection(){
            this.StrikerHoverRotating.active=false;
            this.FrontDirectionArrow.active=true;
            this.GreenArrow.active=true;
            this.BackDirectionArrow.active=true;
            this.TargetArea.active=true;        
    }

    rePosition() {
        this.schedule(() => {
          let velocity = this.node.getComponent(RigidBody2D).linearVelocity;
          if ((velocity.x <= 0 && velocity.y<=0) && this.Reposition == true) {
            this.node.setPosition(this.StartingPosition);
            this.node.getComponent(RigidBody2D).linearVelocity=new Vec2(0,0);
            this.Slider.getComponent(Slider).progress = 0.5;
            this.Reposition = false;
          }
        }, 1)
        this.StrikerGreen.active=true;
        this.StrikerHoverRotating.active=true;
      }

    
    BackButton()
    {
        director.loadScene("UserValidationScene")
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}

