import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./storeAPIs.js" 

const store = configureStore({
    reducer:{
        data:postReducer,
        }
})

export default store;