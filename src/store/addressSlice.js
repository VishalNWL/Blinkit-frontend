import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    addresssList:[]
}

const addressSlice = createSlice({
    name:'address',
    initialState:initialValue,
    reducers:{
          handleAddAddress:(state,action)=>{
              state.addresssList=[...action.payload]
          }
    }
})


export const {handleAddAddress} = addressSlice.actions
export default addressSlice.reducer