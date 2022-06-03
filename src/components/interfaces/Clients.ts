import background1 from "./images/testbackground.jpg"
import background2 from "./images/testbackground2.jpg"
import avatar1 from "./images/testavatar.jpg"
import avatar2 from "./images/testavatar2.jpg"

type USERSETTINGS = {
    users: USERSETTINGSTYPE[];
}

type USERSETTINGSTYPE = {id: number, name: string, lastname: string, age: string, 
    phonenumber: string, street: string, email: string, isloggedin: boolean, backgroundImage ?: string,
    avatarImage ?: string
}

const usersetting : USERSETTINGS = {
    users: [
        {id: 0, name: "senka", lastname: "golub", age: '16', 
        phonenumber: "+79273922186", street: "Kalinina 76", email: "senkagolub@gmail.com",
        isloggedin: true, backgroundImage: background1, avatarImage: avatar1},

        {id: 1, name: "arthur", lastname: "golub", age: '21', 
        phonenumber: "+79273922186", street: "Kalinina 76", email: "senkagolub@gmail.com",
        isloggedin: true, backgroundImage: background2, avatarImage: avatar2}
    ]
}

export default usersetting;