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
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import WcIcon from '@mui/icons-material/Wc';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

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

const Btn = styled.button`
  position: absolute;
  top: 160px;
  left: 10px;
  width: 182px;
  height: 40px;
  font-size: 12px;
`;

const Btn1 = styled.button`
  position: absolute;
  top: 160px;
  left: 200px;
  width: 180px;
  height: 40px;
  font-size: 12px;
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

function SubwayMain() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subName, setSubName] = useState("");
  const [markers, setMarkers] = useState([]);
  const [staInfo, setStaInfo] = useState([]);
  const [subTime, setSubTime] =useState([]);
  const [toggleValue, setToggleValue] = useState(null);

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
     //검색한 지하철역 이름 console.log(e.target.value);
      setSubName(e.target.value);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    onChanged();
  }, [subName]);
  //[subName]이 실행될 때마다 useEffect 안에 있는 onChanged()를 실행하는 것

  function onToggle(e){
   if(e.target.value != "time"){
     setToggleValue("exit")
   } else{
     setToggleValue("time")
   }
  }

  function submit(e) {
    e.preventDefault();
  //검색한 지하철역 이름  console.log(subName);
    subInfo(subName);
  }
  
  async function subInfo(data) {
    removeMarkers();

    let subName = data;

    let stationInfo = await SubwayApi.getSubName(subName).catch((error) => console.log(error));
    //console.log(stationInfo)

    let subInfo = await SubwayApi.getSubInfo(stationInfo.stationID).catch((error) => console.log(error));
    console.log(subInfo)

    setStaInfo(subInfo)

    let subTime = await SubwayApi.getSubTime(stationInfo.stationID);
    console.log(subTime)

    //setSubTime(subTime)

    let points = [new kakao.maps.LatLng(stationInfo.y, stationInfo.x)];
    let bounds = new kakao.maps.LatLngBounds();

    let i, marker;
    for (i = 0; i < points.length; i++) {
      // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
      marker = new kakao.maps.Marker({ position: points[i], clickable: true });
      marker.setMap(map);
      setMarkers((current) => [...current, marker]);

      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(points[i]);

      var iwContent = stationInfo.stationName + "<br>" + stationInfo.laneName, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다
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

        {/* { loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> } */}

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
            <LocationIcon><RoomIcon/></LocationIcon>
            <CallIcon><LocalPhoneIcon/></CallIcon>
              <Address>{staInfo.defaultInfo.address}</Address>
              <NewAddress>
                <NewAddressBox>지번</NewAddressBox>
                {staInfo.defaultInfo.new_address}
                </NewAddress>

                <CallNum>{staInfo.defaultInfo.tel}</CallNum>
                <Line></Line>
                <Btn onClick={onToggle} value="time">시간표</Btn>
                <Btn1 onClick={onToggle} value="exit">출구정보</Btn1>
                <SubInfo>시설 정보</SubInfo>
                <Info>정보</Info>
                <DetailInfo>
                  {
                    staInfo.useInfo.platform == 1 ? <p>플랫폼 중앙</p> : (
                      staInfo.useInfo.platform == 2 ? <p>플랫폼 양쪽</p> : (
                        staInfo.useInfo.platform == 3 ? <p>플랫폼 복선</p> : <p>플랫폼 일방향</p>
                      )
                    )
                  }<br/>
                  {
                    staInfo.useInfo.offDoor == 0 ? <p>내리는 문 왼쪽</p> : (
                      staInfo.useInfo.offDoor == 1 ? <p>내리는 문 오른쪽</p> : <p>내리는 문 양쪽</p>
                    )
                  }<br/>
                  {
                    staInfo.useInfo.restroom == 0 ? <p>화장실 없음</p> : (
                      staInfo.useInfo.restroom == 1 ? <p>화장실 안쪽</p> : (
                        staInfo.useInfo.restroom == 2 ? <p>화장실 바깥쪽</p> : (
                          staInfo.useInfo.restroom == 3 ? <p>화장실 환승역 연결</p> : <p>화장실 안쪽, 바깥쪽</p>
                        )
                      )
                    )
                  }<br/>
                  {
                    staInfo.useInfo.crossover == 1 ? <p>반대편 연결 안됨</p> : (
                      staInfo.useInfo.crossover == 2 ? <p>반대편 연결 됨</p> : <p>반대편 환승역 연결</p>
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
          ) : 
          <>
            
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