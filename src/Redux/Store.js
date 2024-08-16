import { configureStore } from "@reduxjs/toolkit";
import postReducer from './UserSlice'


const store = configureStore({
  reducer:{
    posts:postReducer
  }
})

export default store;