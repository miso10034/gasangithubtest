import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12],
    reducers : {
        changestock(){

        }
    }
})

let cart = createSlice({
    name : 'cart',
    initialState : 
    [
        {id:0, name:'white and Black', count:1},
        {id:1, name:'Gray Yordan', count:1},
    ],
    reducers : {
        addCount(state, action){
            let index = state.findIndex((a)=>{return action.payload === a.id})
            state[index].count++
        },
        addItem(state, action){
            state.push(action.payload)
        },//state => initialState를 나타냄, action => 전달할때 전달매개변수를 가리킴
        subItem(state, action){
            // 배열에서 특정 인덱스의 요소를 삭제
            //                         갯수
            state.splice(action.payload, 1);
        }
    }
})

export let { addCount, addItem, subItem } = cart.actions

export default configureStore({
    reducer : {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer,
    }
})

