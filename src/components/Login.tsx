import * as React from 'react'
import Clients from "./interfaces/Clients"

import testavatar from './component_static/images/testavatar2.jpg'

import login_style from './component_static/login.module.scss'
import navbar_style from './component_static/navbarstyle.module.scss'
import footer_style from './component_static/footer.module.scss'

type State = {saveUser: boolean}

export default class Login extends React.Component<{}, State>{

    state: State = {
        saveUser: false,
    } 

    componentDidMount(): void {
        let navbar = document.getElementsByClassName(`${navbar_style.navbar}`)[0] as HTMLElement;
        let footer = document.getElementsByClassName(`${footer_style.footer__main}`)[0] as HTMLElement
        let body = document.body
        let root = document.getElementById("root");

        root.style.height = root.style.width = "100%"
        navbar.style.display = footer.style.display = "none"
        body.style.overflow = "hidden"
    }

    componentWillUnmount(): void {
        let navbar = document.getElementsByClassName(`${navbar_style.navbar}`)[0] as HTMLElement;
        let footer = document.getElementsByClassName(`${footer_style.footer__main}`)[0] as HTMLElement
        let body = document.body
        let root = document.getElementById("root");

        root.style.height = root.style.width = ""
        navbar.style.display = footer.style.display = "flex"
        body.style.overflowX = "hidden"
        body.style.overflowY = "scroll"
    }

    setCookieValue = (variable: string, value: string, expDays: number) => {
        let date = new Date()
        date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
        const expires = "expires=" + date.toUTCString();
        document.cookie = variable + "=" + value + "; " + expires + "; path=/"
    }

    setCookiesFunction = (username: string, password: string) => {
        this.setCookieValue('username', username, 30)
        this.setCookieValue('password', password, 30)
        let client = Clients.users.find(name => name.name == username)
        this.setCookieValue('user_id', String(client.id), 30)
        this.setCookieValue('stay_logged', String(this.state.saveUser), 30)
        this.setCookieValue('avatar_image', client.avatarImage, 30)
    }

    Login = () => {
        let user = document.getElementById('username') as HTMLInputElement
        let password = document.getElementById('password') as HTMLInputElement
        let errorText = document.getElementsByClassName(`${login_style.login__main_container_error}`)[0] as HTMLElement
        let ifUser = Clients.users.find(name => name.name == user.value)

        if (ifUser != undefined){
            if (password.value == ifUser.password){
                // window.location.href = `http://localhost:3000/profile/${ifUser.id}`
                this.setCookiesFunction(ifUser.name, ifUser.password)
                window.location.href = `http://localhost:3000/profile/${ifUser.id}`
            }
        } else {
            errorText.style.display = "flex"
        }
    }

    toggleChecked = (e: React.FormEvent<HTMLInputElement>) => {
        let checked = e.currentTarget.checked
        this.setState({saveUser: checked})
    }

    render(){
        // if (localStorage.length >= 1) {
        //     let id = localStorage.getItem('user_id')
        //     window.location.href = `http://localhost:3000/profile/${id}`
        // }
        return (
            <div className={login_style.login__main}>
                <div className={login_style.login__main_logo}>
                    <img src={testavatar} alt="" />
                </div>
                <div className={login_style.login__main_container}>
                    <span className={login_style.login__main_container_title}>Login</span>
                    <span className={login_style.login__main_container_newAcc}>
                        If you don't have account, you can register new here
                    </span>
                    <div className={login_style.login__main_container_form}>
                        <form action="post" className={login_style.login__main_form}>
                            <input id='username' type="text" placeholder='username'/>
                            <input id='password' type="password" placeholder='password'/>
                        </form>
                        <div className={login_style.login__main_container_form_checkbox}>
                            <input id='checkbox' type="checkbox" onClick={(e) => this.toggleChecked(e)} />
                            <span>stay logged in</span>
                        </div>
                        <button id='login_button' 
                        onClick={() => this.Login()} 
                        className={login_style.login__main_login_button}
                        >login</button>

                        <div className={login_style.login__main_container_error}>
                            <span>
                                Wrong password or username, please try again
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}