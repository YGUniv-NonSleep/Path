import PropTypes from "prop-types";
import styled from "styled-components";
import MIcon from "../MIcon";
import Map from "../../../components/Map";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import useLoading from "../../../hooks/useLoading";
import useBusInfo from "../hooks/useBusInfo";

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
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
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
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const Line2 = styled.hr`
  position: absolute;
  top: 320px;
  left: 15px;
  width: 350px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
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

const BusBtn = styled.div`
  position: absolute;
  top: 95px;
  left: 15px;
  width: 180px;
  height: 40px;
`;

const BusStopBtn = styled.div`
  position: absolute;
  top: 95px;
  left: 195px;
  width: 180px;
  height: 40px;
 
`;

const BusStopList = styled.div`
  position: absolute;
  top: 350px;
  left: 30px;
  width: 350px;
  height: 600px;
  border: none;
  overflow: scroll;
`;
const BusListBtn = styled.button`
width: 300px;
height: 70px;
border: 0;
border-bottom: 1px solid rgb(184, 184, 184);
font-size: 15px;
text-align: left;
background-color: white;
&:hover {
  background-color: rgb(248, 252, 255, 0.925);
}
`;

const SearchResult = styled.div`
position: relative;
top: 0px;
width: 350px;
height: 70px;
// background-color: pink;
border-bottom: 1px solid rgb(194, 194, 194, 0.849);
`;

const BusStayList = styled.div`
position: absolute;
top: 200px;
left: 20px;
width: 350px;
height: 78%;
border: none;
overflow: scroll;
// background-color: gray;
`;

const BusStayList1 = styled.button`
position: relative;
top: 5px;
width: 350px;
height: 70px;
border: 0;
border-bottom: 1px solid rgb(194, 194, 194, 0.849);
font-size: 15px;
text-align: left;
background-color: white;
&:hover {
  background-color: rgb(240, 251, 255, 0.842);
}
// background-color: green;
`;

function BusMain() {
  const { loading } = useLoading();
  const { 
    busNo, busList, busStop, toggleValue, 
    onChanged, submit, onToggle
  } = useBusInfo();
  // console.log(toggleValue)

  return (
    <div className="Mobility">
      <SideNav>
        {/* { loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> } */}
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
                { busList.station.map((item)=>{
                    // console.log(item)
                    return(
                      <div>
                      <BusListBtn>{item.stationName}</BusListBtn>
                      </div>
                    ) 
                  })
                }
              </BusStopList>
            </>
          ) : toggleValue == "busStop" && busStop != undefined && busStop.length != 0 ? (
            <>
              <BusStayList>
              <SearchResult>hello</SearchResult>
                { busStop.map((item)=> {
                    return (
                      <div>
                        <BusStayList1>{item.stationName}</BusStayList1>
                      </div>
                    );
                  })
                }
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
          <BusBtn>
            <Button variant="outlined" size="large" onClick={onToggle} value="bus"
            style={{
              maxWidth: "150px",
              maxHeight: "50px",
              minWidth: "170px",
              minHeight: "45px"
            }}> 버스</Button>
            </BusBtn>
          <BusStopBtn>
          <Button variant="outlined" onClick={onToggle} value="busStop"
          style={{
          maxWidth: "150px",
          maxHeight: "50px",
          minWidth: "170px",
          minHeight: "45px"
        }} >버스 정류장</Button>
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
