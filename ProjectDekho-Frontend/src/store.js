import { createStore } from "redux";
import  rootReducer from "./Reducers/ReducerIndex";
import { SECRET_KEY } from "./ActionTypes/ActionTypes.js";
import Cookies from "js-cookie";
import sjcl from "sjcl";
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    latency: 0
}));


store.subscribe(() => {
    const state = store.getState();
    // console.log("heep from subscription")
    const encrypted = sjcl.encrypt(SECRET_KEY, JSON.stringify(state.UserReducer));
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes in milliseconds
    Cookies.set("user-details", encrypted, { expires: expirationTime });
   
});


export default store;
