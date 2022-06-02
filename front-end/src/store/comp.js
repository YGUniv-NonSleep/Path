import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";

export let comp = createSlice({
  name: "comp", // name -> 리듀서의 이름
  initialState: {}, // initialState -> 초기값
  reducers: {
    // 상태가 변했을 때 어떻게 실행할 것인지 정의.
    // 이렇게 만든 리듀서 함수는 스토어에 저장해야한다. 안그럼 작동하지 않음
    getStore(state){
        console.log(state)
    }
  },
  extraReducers: builder => {
      // 비동기 처리의 3가지 상태를 직접 제어해주어야 한다.
      builder.addCase(getStore.pending, (state) => {
          console.log(state)
          state.status = "loading";
      });
      builder.addCase(getStore.fulfilled, (state, {payload}) => {
        console.log(state)
        state.status = "success";
        state.isAuth = true;
        state.user = payload;
      });
      builder.addCase(getStore.rejected, (state, action) => {
        console.log(state)
        state.status = "failed";
        if(action.payload){
          state.error = action.payload;
        } else state.error = action.error.message;
      });
  }
});

// 실행할 행동을 반환
export const {  } = comp.actions;

export const getStore = createAsyncThunk(
    "comp/getStoreThunk",
    async() => {
        try {
            const result = await axios
                .get(process.env.REACT_APP_SPRING_API + "/api/company/myStore");
            const stores = unwrapResult(result);
            console.log(stores)
            // return result.data
        } catch (err) {
            let error = err;
            if(!error.response){
                throw err;
            } 
            return rejcetWithValue(error.response.data);
        }
    }
);

// reducer 반환
export default comp.reducer;