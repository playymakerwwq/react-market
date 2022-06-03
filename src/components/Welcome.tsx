import * as React from 'react'
import welcome_style from './component_static/welcome.module.scss'
import navbar_style from './component_static/navbarstyle.module.scss'
import footer_style from './component_static/footer.module.scss'
import { Link } from 'react-router-dom'

type Props = {};
type State = {};

export default class WelcomePage extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
        
    }

    state: State = {}

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
            <div className={welcome_style.welcome__main}>
                <div className={welcome_style.welcome__container}>
                    <div className={welcome_style.welcome__container_content}>
                        <div className={welcome_style.welcome__container_title}>
                            <span>Welcome to playymakerwwq</span>
                            <span>First time on market? <Link to={'profile'} style={{color: "rgb(236, 68, 68)"}}>Make new account</Link></span>
                        </div>
                        <div className={welcome_style.welcome__container_openMarket}>
                            <Link to={'market'}><span>open market</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}