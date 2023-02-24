import { _decorator, Component, Node, Event, Input, game, tween, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FormValidation')
export class FormValidation extends Component {
    @property({type:Node})
    LoginButton:Node
    
    @property({type:Node})
    Buttons:Node

    @property({type:Node})
    RegisterButton:Node

    @property({type:Node})
    QuitButton:Node

    @property({type:Node})
    BackButton:Node

    @property({type:Node})
    BackgroundRays:Node;

    @property({type:Node})
    Light:Node

    onLoad(){
        this.LoginButton.on(Input.EventType.MOUSE_DOWN,this.Login,this)
        this.RegisterButton.on(Input.EventType.MOUSE_DOWN,this.Register,this)
        this.QuitButton.on(Input.EventType.MOUSE_DOWN,()=>game.end(),this)
        this.BackButton.on(Input.EventType.MOUSE_DOWN,this.activeall,this)
        tween(this.BackgroundRays)
        .by(0.2,{angle:-10})
        .repeatForever()
        .start()
    }

    Login(){
        this.node.children[3].active=true;
        this.Buttons.active=false;
        this.BackButton.active=true;
    }
    
    Register(){
        this.node.children[4].active=true;
        this.Buttons.active=false;
        this.BackButton.active=true;
    }

    activeall(){
        this.node.children[3].active=false;
        this.node.children[4].active=false;
        this.Buttons.active=true;
        this.BackButton.active=false;
    }
    start() {

    }
    onEnable(){
        this.Buttons.active=true;
        this.node.children[2].active=false;
        this.node.children[3].active=false;
        this.BackButton.active=false;
    }

    update(deltaTime: number) {
        
    }
}

