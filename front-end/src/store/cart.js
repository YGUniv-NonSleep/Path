import { createSlice } from "@reduxjs/toolkit";
import RandomString from "../utils/RandomString";

export let cart = createSlice({
    name: "cart",
    initialState: {
        totalAmount: 0,
        suppliedAmount: 0,
        paymentKey: "",
        tossOrderId: "",
        memberId: 0, // 비로그인 id 0
        orderCompositionList: []
        /* {
            productId: 0,
            quantity: 0,
            price: 0,
            detailOptionList: []
        } */
    },
    reducers: {
        // actions
        addCart(state, action){
            // state 리덕스 값
            // action 받아온 값
            // state.compList = action.payload.state
            console.log(action)
        },
    },
});

// 실행할 행동을 반환
export const { addCart } = cart.actions;

// reducer 반환
export default cart.reducer;