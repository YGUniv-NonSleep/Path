import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import MIcon from "../MIcon";


const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 380px;
  height: 90px;
`;

const BarContainer = styled.div`
  z-index: 5;
  width: 390px;
  height: 90%;
  margin-top: 90px;
  
`;


/*
const Mobil = styled.div`
position: absolute;
top: 10px;
left: 610px;
width: 400px;
height: 150px;
border-radius: 10px;
background-color: white;
box-shadow: 3px 3px 3px gray;
`;

const Btn = styled.button`
position:absolute;
top: 100px;
left: 45px;
width: 150px;
height: 40px;
`;

const Btn1 = styled.button`
position:absolute;
top: 100px;
left: 210px;
width: 150px;
height: 40px;
`;

<Mobil>
        <Btn>벨울리기</Btn>
        <Btn1>예약하기</Btn1>
      </Mobil>
*/

const Scooter = () => {
  return (
    <SideNav>

      <BarContainer>
        <MIcon />
       
      </BarContainer>
    </SideNav>
      
   
  );
};

export default Scooter;
