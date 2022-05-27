import { createSlice } from "@reduxjs/toolkit";

export let user = createSlice({
  name: "user", // name -> 리듀서의 이름
  initialState: { // initialState -> 초기값 설정
    id: 0,
    name: "anonymous",
    loginId: "anonymous",
    role: "ROLE_ANONYMOUS"
  },
  reducers: {
    // 상태가 변했을 때 어떻게 실행할 것인지 정의.
    // 이렇게 만든 리듀서 함수는 스토어에 저장해야한다. 안그럼 작동하지 않음
    changeUser(state, action) {
      // state는 우리가 잡아놓은 초기값의 value를 가져오는 역할.
      // action안에 payload랑 type 이라는 친구가 있는데
      // 우리가 바꾸고 싶은 데이터를 원하는 곳에다가 넘겨주는 역할.
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.loginId = action.payload.loginId;
      state.role = action.payload.role;
    },
  },
});

// 실행할 행동을 반환
export const { changeUser } = user.actions;

// reducer 반환
export default user.reducer;