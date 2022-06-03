import * as React from "react";
import footer_style from './component_static/footer.module.scss'
import avatar_image from "./component_static/images/testavatar.jpg"

export default class Footer extends React.Component<{}>{
    render(): React.ReactNode {
        return(
            <footer className={footer_style.footer__main}>
                <div className={footer_style.footer__main_content}>
                    <div className={footer_style.footer__main_content_logo}>
                        <img src={avatar_image} alt=""/>
                        <span>plmkr 2022-2022</span>
                    </div>
                    <div className={footer_style.footer__main_content_links}>
                        <ul>
                            <li><a href="#">Reddit</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Patreon</a></li>
                            <li><a href="#">Discord</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}