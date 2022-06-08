import * as React from "react";
import usercontent_style from './component_static/usercontent.module.scss'
import jsonData from "./interfaces/Clients.json"

let imageBackgroundPosY = 0;
let timerdown: NodeJS.Timer;
let timerup: NodeJS.Timer;

type userComponentState = {backgroundImage: File, backgroundImageUrl: string, backgrondImageHeight: number,
                           avatarImage: File; avatarImageUrl: string}
type userProps = {name: string, avatar: string, background: string}

export default class UserComponent extends React.Component<userProps, userComponentState> {
  // private buttonsRef: React.RefObject<HTMLInputElement>;
  constructor (props: userProps){
    super(props);
    // this.buttonsRef = React.createRef();
  }

  state: userComponentState = {
    backgroundImage: null,
    backgroundImageUrl: null,
    backgrondImageHeight: 0,
    avatarImage: null,
    avatarImageUrl: null,
  }

  getCookie = (cName: string) => {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }

  setCookieValue = (variable: string, value: string, expDays: number) => {
    let date = new Date()
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
    const expires = "expires=" + date.toUTCString();
    document.cookie = variable + "=" + value + "; " + expires + "; path=/"
  }

  moveBackgroundImageUpLoop = () => {
    let image = document.getElementsByClassName(`${usercontent_style.user__content_background_image} image`)[0] as HTMLElement;
  
    if (imageBackgroundPosY < 0){
      imageBackgroundPosY += 1;
      image.style.objectPosition = `0px ${imageBackgroundPosY}px`
    }
  }
  
   moveBackgroundImageDownLoop = () => {
    let image = document.getElementsByClassName(`${usercontent_style.user__content_background_image} image`)[0] as HTMLElement;

    if (imageBackgroundPosY > -this.state.backgrondImageHeight){
      imageBackgroundPosY -= 1;
      image.style.objectPosition = `0px ${imageBackgroundPosY}px`
    }
  }
  
  moveBackgroundImageStop = () => {
    if (timerdown){
      clearInterval(timerdown)
      timerdown = null;
    }
    if (timerup){
      clearInterval(timerup)
      timerup = null;
    }
  }
  
   moveBackgroundEvent = () =>{
    let buttonDown = document.getElementById(`${usercontent_style.user__content_background_image_buttons} button_below`);
    let buttonUp = document.getElementById(`${usercontent_style.user__content_background_image_buttons} button_higher`);
    let buttonSave = document.getElementById(`${usercontent_style.user__content_background_image_buttons} button_save`)
    let buttons = document.getElementsByClassName(`${usercontent_style.user__content_background_image_buttons}`)[0] as HTMLElement;

    buttonDown.onmousedown = () => {
      if (timerdown) return;
      timerdown = setInterval(this.moveBackgroundImageDownLoop, 5)
      buttonSave.style.display = "table-cell"
    }
  
    buttonDown.onmouseup = () => {
      this.moveBackgroundImageStop();
    }
  
    buttonDown.onmouseleave = () => {
      this.moveBackgroundImageStop();
    }
  
    buttonUp.onmousedown = () => {
      if (timerup) return;
      timerup = setInterval(this.moveBackgroundImageUpLoop, 5)
      buttonSave.style.display = "table-cell"
    }
  
    buttonUp.onmouseup = () => {
      this.moveBackgroundImageStop();
    }
  
    buttonUp.onmouseleave = () => {
      this.moveBackgroundImageStop();
    }

    buttonSave.onclick = () => {
      buttonSave.style.display = "none"
      buttons.style.display = "none"
    }
  }

  changeBackgroundImagePosShowButtons = () => {
    let background_image = document.getElementsByClassName(`${usercontent_style.user__content_background_image} image`)[0] as HTMLImageElement
    let buttons = document.getElementsByClassName(`${usercontent_style.user__content_background_image_buttons}`)[0] as HTMLElement;
    buttons.style.display = buttons.style.display == "none" || buttons.style.display == "" ? "flex" : "none"
    // buttons.style.position = buttons.style.position == "none" || buttons.style.position == "" ? "fixed" : "none"

    if (background_image.naturalWidth == background_image.naturalHeight){
      this.setState({
        backgrondImageHeight: 1505
      })
    } else {
      this.setState({
        backgrondImageHeight: 670
      })
    }
  }

