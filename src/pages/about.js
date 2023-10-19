import { useEffect, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';


function About(){
    return(
        <div>
            <div className="container">
                {재고}
                <h1>우리 회사 소개</h1>
                <Outlet></Outlet>
                {/* <div className="col-md-6 mt-4">
                    <img src="./profile.png" width="350" height="300"></img><br></br>
                </div> */}
                <div>
                <br></br>

                    <h4>김미소</h4>
                    <p>Born in Jeonju</p>
                    <p>1998.07.29</p>  
                    <button className="btn btn-danger">연락하기</button> 
                </div>
            </div>
        </div>
    )
}
export default About;