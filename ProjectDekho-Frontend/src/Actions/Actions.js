import {AllProjects,SetProjects,SetFollowings,SetFollow, LoginUser,LogoutUser,SetAccesToken,SETUSERNAME,SetContacts, SetMessages, SetUsername, SetNotifications} from '../ActionTypes/ActionTypes';


const Login_User=(obj)=>{
    // console.log(obj)
    return {
        type:LoginUser,
        payload: obj
    }
}
const Logout_User=()=>{

    return{
        type:LogoutUser
    }
}
const Set_Projects=(data)=>{
    return{
        type:AllProjects,
        payload:data.projects
    }
}
const Set_AccesToken=(accesstoken)=>{
    return{
        type:SetAccesToken,
        payload:accesstoken
    }
}
const set_Username=(Username)=>{
    
        return {
            type:SETUSERNAME,
            payload:Username
        }
}
const UpdateSavedProjects=(savedProjects)=>{
    // console.log(savedProjects,"saved ones called")
    return{
        type:SetProjects,
        payload:savedProjects
    }
}




const Set_Username=(name)=>{
    return{
        type:SetUsername,
        payload:name
    }
}

const Set_Messages=(messages)=>{
    return{
        type:SetMessages,
        payload:messages
    }
}

const Set_Notifications=(notifications)=>{
    return{
        type:SetNotifications,
        payload:notifications
    }
}

const Set_Contacts=(contacts)=>{
    return{
        type:SetContacts,
        payload:contacts
    }
}

const UpdateFollowing=(new_following)=>{
    return{
        type:SetFollowings,
        payload:new_following
    }
}
const UpdateFollowers=(new_followers)=>{
    return{
        type:SetFollow,
        payload:new_followers
    }
}

export{
    Login_User,
    Logout_User,
    Set_AccesToken,
    Set_Projects,
    set_Username,
    Set_Username,
    Set_Messages,
    Set_Contacts,
    Set_Notifications,
    UpdateSavedProjects,
    UpdateFollowing,
    UpdateFollowers
}