import styled from "styled-components";

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;

const BarContainer = styled.div`
  z-index: 10
  width: 390px;
  height: 90%;
  margin-top: 90px;
`;

const Ul = styled.ul`
  position: fixed;
  top: 10px;
  left: 110px;
`;

const TimeBtn = styled.button`
  position: absolute;
  top: 140px;
  left: 10px;
  width: 182px;
  height: 40px;
  font-size: 12px;
`;

const ExitBtn1 = styled.button`
  position: absolute;
  top: 140px;
  left: 200px;
  width: 180px;
  height: 40px;
  font-size: 12px;
`;

const BackBtn = styled.button`
  position: absolute;
  top: 150px;
  left: 10px;
  width: 40px;
  height: 40px;
  border: none;
  cursor:pointer;
  background-color:white;
`;

const BackBtn1 = styled.button`
position: absolute;
  top: 190px;
  left: 10px;
  width: 40px;
  height: 40px;
  border: none;
  cursor:pointer;
  background-color:white;
`;


const SubwayName = styled.div`
position: absolute;
top: 159px;
left 50px;
font-size: 21px;
font-weight:bold;
`;

const LocationIcon = styled.div`
position: absolute;
top: 220px;
left: 20px;
`;

const CallIcon = styled.div`
position: absolute;
top: 285px;
left: 20px;
`;

const Address = styled.div`
position: absolute;
top: 220px;
left: 60px;
width: 250px;
height: 30px;
font-size: 15px;
color: rgb(32, 32, 32);
`;

const NewAddress = styled.div`
position: absolute;
top: 230px;
left: 100px;
width: 250px;
height: 30px;
font-size: 13px;
color: rgb(148, 148, 148);
`;

const NewAddressBox = styled.div`
position: relative;
top:15px;
left: -40px;
width: 30px;
height: 15px;
font-size: 10px;
text-align: center;
line-height: 15px;
color: rgb(172, 172, 172);
border: 1px solid rgb(172, 172, 172);
`;

const CallNum = styled.div`
position: absolute;
top: 290px;
left: 60px;
`;

const Line = styled.hr`
  position: absolute;
  top: 320px;
  left: 10px;
  width: 370px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const HeadLine = styled.hr`
  position: absolute;
  top: 190px;
  left: 0px;
  width: 390px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const SubInfo = styled.div`
  position: absolute;
  top: 360px;
  left: 10px;
  font-weight: bold;
  font-size: 15px;
`;

const Info = styled.div`
position: absolute;
top: 400px;
left: 10px;
font-size: 11px;
font-weight: bold;
color: rgb(138, 138, 138);
`;

const DetailInfo = styled.div`
position: absolute;
top: 400px;
left: 110px;
font-size: 11px;
color: rgb(138, 138, 138);
`;

const InfoIcon = styled.div`
position: absolute;
top: 395px;
left: 80px;
`;

const Text = styled.p`
  position: absolute;
  top: 200px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line1 = styled.hr`
  position: absolute;
  top: 220px;
  left: 15px;
  width: 350px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const Text1 = styled.p`
  position: absolute;
  top: 370px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line2 = styled.hr`
  position: absolute;
  top: 390px;
  left: 15px;
  width: 350px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const ExitGateInfo = styled.div`
position: absolute;
  top: 210px;
  left: 20px;
  font-size: 13px;
  font-weight:bold;
  color: rgb(73, 73, 73);
  
`;

const ExitNum = styled.div`
margin-top: 5px;
width: 20px;
height: 100px;
border-bottom: 1px solid rgb(184, 184, 184);
`;

const ExitGate = styled.div`
margin-left: 20px;
margin-top: -16px;
width: 300px;
height: 100px;
border-bottom: 1px solid rgb(184, 184, 184);

`;

const ExitBox = styled.div`
position: absolute;
top: 240px;
left: 10px;
width: 375px;
height: 720px;
overflow:scroll;
`;

const PrevStop = styled.div`
position:fixed;
top:240px;
left:104px;
width:185px;
height:70px;
text-align: center;
line-height: 70px;
font-weight:bold;
font-size: 14px;
z-index: 10;
background-color: rgb(240, 251, 255);
border-right: 1px solid rgb(184, 184, 184);
border-top: 1px solid rgb(184, 184, 184);
border-bottom: 1px solid rgb(184, 184, 184);
`;

const NextStop = styled.div`
position:fixed;
top:240px;
left:289px;
width:185px;
height:70px;
text-align: center;
line-height: 70px;
font-size: 14px;
font-weight:bold;
z-index: 10;
background-color: rgb(240, 251, 255);
border-left: 1px solid rgb(184, 184, 184);
border-top: 1px solid rgb(184, 184, 184);
border-bottom: 1px solid rgb(184, 184, 184);
`;

const SubwayTimeName = styled.div`
position: absolute;
top: 200px;
left: 50px;
font-size: 20px;
font-weight:bold;
`;

const StopObj = styled.div`
position:absolute;
top: 310px;
left: 10px;
width: 380px;
height: 68%;
overflow:scroll;
// background-color: red;
`;

const TimeListDown = styled.div`
position: relative;
top: 10px;
left: 5px;
width: 20px;
background-color: pink;
`;

const MinutesListDown = styled.div`
position: relative;
top: -5px;
left: 50px;
width: 20px;
background-color: blue;
`;

const TimetableBox1 = styled.div`
position: absolute;
left: 190px;
width: 180px;
// background-color: orange;
`;

const TimetableBox = styled.div`
position: absolute;
left: 5px;
width: 170px;
padding-right: 9px;
border-right: 1px solid rgb(184, 184, 184);
background-color: green;
`;

const TimeListUp = styled.div`
width: 20px;
margin-left: 10px;
background-color: orange;
`;

const MinutesListUp = styled.div`
position: relative;
top: -15px;
left: 55px;
width: 20px;
`;

export {
    SideNav, BarContainer, Ul, TimeBtn, BackBtn1, SubwayName, LocationIcon, CallIcon, Address, NewAddress,
    NewAddressBox, CallNum, Line, HeadLine, Info,DetailInfo, InfoIcon, Text,
    Line1, Text1, Line2, ExitGateInfo, ExitNum, ExitGate, ExitBox, PrevStop, NextStop,
    SubwayTimeName, StopObj, TimeListDown, MinutesListDown, TimetableBox1,
    TimetableBox, TimeListUp, MinutesListUp
}