import * as React from "react"
import { NavLink } from 'react-router-dom';

import style from './component_static/navbarstyle.module.scss' 
import image from './component_static/images/testavatar.jpg'

type NavbarState = {menu: HTMLElement, isMenuOpen: boolean}
type Props = {}

export default class Navbar extends React.Component<Props, NavbarState> {
    private menuRef: React.RefObject<HTMLInputElement>;
    private menuOptions: HTMLLIElement[];

    constructor(props: Props){
        super(props);
        this.menuRef = React.createRef();
        this.menuOptions = [];
    }

    state: NavbarState = {
        menu: null,
        isMenuOpen: false,
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

    handleNavMenuWords = (array: HTMLElement[]) => {
        for(let item = 0; item < array.length; item++){
            if (this.state.isMenuOpen){
                array[item].style.display = "block"
            } else {
                array[item].style.display = "none"
            }
        }
    }

    handleNavMenu = () => {
        if (!this.state.isMenuOpen){
            this.state.menu.style.height = "120px"
            this.state.isMenuOpen = true
            this.handleNavMenuWords(this.menuOptions)
        } else {
            this.state.menu.style.height = "0px"
            this.state.isMenuOpen = false
            this.handleNavMenuWords(this.menuOptions)
        }
    }

    componentDidMount(){
        let image = document.getElementsByClassName(`${style.navbar__useravatar} useravatar`)[0] as HTMLImageElement
        

        this.setState({
            menu: document.getElementsByClassName(`${style.navbar__dropping_menu}`)[0] as HTMLElement
        })
        for (let element = 0; element < 3; element++){
            this.menuOptions.push(document.getElementsByTagName("li")[element])
        }
        let handler = (e: any) => {
            if (!this.menuRef.current.contains(e.target)){
                this.state.menu.style.height = "0px"
                this.state.isMenuOpen = false
                this.handleNavMenuWords(this.menuOptions)
            }
        }

        document.addEventListener("click", handler)
    }

    render(){
        return(
                <div>
                    <nav>
                        <div className={style.navbar}>
                            <div 
                            className={`${style.navbar__useravatar} useravatar`} 
                            onClick={this.handleNavMenu}
                            ref={this.menuRef}
                            >
                                <img src={this.getCookie("avatar_image")} alt="" />
                                <div className={style.navbar__dropping_menu}>
                                    <ul>
                                        <li id="settings"><a href="#">Settings</a></li>
                                        <li id="aboutus"><a href="#">About us</a></li>
                                        <li id="logout"><a href="#">Log out</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className={`${style.navbar__content}`}>
                                <div>
                                    <NavLink to="market">Market</NavLink>
                                </div>
                                <div>
                                    <NavLink to={`profile/${this.getCookie('user_id')}`}>Profile</NavLink> 
                                </div>
                                <div>
                                    <NavLink to="basket">Basket</NavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
        )
    }
}