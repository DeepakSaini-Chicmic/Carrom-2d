import { _decorator, Component, Node, Label, Input, EditBox, director, AudioClip, AudioSource, System, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('XHR')
export class XHR extends Component {
    @property({type:Node})
    EmailID :Node;
    @property({type:Node})
    Password :Node;

    @property({type:Node})
    errorlabel : Node;
    
    // sendHTTPrequest = (method,url,data) =>{
    //     const promise = new Promise((resolve,reject)=>{
    //         const xhr = new XMLHttpRequest();
    //         xhr.open(method,url);

    //         xhr.responseType = 'json';


           
    //             xhr.setRequestHeader('Content-Type','application/json')
    //             xhr.setRequestHeader('apiKey','HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR')
            

    //         // xhr.onload = () => {
    //         //     resolve(xhr.response);
    //         // }
    //         xhr.onreadystatechange = ()=>{
    //             if(xhr.readyState == 4)
    //             {
    //                 console.log(xhr.response);
                    
    //             }
    //         }

    //         console.log(JSON.stringify(data));
    //         let d = JSON.stringify(data)
    //         xhr.send(d);
    //     });
    //     return promise;
    // }
    
    sendHTTPrequest(){
        let Method1 = 'POST';
        let Method2 = 'GET'; 
        let BaseUrl = 'http://3.18.231.59:4000/'
        let version = 'v1'
        let loginurl = '/user/login'
        let registerurl = "/user/register";

        // let completeloginurl = BaseUrl+version+loginurl
        let data = {
            email : this.EmailID.getComponent(Label).string,
            password : this.Password.getComponent(EditBox).string
        }

        let check = this.CheckValidations(data)
        if(check == true)
        {
            const xhr = new XMLHttpRequest();

            xhr.open(Method1 ,  BaseUrl+version+loginurl)

            xhr.setRequestHeader('Content-Type','application/json')
            xhr.setRequestHeader('apiKey','HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR')

            xhr.onreadystatechange = () => {
                if(xhr.readyState ==4){
                    console.log(xhr.response);
                }
            }
            console.log(JSON.stringify(data));
            let stringed_data = JSON.stringify(data);
            xhr.send(stringed_data);
            sys.localStorage.setItem("UserData",stringed_data);

            if(data.email == "harpinder.singh@chicmic.co.in" && data.password == "12345678")
            {
                director.loadScene("LoadingScene");
            }
            else 
            {
                this.errorlabel.getComponent(Label).string="User Does Not Exist";
                this.resetlabel();
            }
        }
    }

    CheckValidations(data:{email : string , password : string}){
        const checkemailid = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
        // const checkemailid = /^[A-Za-z0-9]{3,30}[0-9._]{0,10}[A-Za-z]{0,30}[@][A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
        const checkpw = /^[#\w@_-]{8,20}$/;
        console.log("Email : ",data.email, checkemailid.test(data.email));
        
        if(!checkemailid.test(data.email))
        {
            this.errorlabel.getComponent(Label).string = "Invalid Email Id";
            this.resetlabel();
            return false;
        }

        if(data.password.length<8)
        {
            this.errorlabel.getComponent(Label).string = "Password Length is less than 8 characters";
            this.resetlabel();
            return false;
        }
        if(!checkpw.test(data.password))
        {
            this.errorlabel.getComponent(Label).string = "Password Must Contain : At least 1 Special Character, 1 small character, 1 Capital Character , 1 Number";
            this.resetlabel();
            return false;
        }
        if(data.password.length>20)
        {
            this.errorlabel.getComponent(Label).string = "Password Length is less than 20 characters";
            this.resetlabel();
            return false;
        }
        return true;
    }

    resetlabel(){
        setTimeout(() => {
            this.errorlabel.getComponent(Label).string = "";
        }, 2000);
    }
    // sendData = ()=>{
    //     this.sendHTTPrequest('POST','http://3.18.231.59:4000/v1/user/login',{
    //         email : this.EmailID.getComponent(Label).string,
    //         password : this.Password.getComponent(EditBox).string
    //     }).then((responsedata:any) => {
    //         console.log(JSON.parse(responsedata).statusCode);
    //         if(JSON.parse(responsedata).statusCode==200)
    //         {
    //             director.loadScene("GamePlayScene")
    //         }
    //     })
    // }

    onLoad(){
        this.node.on(Input.EventType.MOUSE_DOWN,()=>{ 
            this.sendHTTPrequest()
            this.node.getComponent(AudioSource).play()
    },this)
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}

