import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface globalState {
    isOpenCartDrawer:boolean;
    onOpenCartDrawer:boolean;
    onCloseCartDrawer:boolean;
}

const initialState: globalState = {
    isOpenCartDrawer: false,
    onOpenCartDrawer: false,
    onCloseCartDrawer: false,

};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenCartDrawerAction:(state)=>{
        state.isOpenCartDrawer = true
        state.onOpenCartDrawer=true

    },
    onCloseCartDrawerAction: (state)=>{
        state.isOpenCartDrawer = false
        state.onCloseCartDrawer=false

    }

  },
});

export const { onCloseCartDrawerAction,onOpenCartDrawerAction} = globalSlice.actions;
export const globalSelector = ({ global }: RootState) => global;

export default globalSlice.reducer;
