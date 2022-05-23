import { configureStore, createSlice } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

let user = createSlice({
  name: 'user',
  initialState: {
    name: 'anonymous',
    loginId: 'anonymous',
    role: 'ROLE_ANONYMOUS',
  },
  reducers: {
    changeUser(state, action) {
      state.name = action.payload.name;
      state.loginId = action.payload.loginId;
      state.role = action.payload.role;
    },
  },
});

export let { changeUser } = user.actions;

export default configureStore({
  reducer: {
    // counter: counterReducer,
    user: user.reducer,
  },
});
