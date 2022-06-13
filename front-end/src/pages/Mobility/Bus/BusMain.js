import PropTypes from "prop-types";
import styled from "styled-components";
import MIcon from "../MIcon";
import Map from "../../../components/Map";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import useLoading from "../../../hooks/useLoading";
import useBusInfo from "../hooks/useBusInfo";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

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
  z-index: 10;
  width: 390px;
  height: 90%;
  margin-top: 150px;
`;

const Text = styled.p`
  position: absolute;
  top: 230px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line = styled.hr`
  position: absolute;
  top: 250px;
  left: 15px;
  width: 350px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const Text1 = styled.p`
  position: absolute;
  top: 400px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line1 = styled.hr`
  position: absolute;
  top: 420px;
  left: 15px;
  width: 350px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const Line2 = styled.hr`
  position: absolute;
  top: 320px;
  left: 15px;
  width: 350px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const BusNum = styled.div`
  position: absolute;
  top: 210px;
  left: 40px;
  font-size: 22px;
  font-weight: bold;
`;

const BusIcon = styled.div`
  position: absolute;
  top: 210px;
  left: 10px;
`;

const BusRunTime = styled.div`
  position: absolute;
  top: 260px;
  left: 30px;
  font-size: 14px;
  color: rgb(138, 138, 138);
`;

const BusRunTime1 = styled.div`
  position: absolute;
  top: 260px;
  left: 100px;
  font-size: 14px;
  color: rgb(102, 102, 102);
`;

const BusStep = styled.div`
  position: absolute;
  top: 290px;
  left: 30px;
  font-size: 14px;
  color: rgb(138, 138, 138);
`;

const BusStep1 = styled.div`
  position: absolute;
  top: 290px;
  left: 100px;
  font-size: 14px;
  color: rgb(102, 102, 102);
`;

const BusBtn = styled.button`
  position: absolute;
  top: 95px;
  left: 15px;
  width: 180px;
  height: 40px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 7px;
  &:hover {
    color: blue;
  }
`;

const BusStopBtn = styled.button`
  position: absolute;
  top: 95px;
  left: 195px;
  width: 180px;
  height: 40px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 7px;
  &:hover {
    color: blue;
  }
`;

const BusStopList = styled.div`
  position: absolute;
  top: 330px;
  left: 30px;
  width: 350px;
  height: 600px;
  border: none;
  overflow: scroll;
`;
const BusListBtn = styled.button`
  width: 320px;
  height: 70px;
  border: 0;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
  text-align: left;
  background-color: white;
  &:hover {
    background-color: rgb(248, 252, 255, 0.925);
  }
`;

const BusStayList = styled.div`
  position: absolute;
  top: 250px;
  width: 100%;
  height: 74%;
  border: none;
  overflow: scroll;
`;

const BusStayList1 = styled.button`
  width: 100%;
  height: 150px;
  border: 0;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  text-align: left;
  background-color: transparent;
  &:hover {
    background-color: rgb(240, 251, 255, 0.842);
  }
`;

const BusStopList1 = styled.button`
  position: relative;
  left: 5px;
  bottom: 45px;
  border: 0;
  outline: 0;
  width: 100%;
  text-align: left;
  color: #386de8;
  font-size: 17px;
  font-weight: bold;
  background-color: transparent;
`;

const BusStayListInfo = styled.button`
  position: relative;
  top: 33px;
  left: 5px;
  border: 0;
  outline: 0;
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #8f8f8f;
  background-color: transparent;
`;

const BusStopNum = styled.button`
  position: relative;
  top: 25px;
  left: 5px;
  border: 0;
  outline: 0;
  text-align: left;
  bottom: 20px;
  width: 100%;
  height: auto;
  font-size: 13px;
  background-color: transparent;
`;

const SearchResult = styled.div`
  position: relative;
  top: 20px;
  left: 10px;
  text-align: left;
  width: 95%;
  height: 40px;
  word-break: break-all;
  font-size: 15px;
  font-weight: bold;
`;

const Line3 = styled.hr`
  position: relative;
  top: 12px;
  z-index: 10;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const BackBtn = styled.button`
  position: absolute;
  top: 200px;
  left: 5px;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const BackBtn1 = styled.button`
position: relative;
top: 8px;
left: 7px;
width: 40px;
height: 40px;
border: none;
cursor: pointer;
background-color: transparent;
`;

const BusStopName = styled.div`
position: absolute;
top: 207px;
left 50px;
font-size: 22px;
font-weight: bold;
`;

const BusCLickList = styled.div`
  position: relative;
  top: 55px;
  left: 10px;
  width: 97%;
  height: 82%;
  border: 0;
  outline: 0;
  border-top: 1px solid #ccc;
  background-color: white;
  overflow: scroll;
`;