  onImageChange = (e: React.FormEvent<HTMLInputElement>, isBackground: boolean) => {
    if (isBackground) {
      this.setState({
        backgroundImage: e.currentTarget.files[0],
        backgroundImageUrl: URL.createObjectURL(e.currentTarget.files[0]),
      }, () => {this.saveImage(true)});
    } else {
      this.setState({
        avatarImage: e.currentTarget.files[0],
        avatarImageUrl: URL.createObjectURL(e.currentTarget.files[0])
      }, () => {this.saveImage(false)})
    }
  }
  
  saveImage = (isBackground: boolean) => {
    let buttons = document.getElementsByClassName(`${usercontent_style.user__content_background_image_buttons}`)[0] as HTMLElement;

    let image = isBackground == true ? 
      document.getElementsByClassName(`${usercontent_style.user__content_background_image} image`)[0] as HTMLImageElement : 
      document.getElementsByClassName(`${usercontent_style.user__content_avatar_image} avatar_image`)[0] as HTMLImageElement
    buttons.style.display = "none"

    if (isBackground){
      if(!this.state.backgroundImage){
        return
      }
      const formData = new FormData();
  
      formData.append(
        "myFile",
        this.state.backgroundImage,
        this.state.backgroundImage.name
      );
  
      imageBackgroundPosY = 0
      image.src = this.state.backgroundImageUrl
      image.style.objectPosition = "0px 0px"

    } else {
      if(!this.state.avatarImage){
        return
      }
      const formData = new FormData();
  
      formData.append(
        "myFile",
        this.state.avatarImage,
        this.state.avatarImage.name
      );
      // let pos = jsonData.users.map((e) => e.id).indexOf(Number(localStorage.getItem('user_id')))

      image.src = this.state.avatarImageUrl
      image.style.objectPosition = "50% 50%"
    }
  }

  componentDidMount(){
    let image = document.getElementsByClassName(`${usercontent_style.user__content_avatar_image} avatar_image`)[0] as HTMLImageElement
    this.setCookieValue('avatar_image', image.src, 30)
    this.moveBackgroundEvent();
  }

  componentDidUpdate(){
    this.moveBackgroundEvent();
  }

  render() {
    return (  
        <div className={usercontent_style.user__content}>
          <div className={`${usercontent_style.user__content_background_image}`}>
            <img 
            src={this.props.background} 
            className={`${usercontent_style.user__content_background_image} image`}
            onClick={this.changeBackgroundImagePosShowButtons}>
            </img>
            <div className={`${usercontent_style.user__content_background_image_buttons}`}>
              <button id={`${usercontent_style.user__content_background_image_buttons} button_below`}>below</button>
              <button id={`${usercontent_style.user__content_background_image_buttons} button_higher`}>higher</button>
              <label htmlFor="upload_new_background" >upload new</label>
              <input id="upload_new_background" 
              type="file" 
              onChange={(e) => this.onImageChange(e, true)} 
              accept=".png, .jpg, .jpeg, .gif"
              hidden/>
              <button id={`${usercontent_style.user__content_background_image_buttons} button_save`} style={{display: "none"}}>save</button>
            </div>
          </div>
          <div className={`${usercontent_style.user__content_avatar_image}`}>
            <div>
              
              <label htmlFor="upload_new_avatar">
                <img 
                src={this.getCookie('avatar_image')}
                className={`${usercontent_style.user__content_avatar_image} avatar_image`}
                />
              </label>
              <input id="upload_new_avatar" 
              type="file" 
              onChange={(e) => this.onImageChange(e, false)} 
              accept=".png, .jpg, .jpeg, .gif"
              hidden/>
            </div>
          </div>
          <div className={`${usercontent_style.user__content_name}`}>
            <div>
              <span>{this.props.name}</span>
            </div>
          </div>
        </div>
      );
    }
}