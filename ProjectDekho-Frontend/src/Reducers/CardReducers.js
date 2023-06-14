import { SETUSERNAME} from '../ActionTypes/ActionTypes'


let intialState = {
Username:""
}

 
export const CardReducer = (state = intialState, action) => {
    const{type,payload}=action
    switch (type) {
        case SETUSERNAME:  
            return {
                Username:payload
            }
        default:
            return state
    }
}