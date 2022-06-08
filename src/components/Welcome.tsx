import * as React from 'react'
import welcome_style from './component_static/welcome.module.scss'
import navbar_style from './component_static/navbarstyle.module.scss'
import footer_style from './component_static/footer.module.scss'
import { Link, Navigate} from 'react-router-dom'

export default class WelcomePage extends React.Component<{}>{

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
        if (document.cookie != "") {
            let id = this.getCookie('user_id')
            window.location.href = `http://localhost:9000/profile/${id}`
        }
        return(
            <div className={welcome_style.welcome__main}>
                <div className={welcome_style.welcome__container}>
                    <div className={welcome_style.welcome__container_content}>
                        <div className={welcome_style.welcome__container_title}>
                            <span>Welcome to playymakerwwq</span>
                            <span>First time on market? <Link to={'login'} style={{color: "rgb(255, 68, 68)"}}>Make new account</Link></span>
                        </div>
                        {/* <div className={welcome_style.welcome__container_openMarket}>
                            <Link to={'market'}><span>open market</span></Link>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}