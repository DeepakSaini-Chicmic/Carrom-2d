import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    private static _instance:AudioManager = null;
    private _audioSource: AudioSource = null!;

    public static getInstance() {
        if (!AudioManager._instance) {
            AudioManager._instance = new AudioManager();
        }
        return AudioManager._instance;
    }

    init(audiosource:AudioSource){
        this._audioSource = audiosource;
    }

    playMusic(){
        this._audioSource.play();
    }
    
    StopMusic()
    {
        this._audioSource.stop();
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }

}
