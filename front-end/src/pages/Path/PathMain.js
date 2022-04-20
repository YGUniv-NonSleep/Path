import { useEffect, useState } from "react";
import { PathApi } from "../../api/OdsayApi";
import MapApi from "../../api/MapApi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Map from "../../components/Map";
import PathList from "./PathList";
import {
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Icon from "../../components/Icon"

const SideNav = styled.nav`
  position: fixed;
  left: 95px;
  z-index: 5;
  background-color: white;
  box-shadow: 3px 3px 3px gray;
  width: 390px;
  height: 100%;
`;
const SearchArea = styled.div`
  position: relative;
  height: 25%;
  margin-left: 20px;
  margin-top: 5px;
`;
const DirectionSummaryList = styled.div`
  position: relative;
  height: 75%;
`;

const SwitchButton = styled.button`
  z-index: 5;
  position: absolute;
  left: 280px;
  top: 103px;
  border: 1px solid #9E9E9E;
  cursor:pointer; cursor:hand;
  background-color: white;
  width: 30px;
  height: 30px;
  -webkit-border-radius: 30px;
`;
function PathMain() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [way, setWay] = useState([]); // 찾은 경로
  const [polyLine, setPolyLine] = useState([]); // 그래픽 데이터
  const [jusoValue, setJusoValue] = useState([]); // 가져온 주소 받아서 띄워줄 배열 state
  const [SPoint, setSPoint] = useState(""); // 출발지 주소창
  const [APoint, setAPoint] = useState(""); // 도착지 주소창
  const [insertPoint, setInsertPoint] = useState(""); // 입력에 반응하는 창 state
  // 카카오 지도를 불러오는 함수
  // MapApi 기능들 전부 함수화 시키기 호출할 때마다 필요 없는 것도 많이 호출 함.
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
  // 처음 접속시 세팅 Effect Hook
  useEffect(() => {
    mapLoad();
  }, []);
  // 출발지를 저장하는 함수
  const onchangeSP = (e, sp) => {
    // setSPoint(e.target.innerText)
    setInsertPoint(sp);
    setSPoint(sp);
    // console.log(sp)
    // console.log(SPoint)
  };
  // 도착지를 저장하는 함수
  const onchangeAP = (e, ap) => {
    setInsertPoint(ap);
    setAPoint(ap);
    // console.log(ap)
  };
  // 다시입력을 수행하는 함수
  const refreshPoints = (e) => {
    // console.log(e.target)
    setInsertPoint("");
    setSPoint("");
    setAPoint("");
  };
  // 출발지 도착지 전환하는 함수
  const switchPoints = () => {
    let temp = SPoint;
    setSPoint(APoint);
    setAPoint(temp);
  };
  function placeSearch() {
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(insertPoint, function (result, status, pagination) {
      if (status === daum.maps.services.Status.OK) {
        // console.log(result)
        let k = result.map((item) => {
          const data = {
            pN: item.place_name,
            aN: item.address_name,
            // x: item.x,
            // y: item.y,
          };
          return data;
        });
        // console.log(k)
        setJusoValue([...k]);
      } else return "몬가... 잘못됨..";
    });
  }
  // 장소 검색 로직
  useEffect(() => {
    placeSearch();
  }, [insertPoint]);
  function getKeywordLatLng(data) {
    // console.log(data)
    const ps = new kakao.maps.services.Places();
    for(var i=0; i<data.length; i++){
      let idx = data[i].indexOf("(");
      let string = data[i].substr(0, idx - 1);
      ps.keywordSearch(string, function (result, status, pagination) {
        if (status === daum.maps.services.Status.OK) {
          let k = result.filter((item) => {
              // console.log(item.place_name)
              return item.place_name === string
          });
           // console.log(k)
          setWay((cur) => [...cur, k[0]])
        } else return console.log("몬가... 몬가... 잘못됨..");
      })
    }
  }
  function wayFind() {
    try {
      setWay([])
      // 출발지, 도착지의 위도, 경도 얻음
      getKeywordLatLng([SPoint, APoint]); // 이친구들의 콜백이 끝나야 X, Y 좌표를 얻을 수 있음
    } catch (error) {
      console.log(error);
    }
  }
  async function pathSearch(idx){
    if(idx == undefined) idx = 0
    let pathWay = await PathApi.getDirection({
      sx: way[0].x, sy: way[0].y,
      ex: way[1].x, ey: way[1].y
    }).catch((error) => console.log(error));
    // console.log(pathWay)
    // pathWay 다양한 경로
    const mapObj = pathWay.path.map((mo) => {
      return mo.info.mapObj;
    });
    // console.log(mapObj)
    let graphicData = await PathApi.getGraphicRoute(mapObj).catch((error) =>
      console.log(error)
    );
    // console.log(graphicData)
    const sp = await MapApi().drawKakaoMarker(way[0].x, way[0].y);
    sp.setMap(map);
    const ap = await MapApi().drawKakaoMarker(way[1].x, way[1].y);
    ap.setMap(map);
    // graphicData -> list -> 사용자의 입력에 따라 다르게 그리기
    const dkpl = MapApi().drawKakaoPolyLine(graphicData[idx].lane);
    console.log(dkpl.polyline)
    dkpl.polyline.setMap(map);
     // console.log(graphicData[0].boundary) // 사용자 입력에 따른 번호 변화
    if(graphicData[idx].boundary) {
      // console.log("boundary ar")
      let points = [
        new kakao.maps.LatLng(way[0].y, way[0].x),
        new kakao.maps.LatLng(way[1].y, way[1].x),
      ];
      // console.log(points)
      // 여기서 points 벌써부터 다들어와있노? 실행순서 야랄났네
      for(var i=0; i<dkpl.lineArray.length; i++){
        points.push(new kakao.maps.LatLng(dkpl.lineArray[i].Ma, dkpl.lineArray[i].La))
      }
      console.log(points)
      let bounds = new kakao.maps.LatLngBounds();
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      // console.log(bounds)
      map.setBounds(bounds);
      // const moving = moveMapLatLon(map.getCenter());
      // map.panTo(moving);
    }
  }
  useEffect(() => {
    if(way.length == 2) {
      pathSearch()
      //setWay([])
    } else return // console.log(way.length)
  }, [way])
  // 맵의 정보를 가져옴
  // async function getMapInfo(mapData) {
  //   let info = await MapApi().getInfo(mapData);
  //   console.log(info);
  //   return info;
  // }
  // 맵을 옆으로 보기좋게 이동시켜줌
  // function moveMapLatLon(data) {
  //   let moveLatLon = new kakao.maps.LatLng(data.Ma, data.La - 0.0);
  //   return moveLatLon;
  // }
  // useEffect(() => {
  //   // getMapInfo(map)
  // }, [map]);

  let jusoOption = jusoValue.map((it) => {
    // console.log(it)
    return `${it.pN} (${it.aN})`
  })

  return (
    <div className="Path">
      <SideNav>
        <SearchArea>
          <Icon></Icon>
          <Autocomplete
            value={SPoint}
            onInputChange={onchangeSP}
            id="sp-input"
            options={jusoOption}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Start" />}
          ></Autocomplete>
          <Autocomplete
            value={APoint}
            onInputChange={onchangeAP}
            id="ap-input"
            options={jusoOption}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Arrival" />}
          ></Autocomplete>
          <SwitchButton onClick={switchPoints}>↑↓</SwitchButton>
          <Box sx={{ width: 350, marginTop: 1 }}>
            <Stack direction="row" spacing={2}>
              <Grid>
                <Button
                  variant="outlined"
                  sx={{ width: 80, height: 35, marginRight: "10px" }}
                  startIcon={<AutorenewIcon sx={{ marginLeft: -1 }} />}
                  onClick={refreshPoints}
                ><Typography variant="inherit" sx={{ width: 40, fontSize: 10 }}>
                  다시입력
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: 80, height: 35 }}
                  startIcon={<AddIcon sx={{ marginLeft: -1 }} />}
                ><Typography variant="inherit" sx={{ fontSize: 10 }}>
                  경유지
                 </Typography>
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  sx={{ width: 80, height: 35, marginLeft: "84px" }}
                  endIcon={<ChevronRightIcon sx={{ marginRight: -1 }} />}
                  onClick={wayFind}
                ><Typography variant="inherit" align="left" sx={{ fontSize: 11 }}>
                  길 찾기
                 </Typography>
                </Button>
              </Grid>
            </Stack>
          </Box>
        </SearchArea>
        <DirectionSummaryList>
          {/* <button onClick={() => pathSearch(0)}>0</button> */}
          <PathList></PathList>
        </DirectionSummaryList>
      </SideNav>
      {loading ? null : <h2>로드 중...</h2>}
      <Map />
    </div>
  );
}
PathMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default PathMain;