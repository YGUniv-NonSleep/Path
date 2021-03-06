import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MapApi from "../../../api/MapApi";
import { SubwayApi } from "../../../api/OdsayApi";
import Map from "../../../components/Map";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MIcon from "../MIcon";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import WcIcon from '@mui/icons-material/Wc';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
  top: 145px;
  left: 10px;
  width: 182px;
  height: 40px;
  font-size: 12px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background-color: white;
  &:hover {
    background-color: #E8F0FE;
  };
`;

const ExitBtn1 = styled.button`
  position: absolute;
  top: 145px;
  left: 200px;
  width: 180px;
  height: 40px;
  font-size: 12px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background-color: white;
  &:hover {
    background-color: #E8F0FE;
  };
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
top: 265px;
left: 20px;
`;

const CallIcon = styled.div`
position: absolute;
top: 347px;
left: 20px;
`;

const Address = styled.div`
position: absolute;
top: 270px;
left: 60px;
width: 250px;
height: 30px;
font-size: 15px;
color: rgb(32, 32, 32);
`;

const NewAddress = styled.div`
position: absolute;
top: 280px;
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
top: 350px;
left: 60px;
`;

const Line = styled.hr`
  position: absolute;
  top: 400px;
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
  top: 440px;
  left: 10px;
  font-weight: bold;
  font-size: 15px;
`;

const Info = styled.div`
position: absolute;
top: 480px;
left: 10px;
font-size: 11px;
font-weight: bold;
color: rgb(138, 138, 138);
`;

const DetailInfo = styled.div`
position: absolute;
top: 480px;
left: 110px;
font-size: 11px;
color: rgb(138, 138, 138);
`;

const InfoIcon = styled.div`
position: absolute;
top: 477px;
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
height: 150px;
border-bottom: 1px solid rgb(184, 184, 184);
`;

const ExitGate = styled.div`
margin-left: 20px;
margin-top: -16px;
width: 300px;
height: 150px;
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
top:280px;
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
top:280px;
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

const StopObj = styled.div`
position:absolute;
top: 352px;
left: 10px;
width: 380px;
height: 68%;
overflow:scroll;
`;

const SubwayTimeName = styled.div`
position: absolute;
top: 200px;
left: 50px;
font-size: 20px;
font-weight:bold;
`;



const TimeListDown = styled.div`
position: relative;
top: 10px;
left: 5px;
width: 20px;
`;

const MinutesListDown = styled.div`
position: relative;
top: -7px;
left: 40px;
width: 20px;
line-height: 20px;
`;

const TimetableBox1 = styled.div`
position: absolute;
left: 190px;
width: 180px;
`;

const TimetableBox = styled.div`
position: absolute;
left: 5px;
width: 170px;
padding-right: 9px;
border-right: 1px solid rgb(184, 184, 184);

`;

const TimeListUp = styled.div`
position: relative;
top: 10px;
width: 20px;
margin-left: 10px;
`;

const MinutesListUp = styled.div`
position: relative;
top: -7px;
left: 40px;
width: 20px;
line-height: 20px;
`;

const UpDownContain = styled.div`
position: relative;
width: 185px;
height: 260px;
border-bottom: 1px solid rgb(184, 184, 184);

`;

const UpDownWay = styled.div`
position: absolute;
top: 8px;
left: 70px;
width: 40px;
height: 90%;
word-break: break-all;
line-height : 20px;
`;

const UpDownWay1 = styled.div`
position: absolute;
bottom: 17px;
left: 70px;
width: 60px;
height: 90%;
word-break: break-all;
line-height : 20px;
`;

const OrdBtn = styled.button`
position: relative;
top: 110px;
left: 10px;
width: 110px;
height: 30px;
border:none;
outline:none;
border-radius: 10px;
background-color: #00CCB2;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
&:hover {
  background-color: #00BBA1
};
`;

