import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./user";
import compReducer from "./comp";
import cartReducer from "./cart";
import pathReducer from "./path";

const persistConfig = {
  key: "store",
  storage: storage,
  whitelist: ["cart", "path"] // , "path"
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  user: userReducer,
  comp: compReducer,
  cart: cartReducer,
  path: pathReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // redux가 관리할 모든 reducer(상태)를 정의할 공간
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;