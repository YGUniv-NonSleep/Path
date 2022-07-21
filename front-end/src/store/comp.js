import { createSlice } from "@reduxjs/toolkit";

export let comp = createSlice({
  name: "comp", // name -> 리듀서의 이름
  initialState: { compList: [] }, // initialState -> 초기값
  reducers: {
    // 상태가 변했을 때 어떻게 실행할 것인지 정의.
    // 이렇게 만든 리듀서 함수는 스토어에 저장해야한다. 안그럼 작동하지 않음
    storeInfo(state, action){
      state.compList = action.payload.state
    },
    updateStore(state, action){
      let result = state.compList.filter((comp)=> {
        return comp != parseInt(action.payload.state)
      })
      state.compList = result
    }
  },
});

// 실행할 행동을 반환
export const { storeInfo, updateStore } = comp.actions;

// reducer 반환
export default comp.reducer;