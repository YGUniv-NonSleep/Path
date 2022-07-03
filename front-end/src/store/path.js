import { createSlice } from "@reduxjs/toolkit";

export let path = createSlice({
    name: "path",
    initialState: { 
        pathData: null, // 경로 정보
        sName: "",
        eName: "",
    },
    reducers: {
        // actions
        addPath(state, action){
            state.pathData = action.payload.pathData,
            state.sName = action.payload.SPoint,
            state.eName = action.payload.APoint
        },
        clearPath(state){
            state.pathData = null,
            state.sName = "",
            state.eName = ""
        }
    }
});

// 실행할 행동을 반환
export const { addPath, clearPath } = path.actions;

// reducer 반환
export default path.reducer;