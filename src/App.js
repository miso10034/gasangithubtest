import { Button, Navbar, Container, Nav} from 'react-bootstrap';
import './App.css';
import bgm from './img/bg2.jpg';
import { lazy, Suspense, useState, createContext } from 'react';// ./가 안붙어있는 애들 => 외부에서 제공되는 라이브러리
import data from './data.js';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
// useNavigate => 페이지 이동 기능
// Outlet => 위치 지정해서 출력해주는 기능
// ./로 시작하는 것들 => 내가 추가한 것들, js는 생략 가능


import About from './pages/about';
import axios from 'axios';
// import Detail from './pages/detail';
// import Cart from './pages/cart.js';

const Detail = lazy(()=> import('./pages/detail.js'));
const Cart = lazy(()=> import('./pages/cart.js'));

export let Context1 = createContext();

function App() {
  // object 자료형 [lps] => [{},{},{}] 형태로 되어 있음
  let [lps,setLps] = useState(data);
  let navigate = useNavigate();
  
  /////////// Context API //////////
  let [재고] = useState([10, 11, 12]);


  return (
    <div className="App">

      {/* <button  className="btn btn-primary" onClick={()=>{
        navigate('/')
      // navigate(-1) => 뒤로가기 
      // navigate(1) => 앞으로 가기
      }}>홈</button>
      <button  className="btn btn-light" onClick={()=>{
        navigate('/detail')
      }}>상세페이지</button>
      <button  className="btn btn-primary" onClick={()=>{
        navigate('/about')
      }}>더보기</button> */}

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Record</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">about</Nav.Link>
            <Nav.Link href="/detail">Shop</Nav.Link>
            <Nav.Link onClick={()=>{ navigate(1)}}>forwoard</Nav.Link>
            <Nav.Link onClick={()=>{ navigate(-1)}}>back</Nav.Link>
          </Nav>
        </Container>
      </Navbar><br></br>

      <Suspense fallback={<div>로딩중임</div>}>

      {/* 라우트 상세 페이지 만들기
      /detail로 요청을 하는 것
      */}
      <Routes>
        <Route path = "/" element ={
          <>
            <div className='main-bg' style=
            {{backgroundImage : 'url(' + bgm +')'}}></div>
    
            <br></br>
            <div className="container text-center">
            <div className="row">
              { 
                lps.map((a, i)=>{// a => lps를 받음
                  return (
                      <Card lps = {lps[i]} i = {i} key={i}></Card>
                  )
                })
              }
            </div>
          </div>
          <button className = "btn btn-warning" onClick={()=>{
              axios.get('https://jamsuham75.github.io/image/data2.json')
              // 성공시 요청을 받는 콜백함수
              .then((result)=>{
                console.log(result.data);
                console.log(lps);

                //두 개의 배열을 각각 벗긴다.
                //두 개의 데이터를 합친다.
                //합친 데이터를 다시 배열로 만든다
                //,로 구분하면 두개를 합치겠다는 뜻
                let copy = [...lps, ...result.data];
                console.log(copy);
                setLps(copy);
              })
              // 실패시 오류 발생시
              .catch(()=>{
                console.log('실패');
              })

              // fetch('https://jamsuham75.github.io/image/data2.json')
              //   .then((result)=>{
              //     return result.json();
              //   })
              //   .then((data) =>{
              //     console.log(data);
              //     console.log(shoes);
              
              ////// 동시에 ajax 요청 여러개 하는 경우
              // [] 안에 원하는 요청 넣기
              // Promise.all([axios.get('/url1'), axios.get('/url2')])
              //성공시 => .then()
              //실패시 => .catch()
              

            }}>상품 더보기</button>
          </>
        }></Route>
        <Route path = "/detail/:id" element = {
          ///////// context api ////////
          <Context1.Provider value={ {재고} }>
            <Detail lps = {lps}></Detail>
          </Context1.Provider>
        }></Route>

        <Route path = "/about" element = {<About></About>}>
        {/* 404 페이지 처리, * => 너가 가지고 있는 페이지를 제외하고는 모두 아래와 같은 표시를 해줄거야 */}
          <Route path = "member" element = {<div>멤버들 리스트</div>}></Route>
          <Route path = "location" element = {<div>회사 위치</div>}></Route>
        </Route>

        <Route path = "/cart" element = {<Cart></Cart>}></Route>

        <Route path = "*" element = {<div><h1>404 에러</h1><br></br>없는 페이지 입니다.</div>}></Route>
      </Routes>
      </Suspense>
    </div>
  );
}
      
function Card(props){

  let navigate = useNavigate(Context1);
  return(
      <div className="col-md-4" onClick={()=>{
        navigate('/detail/'+props.i)
      }}>
          <img src={process.env.PUBLIC_URL + '/lp' + (props.i+1) + '.png'} width="80%"></img>
          <h5>{props.lps.title}</h5>
          <h6>{props.lps.content}</h6>
          <p>{props.lps.price}</p><br></br>
      </div>  
  )
}

export default App;
