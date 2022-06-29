import { createSlice } from "@reduxjs/toolkit";

export let cart = createSlice({
    name: "cart",
    initialState: {
        comId: 0,
        totalAmount: 0,
        // suppliedAmount: 0,
        // paymentKey: "",
        // tossOrderId: "",
        // memberId: 0, // 비로그인 id 0
        orderCompositionList: []
    },
    reducers: {
        // actions
        addCart(state, action){
            state.comId = action.payload.comId,
            state.totalAmount += action.payload.total,
            state.orderCompositionList.push(action.payload.orderCompositionList)
        },
        clearCart(state){
            state.comId = 0,
            state.totalAmount = 0,
            state.orderCompositionList = []
        },
    },
});

// 실행할 행동을 반환
export const { addCart, clearCart } = cart.actions;

// reducer 반환
export default cart.reducer;