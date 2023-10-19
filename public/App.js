import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import bgm from './img/bg.png';
import { useState, createContext, useContext} from 'react';
import data from './data.js';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';
import About from './pages/About';
import axios from 'axios';


export let Context1 = createContext();

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12]);

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">홈</Nav.Link>
            <Nav.Link href="/about">about</Nav.Link>
            <Nav.Link href="/detail">Pricing</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>back</Nav.Link>
            <Nav.Link onClick={()=>{navigate(1)}}>forward</Nav.Link>
          </Nav>
        </Container>
      </Navbar><br></br>

      <Routes>
        <Route path = "/" element = {
          <>
              <div className = "main-bg" style = 
              {{backgroundImage : 'url(' + bgm + ')'}}></div>

              <br></br>
              <div className="container text-center">
              <div className="row">          
                {
                  shoes.map((a, i)=>{
                    return(
                        <Card shoes = {shoes[i]} i = {i} key={i}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button className = "btn btn-warning" onClick={()=>{

                // axios.get('https://jamsuham75.github.io/image/data2.json')
                // .then((result)=>{
                //   console.log(result.data);
                //   console.log(shoes);

                //   //두 개의 배열을 각각 벗긴다.
                //   //두 개의 데이터를 합친다.
                //   //합친 데이터를 다시 배열로 만든다.
                  
                //   let copy = [...shoes, ...result.data];
                //   console.log(copy);
                //   setShoes(copy);
                // })
                // .catch(()=>{
                //   console.log('실패');
                // })

                fetch('https://jamsuham75.github.io/image/data2.json')
                .then((result)=>{
                  return result.json();
                })
                .then((data) =>{
                  console.log(data);
                  console.log(shoes);

                  //두 개의 배열을 각각 벗긴다.
                  //두 개의 데이터를 합친다.
                  //합친 데이터를 다시 배열로 만든다.
                  
                  let copy = [...shoes, ...data];
                  console.log(copy);
                  setShoes(copy);
                })
     
            
                // 동시에 ajax 요청 여러개 하는 경우
                // Promise.all([axios.get('/url1') , axios.get('/url2')])
                // .then()
                // .catch()

            }}>상품 더보기</button>

          </>
        }></Route>
        <Route path = "/detail/:id" element = {
          <Context1.Provider value={{재고}}>
            <Detail shoes = {shoes}></Detail>
          </Context1.Provider>
        }></Route>
      
        <Route path = "/about" element = {<About></About>}>
          <Route path = "member" element = {<div>멤버들 리스트</div>}></Route>
          <Route path = "location" element = {<div>회사 위치</div>}></Route>
        </Route>

        <Route path = "*" element = {<div><h1>404 에러</h1><br></br>없는 페이지입니다.</div>}></Route>
      </Routes>

    </div>
  );
}

function Card(props){
  let navigate = useNavigate();
  return(
      <div className="col-md-4" onClick={()=>{
        navigate('/detail/'+props.i)
      }}>
          <img src = {process.env.PUBLIC_URL + '/shoes' + (props.i+1)+ '.jpg'} width="80%"></img>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
      </div>
  )
}




export default App;
