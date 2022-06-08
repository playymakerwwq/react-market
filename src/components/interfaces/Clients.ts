import jsonData from "./Clients.json"

type USERSETTINGSTYPE = {id: number, name: string, password:string, lastname: string, age: string, 
    phonenumber: string, street: string, email: string, isloggedin: boolean, backgroundImage ?: string,
    avatarImage ?: string
}

type USERSETTINGS = {
    users: USERSETTINGSTYPE[];
}

const usersetting2: USERSETTINGS = {
    users: jsonData.users
}

export default usersetting2;