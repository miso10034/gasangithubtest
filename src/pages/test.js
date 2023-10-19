import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


// class Detail2 extends React.Component{
//   componentDidMountent(){

//   }
//   componentDidUpdate(){

//   }
//   componentWillUnmount(){

//   }
  
//   render(){

//   }

// }

let Mybtn = styled.button`
  background : ${ (props) => props.bg };
  color : ${ props => props.bg == 'blue'? 'white' : 'black'};
  padding : 10px;
`

let Mybox = styled.div`
  background : gray;
  padding : 10px
`

let NewBtn = styled.button(Mybtn)`
  padding : 20px;
  margin: 20px;
`

// useEffect 훅
function Detail(props){

    useEffect(() => {
      console.log('마운트');
    })

    let [count, setCount] = useState(0);

    let {id} = useParams();
    let findobj = props.event.find((obj) => obj.id == id)


    return(
      <div className="container">
        <Mybox>
          <Mybtn bg = 'green'>버튼스타일</Mybtn>
        </Mybox>
        
        <div className="data1">
            <img src="./data.jpg" width={300}></img>
        </div>
        <div className="data1-1">
            <h4 className="pt-1">{findobj.name}</h4>
            <p>{findobj.id}</p>
            <p>{findobj.content}</p>
            <button className="btn-1" onClick={
              () => {
                setCount(count + 1);                             
              }
            }>찜 ♥</button>
        </div>
        
      </div>
    )
  }

  export default Detail;