import { _decorator, Component, Node, JsonAsset, Prefab, instantiate, Label, ScrollView, Input, Vec2, UITransform, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CountryScript')
export class CountryScript extends Component {
    
    @property({type:JsonAsset})
    CountriesData:JsonAsset ;

    @property({type:Prefab})
    CountriesPrefab:Prefab;

    @property({type:Node})
    DropDownArrow:Node;

    @property({type:Node})
    SelectedCountryLabel:Node;

    @property({type:Node})
    PlaceholderLabel :Node
    onLoad(){
        this.node.active=false;

        let Items=this.CountriesData.json.Countries;
        for(let i =0 ; i < Items.length;i++)
        {
            let item = instantiate(this.CountriesPrefab)
            item.getComponent(Label).string = Items[i].Name;
            this.node.getComponent(ScrollView).content.addChild(item);
            item.on(Input.EventType.MOUSE_DOWN,this.whichcountry,this);
        }        

        this.DropDownArrow.on(Input.EventType.MOUSE_DOWN,()=>{
            if(this.node.active==false){
                this.node.active=true;
                console.log("Drop down is Down");
            }
            else if(this.node.active==true){
                this.node.active=false;
                console.log("Drop down is Up");
            }
        })
    }
    
    whichcountry(target){
        let selectedcountry = target.target.getComponent(Label).string;
        this.SelectedCountryLabel.active=true;
        this.PlaceholderLabel.active=false;
        this.SelectedCountryLabel.getComponent(Label).string=selectedcountry;
        this.node.active=false;
    }
    onEnable(){
        // this.node.active=false;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

