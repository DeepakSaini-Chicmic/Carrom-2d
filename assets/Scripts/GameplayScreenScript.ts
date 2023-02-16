import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  UITransform,
  Vec3,
  JsonAsset,
} from "cc";
import { PUCKTYPE } from "./ConstantsScript";
import { PlucksLoadingScript } from "./PucksLoadingScript";
const { ccclass, property } = _decorator;

@ccclass("MenuScreenScript")
export class MenuScreenScript extends Component {
  @property({ type: Prefab })
  PuckPrefab: Prefab;

  @property({ type: JsonAsset })
  PuckPositioning: JsonAsset;

  onLoad() {
    this.createPuck(9, PUCKTYPE.BLACK);
    this.createPuck(1, PUCKTYPE.RED);
    this.createPuck(9, PUCKTYPE.WHITE);
    let pucks = this.node
      .getChildByName("CarromBoard_Nova")
      .children.slice(
        1,
        this.node.getChildByName("CarromBoard_Nova").children.length
      );
    this.arrangePucks(pucks, -43, 39.5);
  }

  createPuck(NumberOfPucksToAdd:number, TypeOfPuck: PUCKTYPE) {
    for (let i = 0; i < NumberOfPucksToAdd; i++) {
      let newPuck = instantiate(this.PuckPrefab);
      newPuck.getComponent(PlucksLoadingScript).SetPuck(TypeOfPuck);
      newPuck.getComponent(UITransform).setContentSize(20, 20);
      this.node.getChildByName("CarromBoard_Nova").addChild(newPuck);
      console.log("Puck Added !");
    }
  }


  arrangePucks(PuckToCreate: object, PositionX: number, PositionY: number) {    
    let StartingPositionOnX = PositionX;
    let StartingPositionOnY = PositionY;
    let StartingPositionOnZ = 0;

    let SizeOfVirtualBox = 100; 
    let WidthOfPuck = PuckToCreate[0].getComponent(UITransform).width;
    // let puckJson = this.PuckPositioning.json.Pattern;
    let PuckJson = this.PuckPositioning.json.Pattern;
    let StartingIndexOfBlackPuck = 0;
    let StartingIndexOfRedPuck = 9;
    let StartingIndexOfWhitePuck = 10;
    let NoOfPucksInARow = 3; 
    let CheckIfPucksIncreasing = true; 

    for (let row = 0; row < 5; row++) {
        let gap = SizeOfVirtualBox - NoOfPucksInARow * WidthOfPuck; 
        let x = StartingPositionOnX + gap / 2; 
        for (let col = 0; col < NoOfPucksInARow; col++) {
            if(PuckJson[row][col]==="B")
            {
            PuckToCreate[StartingIndexOfBlackPuck].setPosition(new Vec3(x, StartingPositionOnY, StartingPositionOnZ));
            x += 23; 
            StartingIndexOfBlackPuck++;
            }
            else if(PuckJson[row][col]==="R")
            {
            PuckToCreate[StartingIndexOfRedPuck].setPosition(new Vec3(x, StartingPositionOnY, StartingPositionOnZ));
            x += 23; 
            // StartingIndexOfBlackPuck++;
            }
            else if(PuckJson[row][col]==="W")
            {
            PuckToCreate[StartingIndexOfWhitePuck].setPosition(new Vec3(x, StartingPositionOnY, StartingPositionOnZ));
            x += 23; 
            StartingIndexOfWhitePuck++;
            }
        }
        StartingPositionOnY -= 21; 

        if (NoOfPucksInARow === 5) CheckIfPucksIncreasing = false; 

        if (CheckIfPucksIncreasing) NoOfPucksInARow++;
        else NoOfPucksInARow--;
    }
}

  start() {}

  update(deltaTime: number) {}
}
