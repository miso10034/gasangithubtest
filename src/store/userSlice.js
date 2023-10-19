import { configureStore, createSlice } from "@reduxjs/toolkit";

//슬라이스
let user = createSlice({
    name : 'user',//키
    initialState : { name :'kim',age : 20},//값
    // 값을 변경하고 싶다면 reducers : { 변경함수() { } } 이용하기
    reducers : {
        changeName(state){
            state.name = 'park';
        },
        increase(state, action){
            state.age = state.age + action.payload;
        },
    }
})

export let { changeName, increase } = user.actions 
export default user;