const ListBusInfo = styled.button`
  position: relative;
  top: 2px;
  bottom: 20px;
  width: 100%;
  height: 120px;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  &:hover {
    background-color: #fafafb;
  }
`;

const ListBusIcon = styled.button`
  position: relative;
  bottom: 50px;
  right: 85%;
  border: 0;
  outline: 0;
  background-color: transparent;
`;

const ListBusNo = styled.button`
  position: relative;
  right: 50px;
  width: 50%;
  color: #333333;
  text-align: left;
  font-size: 19px;
  font-weight: bold;
  outline: 0;
  border: 0;
  background-color: transparent;
`;

const ListBusCity = styled.button`
  position: relative;
  right: 66%;
  top: 29px;
  border: 0;
  outline: 0;
  width: auto;
  font-size: 12px;
  text-align: left;
  color: #333333;
  background-color: transparent;
`;

const ListBusStartPoint = styled.button`
  position: relative;
  bottom: 24px;
  left: 20px;
  width: 75%;
  border: 0;
  outline: 0;
  text-align: left;
  font-size: 11px;
  background-color: transparent;
`;

const Line4 = styled.hr`
  position: relative;
  top: 6px;
  right: 36%;
  border: 0;
  width: 1px;
  height: 10px;
  background: #ccc;
`;

const ArrowIcon = styled.button`
  position: relative;
  top: 6px;
  border: 0;
  outline: 0;
  background-color: transparent;
`;

const BusStayClick = styled.div`
  position: absolute;
  top: 190px;
  width: 100%;
  height: 80%;
  background-color: transparent;
`;

const BusDetailInfoBox = styled.div`
position: relative;
width: 100%;
height: 145px;
border-bottom: 1px solid #ccc;
`;

const BusDetailBusNum = styled.div`
position: relative;
bottom: 53px;
left: 80px;
width: 70%;
font-weight: bold;
font-size: 25px;
`;

const BusLineDetailBox = styled.div`
position: relative;
width: 100%;
height: 81%;
overflow:scroll;
`;

const BusLineInfoBox = styled.div`
position: relative;
width: 100%;
height: 60px;
border-bottom: 1px solid #ccc;
background-color: transparent;
&:hover {
  background-color: #F2FCFF;
}
`;

const BusLineName = styled.div`
position: relative;
top: 35%;
left: 10px;
width: 90%;
`;

const BusDetailIcon = styled.div`
  position: relative;
  bottom: 25px;
  left: 50px;
`;

const BusDetailRunTime = styled.div`
  position: relative;
  bottom: 25px;
  left: 30px;
  width: 60px;
  font-size: 14px;
  color: rgb(138, 138, 138);
`;

const BusDetailRunTime1 = styled.div`
  position: relative;
  bottom: 40px;
  left: 100px;
  font-size: 14px;
  color: rgb(102, 102, 102);
`;

const BusDetailStep = styled.div`
  position: relative;
  bottom: 15px;
  left: 30px;
  width: 60px;
  font-size: 14px;
  color: rgb(138, 138, 138);
`;

const BusDetailStep1 = styled.div`
  position: relative;
  bottom: 30px;
  left: 100px;
  font-size: 14px;
  color: rgb(102, 102, 102);
`;