const OrdBtn1 = styled.button`
position: relative;
top: 110px;
left: 10px;
width: 110px;
height: 30px;
border:none;
outline:none;
border-radius: 10px;
background-color: #00BBA1;
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const SatBtn = styled.button`
position: relative;
top:110px;
left: 25px;
width: 110px;
height: 30px;
border: none;
outline:none;
border-radius: 10px;
background-color: #00CCB2;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
&:hover {
  background-color: #00BBA1
};
`;

const SatBtn1 = styled.button`
position: relative;
top:110px;
left: 25px;
width: 110px;
height: 30px;
border: none;
outline:none;
border-radius: 10px;
background-color: #00BBA1;
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const SunBtn = styled.button`
position: relative;
top: 110px;
left: 40px;
width:110px;
height:30px;
border:none;
outline:none;
border-radius:10px;
background-color: #00CCB2;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
&:hover {
  background-color: #00BBA1
};
`;

const SunBtn1 = styled.button`
position: relative;
top: 110px;
left: 40px;
width:110px;
height:30px;
border:none;
outline:none;
border-radius:10px;
background-color: #00BBA1;
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const SubWaySearchName = styled.div`
position: relative;
top: 80px;
left: 20px;
font-size: 22px;
font-weight: bold;
color: #00A98F;
`;

function SubwayMain() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subName, setSubName] = useState("");
  const [markers, setMarkers] = useState([]);
  const [staInfo, setStaInfo] = useState([]);
  const [subTimeUp, setSubTimeUp] = useState([]);
  const [subTimeDown, setSubTimeDown] =useState([]);
  const [satListUp, setSatListUp] =useState([]);
  const [satListDown, setSatListDown] =useState([]);
  const [sunListUp, setSunListUp] = useState([]);
  const [sunListDown, setSunListDown] = useState([]);
  const [subExit, setSubExit] = useState([]);
  const [toggleValue, setToggleValue] = useState(null);
  const [subTimeInfo, setSubTimeInfo] = useState([]);
  const [dayClicks, setDayClicks] = useState("a");

  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap();
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  function onChanged(e) {
    if (e != undefined) {
     //????????? ???????????? ?????? console.log(e.target.value);
      setSubName(e.target.value);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    onChanged();
  }, [subName]);
  //[subName]??? ????????? ????????? useEffect ?????? ?????? onChanged()??? ???????????? ???

  function onToggle(e){
    console.log(e.target.value);
   if(e.target.value != "time"){
     setToggleValue("exit")
   } else{
     setToggleValue("time")
   }
  }

  function backClick(e){ 
    setToggleValue(null);
  }

  function dayClick(e){
    // console.log(e.target.value);
    if(e.target.value == "a"){
      setDayClicks("a");
    } else if(e.target.value == "b"){
      setDayClicks("b");
    } else if(e.target.value == "c"){
      setDayClicks("c");
    }

  }


  function submit(e) {
    e.preventDefault();
  //????????? ???????????? ??????  console.log(subName);
    subInfo(subName);
  }
  
  async function subInfo(data) {
    removeMarkers();

    let subName = data;

    let stationInfo = await SubwayApi.getSubName(subName).catch((error) => console.log(error));
    //console.log(stationInfo)

    let subInfo = await SubwayApi.getSubInfo(stationInfo.stationID).catch((error) => console.log(error));
    console.log(subInfo)
    
    let result = subInfo.exitInfo.gate.sort((a, b) => {
      let valueA = parseInt(a.gateNo)
      let valueB = parseInt(b.gateNo)
      return valueA - valueB;

    }) 
    console.log(result)
    
    setSubExit(subInfo.exitInfo.gate)
    setStaInfo(subInfo)
  


    let subTime = await SubwayApi.getSubTime(stationInfo.stationID);
    console.log(subTime);
    setSubTimeInfo(subTime);
    setSubTimeUp(subTime.OrdList.up.time);
    setSubTimeDown(subTime.OrdList.down.time);
    setSatListUp(subTime.SatList.up.time);
    setSatListDown(subTime.SatList.down.time);
    setSunListUp(subTime.SunList.up.time);
    setSunListDown(subTime.SunList.down.time);

    

    let points = [new kakao.maps.LatLng(stationInfo.y, stationInfo.x)];
    let bounds = new kakao.maps.LatLngBounds();

    let i, marker;
    for (i = 0; i < points.length; i++) {
      // ????????? ???????????? ??? ????????? ????????? ????????? ???????????????
      marker = new kakao.maps.Marker({ position: points[i], clickable: true });
      marker.setMap(map);
      setMarkers((current) => [...current, marker]);

      // LatLngBounds ????????? ????????? ???????????????
      bounds.extend(points[i]);

      var iwContent = stationInfo.stationName + "<br>" + stationInfo.laneName, // ?????????????????? ????????? ???????????? HTML ??????????????? document element??? ???????????????
        iwRemoveable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        // ?????? ?????? ?????????????????? ???????????????
        infowindow.open(map, marker);
      });
    }
    map.setBounds(bounds);

    function removeMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }

  }

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    subInfo();
  }, [map]);

  return (
    <div className="Mobility">
      <SideNav>
        <MIcon />
        <Ul></Ul>
        <BarContainer>
          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
            <TextField
              sx={{ left: "15px", width: "360px" }}
              size="small"
              id="subName"
              name="subName"
              value={subName}
              onChange={onChanged}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  return submit;
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <SearchIcon />{" "}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          { toggleValue == null && staInfo != undefined && staInfo.length !=0 ? (
            <>
            <SubWaySearchName>{staInfo.stationName} {staInfo.laneName}</SubWaySearchName>
            <LocationIcon><RoomIcon/></LocationIcon>
            <CallIcon><LocalPhoneIcon/></CallIcon>
              <Address>{staInfo.defaultInfo.address}</Address>
              <NewAddress>
                <NewAddressBox>??????</NewAddressBox>
                {staInfo.defaultInfo.new_address}
                </NewAddress>
                <CallNum>{staInfo.defaultInfo.tel}</CallNum>
                <Line></Line>
                <TimeBtn onClick={onToggle} value="time">?????????</TimeBtn>
                <ExitBtn1 onClick={onToggle} value="exit">????????????</ExitBtn1>
                <SubInfo>?????? ??????</SubInfo>
                <Info>??????</Info>
                <DetailInfo>
                  {
                    staInfo.useInfo.platform == 1 ? <p>????????? ??????</p> : (
                      staInfo.useInfo.platform == 2 ? <p>????????? ??????</p> : (
                        staInfo.useInfo.platform == 3 ? <p>????????? ??????</p> : <p>????????? ?????????</p>
                      )
                    )
                  }<br/>
                  {
                    staInfo.useInfo.offDoor == 0 ? <p>????????? ??? ??????</p> : (
                      staInfo.useInfo.offDoor == 1 ? <p>????????? ??? ?????????</p> : <p>????????? ??? ??????</p>
                    )
                  }<br/>
                  {
                    staInfo.useInfo.restroom == 0 ? <p>????????? ??????</p> : (
                      staInfo.useInfo.restroom == 1 ? <p>????????? ??????</p> : (
                        staInfo.useInfo.restroom == 2 ? <p>????????? ?????????</p> : (
                          staInfo.useInfo.restroom == 3 ? <p>????????? ????????? ??????</p> : <p>????????? ??????, ?????????</p>
                        )
                      )
                    )
                  }<br/>
                  {
                    staInfo.useInfo.crossover == 1 ? <p>????????? ?????? ??????</p> : (
                      staInfo.useInfo.crossover == 2 ? <p>????????? ?????? ???</p> : <p>????????? ????????? ??????</p>
                    )
                  }
                 
                </DetailInfo>
                <InfoIcon>
                  <DirectionsTransitIcon fontSize="small" /><br/>
                  <SensorDoorIcon fontSize="small"/><br/>
                  <WcIcon fontSize="small"/><br/>
                  <CompareArrowsIcon fontSize="small"/>
                </InfoIcon>
            </>
          ) : toggleValue == "time" && staInfo != undefined && staInfo.length !=0 ? (
            <>
             <TimeBtn onClick={onToggle} value="time">?????????</TimeBtn>
             <ExitBtn1 onClick={onToggle} value="exit">????????????</ExitBtn1>
             <BackBtn1 onClick={backClick} value="back"><ArrowBackIosNewIcon/></BackBtn1>
             <SubwayTimeName>{staInfo.stationName} {staInfo.laneName} (?????????)</SubwayTimeName>
             {dayClicks == "a" ? 
             <>
             <OrdBtn1 onClick={dayClick} value= "a">??????</OrdBtn1>
             <SatBtn onClick={dayClick} value= "b">?????????</SatBtn>
             <SunBtn onClick={dayClick} value= "c">??????</SunBtn>
             </> 
             :(dayClicks == "b" ? 
             <>
             <OrdBtn onClick={dayClick} value= "a">??????</OrdBtn>
             <SatBtn1 onClick={dayClick} value= "b">?????????</SatBtn1>
             <SunBtn onClick={dayClick} value= "c">??????</SunBtn>
             </> 
             :(dayClicks == "c" ? 
             <>
             <OrdBtn onClick={dayClick} value= "a">??????</OrdBtn>
             <SatBtn onClick={dayClick} value= "b">?????????</SatBtn>
             <SunBtn1 onClick={dayClick} value= "c">??????</SunBtn1>
             </> 
             :(
             <>
             <OrdBtn onClick={dayClick} value= "a">??????</OrdBtn>
             <SatBtn onClick={dayClick} value= "b">?????????</SatBtn>
             <SunBtn onClick={dayClick} value= "c">??????</SunBtn>
             </>)))}
             
             <StopObj>
             <PrevStop> {staInfo.prevOBJ.station[0].stationName} ??????</PrevStop>
             <NextStop> {staInfo.nextOBJ.station[0].stationName} ??????</NextStop>
             {dayClicks == "a" ? 
             <>
             {console.log("a")}
             <TimetableBox>
             {
               subTimeUp.map((item) => {
                 const num = () => {
                  var testString = item.list;
                  var regex = /[^0-9]/g;
                  var result = testString.replace(regex, " ");
                  return result;
                 }

                 const str = () => {
                  var testString = item.list;
                  var regex = /[0-9]/g;
                  var word = testString.replace(regex, "a");
                  var regex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
                  var result = word.replace(regex,"");
                  return result;
                 }

                 return (
                  <div>
                  <UpDownContain>
                  <TimeListUp>{item.Idx}</TimeListUp>
                  <MinutesListUp>{num()}</MinutesListUp>
                  <UpDownWay>{str()}</UpDownWay>
                  </UpDownContain>
                  </div>
                 )
               })
             }
             </TimetableBox>
             <TimetableBox1> 
               {
                 subTimeDown.map((item) => {
                  const num = () => {
                    var testString = item.list;
                    var regex = /[^0-9]/g;
                    var result = testString.replace(regex, " ");
                    return result;
                  }

                  const str = () => {
                    var testString = item.list;
                    var regex = /[0-9]/g;
                    var word = testString.replace(regex, "");
                    var regex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
                    
                    var result = word.replace(regex,"");
                    return result;
                   }

                   return (
                    <div>
                    <UpDownContain>
                    <TimeListDown>{item.Idx}</TimeListDown>
                    <MinutesListDown>{num()}</MinutesListDown>
                    <UpDownWay1>{str()}</UpDownWay1>
                    </UpDownContain>
                    </div>
                   )
                 })
               }
             </TimetableBox1>
             </> : (dayClicks == "b" ? 
             <> {console.log("b")}
             <TimetableBox>
             {
               satListUp.map((item) => {
                 const num = () => {
                  var testString = item.list;
                  var regex = /[^0-9]/g;
                  var result = testString.replace(regex, " ");
                  return result;
                 }

                 const str = () => {
                  var testString = item.list;
                  var regex = /[0-9]/g;
                  var word = testString.replace(regex, "a");
                  var regex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
                  var result = word.replace(regex,"");
                  return result;
                 }

                 return (
                  <div>
                  <UpDownContain>
                  <TimeListUp>{item.Idx}</TimeListUp>
                  <MinutesListUp>{num()}</MinutesListUp>
                  <UpDownWay>{str()}</UpDownWay>
                  </UpDownContain>
                  </div>
                 )
               })
             } 
             </TimetableBox>
             <TimetableBox1> 
               {
                 satListDown.map((item) => {
                  const num = () => {
                    var testString = item.list;
                    var regex = /[^0-9]/g;
                    var result = testString.replace(regex, " ");
                    return result;
                  }

                  const str = () => {
                    var testString = item.list;
                    var regex = /[0-9]/g;
                    var word = testString.replace(regex, "");
                    var regex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
                    
                    var result = word.replace(regex,"");
                    return result;
                   }

                   return (
                    <div>
                    <UpDownContain>
                    <TimeListDown>{item.Idx}</TimeListDown>
                    <MinutesListDown>{num()}</MinutesListDown>
                    <UpDownWay1>{str()}</UpDownWay1>
                    </UpDownContain>
                    </div>
                   )
                 })
               }
             </TimetableBox1>
             </> 
             
             : (
             <>{console.log("c")}
             <TimetableBox>
             {
               sunListUp.map((item) => {
                 const num = () => {
                  var testString = item.list;
                  var regex = /[^0-9]/g;
                  var result = testString.replace(regex, " ");
                  return result;
                 }

                 const str = () => {
                  var testString = item.list;
                  var regex = /[0-9]/g;
                  var word = testString.replace(regex, "a");
                  var regex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
                  var result = word.replace(regex,"");
                  return result;
                 }

                 return (
                  <div>
                  <UpDownContain>
                  <TimeListUp>{item.Idx}</TimeListUp>
                  <MinutesListUp>{num()}</MinutesListUp>
                  <UpDownWay>{str()}</UpDownWay>
                  </UpDownContain>
                  </div>
                 )
               })
             } 
             </TimetableBox>
             <TimetableBox1> 
               {
                 sunListDown.map((item) => {
                  const num = () => {
                    var testString = item.list;
                    var regex = /[^0-9]/g;
                    var result = testString.replace(regex, " ");
                    return result;
                  }

                  const str = () => {
                    var testString = item.list;
                    var regex = /[0-9]/g;
                    var word = testString.replace(regex, "");
                    var regex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
                    
                    var result = word.replace(regex,"");
                    return result;
                   }

                   return (
                    <div>
                    <UpDownContain>
                    <TimeListDown>{item.Idx}</TimeListDown>
                    <MinutesListDown>{num()}</MinutesListDown>
                    <UpDownWay1>{str()}</UpDownWay1>
                    </UpDownContain>
                    </div>
                   )
                 })
               }
             </TimetableBox1>
             
             </>)) }
             
             </StopObj>
             

            </>
          ) : toggleValue == "exit" && staInfo != undefined && staInfo.length !=0 ?(
            <>
             <BackBtn onClick={backClick} value="back"><ArrowBackIosNewIcon/></BackBtn>
             <SubwayName>{staInfo.stationName}??? {staInfo.laneName}</SubwayName>
             <HeadLine/>
             <ExitGateInfo>????????????????????</ExitGateInfo>
             <ExitBox>
             { subExit.map((item) => {
               const arr = () => {
                 let temp = "";
                if(item.gateLink.length!=0){
                  for(var i=0; i<item.gateLink.length; i++){
                    if(i==item.gateLink.length-1) temp += `${item.gateLink[i]}`
                    else temp += `${item.gateLink[i]}, `
                  }
                  return temp
                }
                else return;
               }
                    return (
                        <ExitNum> {item.gateNo}
                          <ExitGate>{arr()}</ExitGate>
                        </ExitNum>
                    );
                  })
                }
             </ExitBox>
             <></>
            </>
          ) : 
          <>
            <Text>?????? ??????</Text>
              <Line1></Line1>
              <Text1>??????????????? ??????</Text1>
              <Line2></Line2>
          </> 
          
        }
        </BarContainer>
      </SideNav>
      <Map />
    </div>
  );
}

SubwayMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SubwayMain;