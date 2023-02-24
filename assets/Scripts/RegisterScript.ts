import { _decorator, Component, Node, Input, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RegisterScript')
export class RegisterScript extends Component {
    @property({type : [Node]})
    fields : Node[] = [];
    
    onLoad(){
        this.node.on(Input.EventType.MOUSE_DOWN,this.CheckDetails,this)
        
    }


    CheckDetails(){
        let Name = this.fields[0].getComponent(Label).string;
        let Age = this.fields[1].getComponent(Label).string;
        let EID = this.fields[2].getComponent(Label).string;
        let PW = this.fields[3].getComponent(Label).string;
        let CPW = this.fields[4].getComponent(Label).string;
        let Cont = this.fields[5].getComponent(Label).string;
    
        console.log("This is ",Name);
        console.log("Age is ",Age);
        console.log("Country is : " , Cont);
        console.log("Email Id is ",EID);
        console.log("Password is ",PW);
        console.log("Confirmed Password :- ", CPW);
        
        if(PW!=CPW){
            console.log("Passwords Not Match! Re-Enter Password! ");
        }
        else{
            console.log("Passwords Matched! ");
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

