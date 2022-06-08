import * as React from "react";
import Clients from "./interfaces/Clients"

import testavatar from './component_static/images/testavatar2.jpg'

import register_style from './component_static/register.module.scss'
import navbar_style from './component_static/navbarstyle.module.scss'
import footer_style from './component_static/footer.module.scss'

export default class Register extends React.Component<{}>{
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

    render(){
        return(
            <div>

            </div>
        )
    }
}