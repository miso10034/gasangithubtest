import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeName , increase} from '../store/userSlice';
import { addCount, subItem } from '../store';

function Cart() {
    let a = useState();

    let mydata = useSelector((state)=>{return state;});
    let dispatch = useDispatch();

    console.log(mydata);

    return (
        <div>
            {mydata.user.name} {mydata.user.age}의 장바구니
            <button onClick={()=> {
                dispatch(increase());
            }}>나이증가</button>
            <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
            </tr>
        </thead>
        <tbody>
            {
                mydata.cart.map((a, i)=>{
                    return(
                        <tr key={i}>
                            <td>{mydata.cart[i].id}</td>
                            <td>{mydata.cart[i].name}</td>
                            <td>{mydata.cart[i].count}</td>
                            <td>
                                <Button onClick={()=>{
                                    dispatch(addCount(mydata.cart[i].id));
        // dispatch => changeName()이라는 함수를 호출해달라고 부탁하는 함수
                                }} variant="primary">+</Button>
                            </td>
                            <td>
                                <Button onClick={()=>{
                                dispatch(subItem(i));
                            }} variant="danger">X</Button></td>
                        </tr>
                    )
                })
            }
        </tbody>
        </Table>
        </div>
        
  );
}

export default Cart;