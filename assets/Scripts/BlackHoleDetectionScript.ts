import {
  _decorator,
  Component,
  Node,
  Collider2D,
  Contact2DType,
  RigidBody2D,
  CircleCollider2D,
  tween,
  Vec2,
  Vec3,
  Label,
  AudioSource,
} from "cc";
import { PlucksLoadingScript } from "./PucksLoadingScript";
import { AudioManager } from "../Audios/AudioManager";
const { ccclass, property } = _decorator;

@ccclass("StrikerPhysics")
export class StrikerPhysics extends Component {
  @property({ type: Node })
  Hole1: Node;

  @property({ type: Node })
  Hole2: Node;

  @property({ type: Node })
  Hole3: Node;

  @property({ type: Node })
  Hole4: Node;

  @property({ type: Node })
  Player1ScoreNode: Node;

  @property({ type: Node })
  Player2ScoreNode: Node;

  // @property({type:Node})
  // Striker:Node;
  WhoseChance = 1;

  Player1Score = 0;
  Player2Score = 0;
  PreviousScore = 0;

  Score1 = 0;
  chance = 0;

  onLoad() {
    let audioobj = AudioManager.getInstance();
    let audiosrc = this.node.getComponent(AudioSource);
    audioobj.init(audiosrc);
    let hole1 = this.Hole1.getComponent(Collider2D);
    let hole2 = this.Hole2.getComponent(Collider2D);
    let hole3 = this.Hole3.getComponent(Collider2D);
    let hole4 = this.Hole4.getComponent(Collider2D);
    if (hole1) {
      // console.log();
      hole1.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
        this.PreviousScore = this.Score1;
        if (other.node.name === "Striker") {
          // this.Striker.setPosition(-153,153);
          // console.log(other.node.getComponent(PlucksLoadingScript).puckNodeType)
          console.log("collsion detected with hole 1: ", other.node.name);
          this.Player1ScoreAdded(other.node.name);
          if (this.Score1 > 0) {
            this.Score1 -= 10;
          }
        } else if (other.node.name === "Pucks") {
          audioobj.playMusic();
          // console.log(other.node.name);
          console.log(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
          console.log("collsion detected with hole 1 : ", other.node.name);
          console.log(
            "component",
            other.node.getComponent(CircleCollider2D).enable
          );

          other.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
          other.node.getComponent(RigidBody2D).sleep();

          tween(other.node)
            .to(0.1, { position: new Vec3(-153, 153, 0) })
            .start();

          this.Destroy(other.node);
          // console.log("Name is", other.node.getComponent(PlucksLoadingScript).puckNodeType);
          this.Score1 = this.Player1ScoreAdded(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
        }
        this.Player1ScoreNode.getComponent(Label).string =
          this.Score1.toString();
      });
    }
    if (hole2) {
      // console.log();
      hole2.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
        if (other.node.name === "Striker") {
          // this.Striker.setPosition(-153,153);
          // console.log(other.node.getComponent(PlucksLoadingScript).puckNodeType)
          console.log("collsion detected with hole 2: ", other.node.name);
          if (this.Score1 > 0) {
            this.Score1 -= 10;
          }
        } else if (other.node.name === "Pucks") {
          audioobj.playMusic();
          // console.log(other.node.name);
          console.log(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
          console.log("collsion detected with hole 2 : ", other.node.name);
          other.node.getComponent(RigidBody2D).sleep();

          tween(other.node)
            .to(0.1, { position: new Vec3(153, 153, 0) })
            .start();
          other.node.getComponent(RigidBody2D).sleep();
          this.Destroy(other.node);
          this.Score1 = this.Player1ScoreAdded(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
        }
        this.Player1ScoreNode.getComponent(Label).string =
          this.Score1.toString();
      });
    }
    if (hole3) {
      // console.log();
      hole3.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
        if (other.node.name === "Striker") {
          // this.Striker.setPosition(-153,153);
          // console.log(other.node.getComponent(PlucksLoadingScript).puckNodeType)
          console.log("collsion detected with hole 3: ", other.node.name);
          if (this.Score1 > 0) {
            this.Score1 -= 10;
          }
        } else if (other.node.name === "Pucks") {
          audioobj.playMusic();
          // console.log(other.node.name);
          console.log(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
          console.log("collsion detected with hole 3 : ", other.node.name);
          other.node.getComponent(RigidBody2D).sleep();

          tween(other.node)
            .to(0.1, { position: new Vec3(-153, -153, 0) })
            .start();
          other.node.getComponent(RigidBody2D).sleep();
          this.Destroy(other.node);
          this.Score1 = this.Player1ScoreAdded(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
        }
        this.Player1ScoreNode.getComponent(Label).string =
          this.Score1.toString();
      });
    }
    if (hole4) {
      // console.log();
      hole4.on(Contact2DType.BEGIN_CONTACT, (self, other) => {
        if (other.node.name === "Striker") {
          // this.Striker.setPosition(153,-153);
          // console.log(other.node.getComponent(PlucksLoadingScript).puckNodeType)
          console.log("collsion detected with hole 4");
          console.log(other.node.name);
          if (this.Score1 > 0) {
            this.Score1 -= 10;
          }
        } else if (other.node.name === "Pucks") {
          audioobj.playMusic();
          // console.log(other.node.name);
          console.log(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
          console.log("collsion detected with hole 4");
          other.node.getComponent(RigidBody2D).sleep();

          tween(other.node)
            .to(0.1, { position: new Vec3(153, -153, 0) })
            .start();
          other.node.getComponent(RigidBody2D).sleep();
          this.Destroy(other.node);
          this.Score1 = this.Player1ScoreAdded(
            other.node.getComponent(PlucksLoadingScript).puckNodeType
          );
        }
        this.Player1ScoreNode.getComponent(Label).string =
          this.Score1.toString();
      });
    }

    if (this.PreviousScore < this.Score1) {
        if(this.chance==0) this.chance = 0;
        else this.chance=1;
      console.log("This is Chance: ", this.chance);
    } 
    else if (this.PreviousScore >= this.Score1){
      if(this.chance==0) this.chance = 1;
      else this.chance=0;
      console.log("This is Chance: ", this.chance);
    }
  }

  Destroy(destroying) {
    destroying.setPosition(153, -153);
    destroying.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
    setTimeout(() => {
      destroying.destroy();
    });
  }

  Player1ScoreAdded(HowMuchtoScore: Number) {
    if (HowMuchtoScore == 1) {
      this.Player1Score += 10;
    }
    if (HowMuchtoScore == 2) {
      this.Player1Score += 20;
    }
    if (HowMuchtoScore == 3) {
      this.Player1Score += 50;
    }
    return this.Player1Score;
  }

  start() {}

  update(deltaTime: number) {
  }
}
