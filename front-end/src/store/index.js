import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user";

export default configureStore({
  // redux가 관리할 모든 reducer(상태)를 정의할 공간
  reducer: {
    user: userReducer,
  },
});