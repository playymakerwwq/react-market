import * as React from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();
import userdata_style from "./component_static/userdata.module.scss"

type USERSETTINGS = {id: number, name: string, lastname: string, age: string, 
    phonenumber: string, street: string, email:string
}

type Props = {data: USERSETTINGS};
type State = {
                inputValueName: string, inputValueLastName: string, inputValueAge: string,
                inputValuePhonenumber: string, inputValueAdress: string, inputValueEmail: string
             }

let ToastShowing: any = null;

const saveToast = () => {
    if(!toast.isActive(ToastShowing)){
        ToastShowing = toast("Saved", {
            position: toast.POSITION.TOP_RIGHT, 
            closeButton: false, 
            progress: 0, 
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            transition: Slide,
            rtl: false,
            className: userdata_style.toastContainer,
            bodyClassName: userdata_style.toastBody,
            progressClassName: userdata_style.toastProgress,
        })
    }
}

export default class UserDataComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    state: State = {
        inputValueName: this.props.data.name,
        inputValueLastName: this.props.data.lastname,
        inputValueAge: this.props.data.age,
        inputValuePhonenumber: this.props.data.phonenumber,
        inputValueAdress: this.props.data.street,
        inputValueEmail: this.props.data.email
    }

    changeValue = (e: React.FormEvent<HTMLInputElement>, input: any) => {
        switch (input){
            case "user__name":
                this.setState({inputValueName: e.currentTarget.value})
                break
            case "user__lastname":
                this.setState({inputValueLastName: e.currentTarget.value})
                break
            case "user__age":
                this.setState({inputValueAge: e.currentTarget.value})
                break
            case "user__phonenumber":
                this.setState({inputValuePhonenumber: e.currentTarget.value})
                break
            case "user__street":
                this.setState({inputValueAdress: e.currentTarget.value})
                break
            case "user__email":
                this.setState({inputValueEmail: e.currentTarget.value})
                break
        }
            
    }
    
    render(){
        return(
            <div className={userdata_style.main__userinfo}>
                <div className={userdata_style.main__userinfo_content}>
                    <div className={userdata_style.main__userinfo_content_firsthalf}>
                        <div>
                            <label htmlFor='user__name'>Name: </label>
                            <input id="user__name" 
                            type='text' 
                            value={this.state.inputValueName} 
                            onChange={(e) => this.changeValue(e, "user__name")}
                            />
                        </div>
                        <div>
                            <label htmlFor="user__lastname">Last name: </label>
                            <input id="user__lastname" 
                            type="text" 
                            value={this.state.inputValueLastName} 
                            onChange={(e) => this.changeValue(e, "user__lastname")}
                            />
                        </div>
                        <div>
                        <label htmlFor="user__age">Age: </label>
                            <input id="user__age" 
                            type="text" 
                            value={this.state.inputValueAge}
                            onChange={(e) => this.changeValue(e, "user__age")}
                            />
                        </div>
                    </div>
                    <div className={userdata_style.main__userinfo_content_secondhalf}>
                        <div>
                            <div>
                                <label htmlFor='user__phonenumber'>Phone number: </label>
                                <input id="user__phonenumber" 
                                type='text' 
                                value={this.state.inputValuePhonenumber} 
                                onChange={(e) => this.changeValue(e, "user__phonenumber")}
                                />
                            </div>
                            <div>
                                <label htmlFor="user__street">Street: </label>
                                <input id="user__street" 
                                type="text" 
                                value={this.state.inputValueAdress}
                                onChange={(e) => this.changeValue(e, "user__street")}
                                />
                            </div>
                            <div>
                            <label htmlFor="user__email">Email: </label>
                                <input id="user__email" 
                                type="text" 
                                value={this.state.inputValueEmail}
                                onChange={(e) => this.changeValue(e, "user__email")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={userdata_style.main__userinfo_content_savebtn}>
                    <div onClick={() => {saveToast()}}>
                        <span>save</span>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        )
    }
}