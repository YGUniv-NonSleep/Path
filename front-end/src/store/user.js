import { createSlice } from "@reduxjs/toolkit";

export let user = createSlice({
  name: "user",
  initialState: {
    id: 0,
    name: "anonymous",
    loginId: "anonymous",
    role: "ROLE_ANONYMOUS"
  },
  reducers: {
    changeUser(state, action) {
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