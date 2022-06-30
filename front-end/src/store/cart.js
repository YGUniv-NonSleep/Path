import { createSlice } from "@reduxjs/toolkit";

export let cart = createSlice({
    name: "cart",
    initialState: {
        comId: 0,
        comName: "",
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
            state.comName = action.payload.comName,
            state.totalAmount += action.payload.total,
            state.orderCompositionList.push(action.payload.orderCompositionList)
        },
        updateCart(state, action){
            const result = state.orderCompositionList.filter((prod) => 
                prod.productId != action.payload.productId 
                || prod.detailOptionList.toString() !== action.payload.detailOptionList.toString()
            )

            if (state.orderCompositionList.length == 1) {
              state.comId = 0,
              state.comName = ""
            }
            state.totalAmount -= action.payload.price,
            state.orderCompositionList = result
        },
        clearCart(state){
            state.comId = 0,
            state.comName = "",
            state.totalAmount = 0,
            state.orderCompositionList = []
        },
    },
});

// 실행할 행동을 반환
export const { addCart, updateCart, clearCart } = cart.actions;

// reducer 반환
export default cart.reducer;