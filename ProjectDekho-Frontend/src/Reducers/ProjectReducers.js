import { AllProjects, } from '../ActionTypes/ActionTypes'


let intialState = {

}

 
export const ProjectReducers = (state = intialState, action) => {
    const{type,payload}=action
    switch (type) {
        case AllProjects:  
            return {
                ...state,
                payload
            }
        default:
            return state
    }
}