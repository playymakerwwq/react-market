import * as React from 'react'
import notfound_style from './component_static/notfound.module.scss'

type Props = {}
type State = {}

export default class NotFound extends React.Component<Props, State>{
    render(){
        return(
            <div className={notfound_style.notfound__main}>
                <div className={notfound_style.notfound__main_container}>
                    <div className={notfound_style.notfound__main_container_title}>
                        <span>Oops, there is nothing here</span>
                    </div>
                </div>
            </div>
        )
    }
}