function BusMain() {
  const { loading } = useLoading();
  const {
    busNo,
    busList,
    busStop,
    toggleValue,
    onChanged,
    submit,
    onToggle,
    busStopClick,
    busStopValue,
    searchValue,
    busClickValue,
    busValue,
    backClick,
    clickBack,
    busStopInfo,
    busStopList,
    busStopClickList,
    busLineDetail,
  } = useBusInfo();

  return (
    <div className="Mobility">
      <SideNav>
        <MIcon />
        <BarContainer>
          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
            <TextField
              sx={{ left: "15px", width: "360px" }}
              size="small"
              id="busNo"
              name="busNo"
              value={busNo}
              //value={busStay}
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
          {toggleValue == "bus" && busList != undefined && busList.length != 0 ? (
            <>
              <BusNum>{busList.busNo}</BusNum>
              <BusIcon>
                <DirectionsBusIcon color="primary" />
              </BusIcon>
              <BusRunTime>운행시간</BusRunTime>
              <BusRunTime1>
                첫차 {busList.busFirstTime}, 막차 {busList.busLastTime}
              </BusRunTime1>
              <BusStep>배차간격</BusStep>
              <BusStep1>
                평일 {busList.bus_Interval_Week}분, 주말{" "}
                {busList.bus_Interval_Sat}분
              </BusStep1>
              <Line2 />

              <BusStopList>
                {busList.station.map((item) => {
                  return (
                    <div>
                      <BusListBtn onClick={(e) => { busClickValue(item.y, item.x, e);}} value="stopValue">
                        {item.stationName}
                      </BusListBtn>
                      {busValue == "stopValue" && busList != undefined && busList.length != 0 ? (
                        <div> {} </div>
                      ) : (
                        <> </>
                      )}
                    </div>
                  );
                })}
              </BusStopList>
            </>
          ) : busStopValue == "busStopClick" && toggleValue == "busStop" && busStop != undefined && busStop.length != 0 ? (
            <>
              { busStopClickList == "busStopList" ? 
                <BusStayClick> 
                  {console.log(busLineDetail)}
                  <BusDetailInfoBox>
                  <BackBtn1 onClick={clickBack} value="back"> <ArrowBackIosNewIcon /> </BackBtn1>
                  <BusDetailIcon><DirectionsBusIcon color="primary" /></BusDetailIcon>
                  <BusDetailBusNum>{busLineDetail.busNo}</BusDetailBusNum>
                  <BusDetailRunTime>운행시간</BusDetailRunTime>
                  <BusDetailRunTime1> 첫차 {busLineDetail.busFirstTime}, 막차 {busLineDetail.busLastTime}</BusDetailRunTime1>
                    <BusDetailStep>배차간격</BusDetailStep>
                    <BusDetailStep1> 평일 {busLineDetail.bus_Interval_Week}분, 주말{" "} {busLineDetail.bus_Interval_Sat}분 </BusDetailStep1>
                  
                  </BusDetailInfoBox>
                  
                  <BusLineDetailBox>
 
                    { busLineDetail.station.map((item) => {
                      return (
                        <BusLineInfoBox>
                        <BusLineName> {item.stationName} </BusLineName>
                        </BusLineInfoBox>
                      )
                    })
                    }
                  </BusLineDetailBox>

              </BusStayClick> :(  
                <>
              <BackBtn onClick={backClick} value="back"> <ArrowBackIosNewIcon /> </BackBtn>
              <BusStopName>{busStopInfo.stationName}</BusStopName>
              <BusCLickList>
                {busStopInfo.lane.map((item) => {
                  return (
                    <ListBusInfo onClick={(e) => {busStopList(item.busID, e);}} value="busStopList">
                      <ListBusNo onClick={(e) => {busStopList(item.busID, e);}} value="busStopList">
                        {item.busNo}
                      </ListBusNo>
                      <ListBusCity onClick={(e) => {busStopList(item.busID, e);}} value="busStopList">
                        {" "}
                        {item.busCityName}{" "}
                      </ListBusCity>
                      <Line4 />

                      <ListBusStartPoint onClick={(e) => {busStopList(item.busID, e);}} value="busStopList">
                        {item.busStartPoint}{" "}
                        <ArrowIcon onClick={busStopList} value="busStopList">
                          <SwapHorizIcon sx={{ fontSize: 20, color: "#ccc" }} />{" "}
                        </ArrowIcon>{" "}
                        {item.busEndPoint}
                      </ListBusStartPoint>
                      <ListBusIcon onClick={(e) => {busStopList(item.busID, e);}} value="busStopList">
                        <DirectionsBusIcon
                          sx={{ fontSize: 20, color: "#386DE8" }}
                        />
                      </ListBusIcon>
                    </ListBusInfo>
                  );
                })}
              </BusCLickList>
                </>
                )}
            </>
          ) : busStopValue != "busStopClick" &&busStop.length != 0 && toggleValue == "busStop" && busStop.length != 0 ? (
            <>
              <SearchResult>
                '{busStop[0].do} {busStop[0].gu}' 중심의 '{searchValue}' 정류장
                검색 결과
              </SearchResult>
              <Line3 />
              <BusStayList>
                {busStop.map((item) => {
                  const num = () => {
                    var testString = item.arsID;
                    var regex = /[^0-9]/g;
                    var result = testString.replace(regex, " ");
                    return result;
                  };
                  return (
                    <BusStayList1 onClick={(e) => { busStopClick(item.stationID, e);}} value="busStopClick" >
                      <BusStopNum onClick={(e) => {busStopClick(item.stationID, e); }}value="busStopClick" >
                        {num()}
                      </BusStopNum>
                      <BusStayListInfo onClick={(e) => { busStopClick(item.stationID, e);}} value="busStopClick">
                        {item.do} {item.gu} {item.dong}
                      </BusStayListInfo>
                      <BusStopList1 onClick={(e) => { busStopClick(item.stationID, e);}} value="busStopClick">
                        {item.stationName}
                      </BusStopList1>
                    </BusStayList1>
                  );
                })}
              </BusStayList>
            </>
          ) : (
            <>
              <Text>최근 검색</Text>
              <Line></Line>
              <Text1>즐겨찾기한 목록</Text1>
              <Line1></Line1>
            </>
          )}
          <BusBtn onClick={onToggle} value="bus">
            버스
          </BusBtn>
          <BusStopBtn onClick={onToggle} value="busStop">
            버스 정류장
          </BusStopBtn>
        </BarContainer>
      </SideNav>
      <Map />
    </div>
  );
}

BusMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BusMain;
