import { LoginUser, LogoutUser, SetFollowings,SetFollow,SetAccesToken, SetProjects, SECRET_KEY,UpdateLikeList } from '../ActionTypes/ActionTypes'
import Cookies from 'js-cookie';
import sjcl from 'sjcl';

let intialState = {
    _id:"",
    Username: "",
    Gmail: "",
    isAdmin: false,
    accesstoken: "",
    Uid: "",
    ProfileImage: "",
    SavedProjects: [],
    Following: [],
    Followers:[]
}
try {
    const storedAlready = Cookies.get("user-details");
    if (storedAlready) {
        const decrypted_data = sjcl.decrypt(SECRET_KEY, storedAlready);
        intialState = JSON.parse(decrypted_data);
    }
} catch (err) {
    console.log(err);
}

export const UserReducer = (state = intialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LoginUser:  
            return {
                _id:payload._id,
                Username: payload.Username,
                Gmail: payload.Gmail,
                isAdmin: payload.isAdmin,
                Uid: payload.Uid,
                accesstoken: payload.accesstoken,
                ProfileImage: payload.ProfileImage,
                SavedProjects: payload.SavedProjects,
                Following:payload.Following?payload.Following:[],
                Followers:payload.Followers
            }
        case LogoutUser:
            return {
                _id:"",
                Username: "",
                Gmail: "",
                isAdmin: false,
                accesstoken: "",
                Uid: "",
                ProfileImage: "",
                SavedProjects: [],
                Following: [],
                Followers: [],
            }
        case SetProjects:
            return {
                ...state,
                SavedProjects: payload
            }
        case SetFollowings:
            return {
                ...state,
                Following: payload?payload:[]
            }
            case SetFollow:
                return{
                    ...state,
                    Followers:payload
                }
        // case UpdateLikeList:
        //     return{
        //         ...state,

        //     }
        default:
            return state
    }
}