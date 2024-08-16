import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  posts:[],
  status:"Idle",
  error:null
}
export const fetchPosts = createAsyncThunk('fetch/posts', async()=>{
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data;
})


const postSlice = createSlice({
  name:"posts",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending, (state)=>{state.status = 'Loading'})
        .addCase(fetchPosts.fulfilled, (state, action)=>{state.status = 'Success'; 
          state.posts= action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action)=>{state.status = 'Failed'; 
          state.posts= action.error;
        })
        
  }
})

export default postSlice.reducer