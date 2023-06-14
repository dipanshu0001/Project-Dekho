import { UserReducer } from './Reducers';
import { ProjectReducers } from './ProjectReducers';
import { CardReducer } from './CardReducers';
import { ChatReducer } from './ChatReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    UserReducer,
    ProjectReducers,
    CardReducer,
    ChatReducer
})
export default rootReducer;