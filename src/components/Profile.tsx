import * as React from 'react'

import UserComponent from './UserComponent'
import UserDataComponent from './UserDataComponent'

// type USERSETTINGS = {
//     users: USERSETTINGSTYPE[];
// }

type USERSETTINGSTYPE = {id: number, name: string, lastname: string, age: string, 
    phonenumber: string, street: string, email: string, isloggedin: boolean, backgroundImage ?: string,
    avatarImage ?: string
}

type Props = {usersetting: USERSETTINGSTYPE}

export default class Profile extends React.Component<Props>{
    render(){
        return(
            <section>
                <React.StrictMode>
                    <div>
                        <UserComponent name={this.props.usersetting.name} 
                        avatar={this.props.usersetting.avatarImage}
                        background={this.props.usersetting.backgroundImage} />
                        <UserDataComponent data={this.props.usersetting}/>
                    </div>
                </React.StrictMode>
            </section>
        )
    }
}