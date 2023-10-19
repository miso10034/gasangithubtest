import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
// import styled from "styled-components";
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';
import { addItem } from '../store.js';
import { useDispatch } from 'react-redux';


// let Mybtn = styled.button`
//   background : ${ (props) => props.bg };
//   color : ${ props => props.bg == 'blue'? 'white' : 'black'};
//   padding : 10px;
// `

// let Mybox = styled.div`
//   background : gray;
//   padding : 10px
// `

// let NewBtn = styled.button(Mybtn)`
//   padding : 20px;
//   margin: 20px;
// `

//useEffect 훅
function Detail(props){

    let dispatch = useDispatch();
    let navigate = useNavigate();

    // useContext => 쌓여있는 데이트를 해체시켜주는 함수
    // Context1안에 한쌍으로 여러 형태로 데이터가 들어있음
    let {재고} = useContext(Context1)

    let [fade2, setFade2] = useState('');

    let [tab, setTab] = useState(1);
    let [idx, setIdx] = useState(0);
    let[num, setNum] = useState('');
    let[alert, setAlert] = useState(true);
    let[count, setCount] = useState(0);
    let {id} = useParams();
    let findobj = props.lps.find((obj) => obj.id == id)
    

    //useEffect 시점 : 마운트, 업데이트 되었을 때 실행되는 코드
    //useEffect 사용하는 경우 =>
    // 1. 복잡하고 어려운 연산의 경우
    // 2. 서버에서 데이터를 가져오는 작업
    // 3. 타이머를 장착하는 경우

    // 마운트시 1회 코드를 실행하고 싶을 때 : useEffect(()=>{},[])
    // 마운트시, count 업데이트 시 실행 : useEffect(()=>{},[count])
    // 마운트시, count 업데이트 시 실행 : 
    // useEffect(()=>{ // 실행할 코드 return()=> // 정리할 코드},[])
    useEffect(()=>{
      let timer = setTimeout(()=>{
      // 2초 뒤에 사라지게 만들기
        setFade2('end');
      },100); 

      if(isNaN(num)== true){
          window.alert('숫자가 아닙니다');
      }
  
      setIdx(Number(id) + 1);

      return (
        ()=>{
          // 정리하는 코드 : Cleanup Function
          // 기존 타이머를 제거해주세여
          clearTimeout(timer);
          setFade2('');
        }
      )
    },[])//[count] 라는 state가 업데이터 되었을 때만 동작
    //[]=> dependency : 값을 비워놓는 경우 -> update되었을 때만 동작하는게 [count]
    // 컴포넌트가 마운트 되었을 때 딱 1회 실행하고 싶다면 [] 비워놓기

    return(
      <div className={"container start end" + fade2}>
        {/* {
          (alert == true) ?
            <div className='alert alert-warning'>
                2초 이내 구매시 할인
            </div>
            : null
          // 2초 후 2초 이내 구매시 할인 문구 사라지게
        } */}
        <div className="col-md-6 mt-4">
          <h2 className="pt-5" >{findobj.title}</h2><br></br>
          <p>{findobj.content}
          <br></br></p>
        </div>
          <div className="col mt-4">
              <img src={`./lps${idx}.png`}></img>
          </div>
          {/* <input type ="text" onChange={(e)=>{
           } 
          setNum(e.target.value);}}></input> */}
          <div>
          <br></br>TRACK LIST<br></br><br></br>Side A<br></br>good 4 u<br></br><br></br>Side B<br></br>enough for you [piano version]
          <p>{findobj.price}</p>
          <button className='btn btn-danger' onClick={()=>{ 
                  console.log('아이템 추가')
                  dispatch(addItem({id : findobj.id, name : findobj.title, count : 1}))
                  navigate('/cart');
                }}>주문하기</button><br></br><hr></hr>
    
          </div>
          <Nav variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTab(0)} } eventKey="link-0">상세정보</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTab(1)} }eventKey="link-1">리뷰</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTab(2)} }eventKey="link-2">문의사항</Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent lps = {props.lps} tab = {tab}></TabContent>
      </div>
    )
  }
function TabContent({tab, lps}){
    // tab이 변경이 될때 end값을 fade에 넣어주고 싶음
    let [fade, setFade] = useState('');
    let {재고} = useContext(Context1)

    // tab이 변경될 때마다 실행되는 코드
    useEffect(()=>{
      // end를 저기 부착해주세요
      let timer = setTimeout(()=> {setFade('end')},100); // 나오도록
      // automatic batching 기능
      // 여러개가 호출되면 성능상의 문제로 맨 마지막 한개만 적용시킴
      // 타이머를 통해서 별개로 인식해서 따로 처리할 수 있기에 사라졌다 나오는 것이 가능

      return ()=> {
        clearTimeout(timer);
        setFade(''); // 사라졌다가
      }
    },[tab])
                        // fade 처음 값 => start
    return <div className={'start ' + fade}>
              {[<div>{재고}</div>,<div>겁나 좋아요</div>,<div>배송 언제 되나요</div>][tab]}
          </div>
  }

// 컴포넌트를 외부로 빼는 것
export default Detail;