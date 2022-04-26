import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { MobilityApi } from "../../../api/OdsayApi";
import PropTypes from "prop-types";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MIcon from "../MIcon";
import Box from "@mui/material/Box";
import Map from "../../../components/Map";

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
  margin-top: 100px;
`;

const Ul = styled.ul`
  position: fixed;
  top: 75px;
  left: 110px;
`;

const Text = styled.p`
  position: absolute;
  top: 180px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line = styled.hr`
  position: absolute;
  top: 200px;
  left: 15px;
  width: 350px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

const Text1 = styled.p`
  position: absolute;
  top: 350px;
  left: 15px;
  font-size: 13px;
  font-weight: bold;
`;

const Line1 = styled.hr`
  position: absolute;
  top: 370px;
  left: 15px;
  width: 350px;
  height: 1px;
  border: none;
  background-color: rgb(211, 211, 211);
`;

function BusMain() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busNo, setBusNo] = useState("");
  const [markers, setMarkers] = useState([]);
  const [stayMarker, setStayMarker] = useState([]);
  const [poly, setPoly] = useState("");

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
      console.log(e.target.value);
      setBusNo(e.target.value);
    } else {
      return 0;
    }
  }
  useEffect(() => {
    onChanged();
  }, [busNo]);

  function submit(e) {
    e.preventDefault();
    console.log(busNo);
    busInfo(busNo);
  }
  async function busInfo(data) {
    removeMarkers();
    removeStayMarkers();
    if (poly != "") {
      removeGraphics();
    }
    let busNo = data;

    //정류장
    let busStay = await MobilityApi.getBusStay(busNo).catch((error) =>
      console.log(error)
    );
    console.log(busStay);

    const array1 = busStay;
    console.log(array1);

    // var iwContent = new iwContent[null];

    if (busStay != null) {
      var bound = new kakao.maps.LatLngBounds();
      for (var i = 0; i < array1.length; i++) {
        let busStayMark = new kakao.maps.LatLng(array1[i].y, array1[i].x);
        console.log(busStayMark);
        // iwContent[i] = busStay[i].stationName;
        // console.log(iwContent);

        const mark = new kakao.maps.Marker({
          position: busStayMark,
        });
        mark.setMap(map);
        setStayMarker((current) => [...current, mark]);
        bound.extend(busStayMark);
      }

      map.setBounds(bound);
    }

    //버스 번호
    let busInfo = await MobilityApi.getBusId(busNo).catch((error) =>
      console.log(error)
    );
    let busDetailInfo = await MobilityApi.getBusLineDetail(busInfo).catch(
      (error) => console.log(error)
    );

    const array = busDetailInfo.result.station;
    //console.log(array)

    const bPoly = await MapApi().drawKakaoBusPolyLine(
      busDetailInfo.result.station
    );
    bPoly.setMap(map);
    setPoly(bPoly);

    if (busInfo != null) {
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < array.length; i++) {
        let markerPosition = new kakao.maps.LatLng(array[i].y, array[i].x);
        const mk = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });
        mk.setMap(map);
        setMarkers((current) => [...current, mk]);
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(markerPosition);
      }

      map.setBounds(bounds);
    }

    function removeMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }

    function removeStayMarkers() {
      for (var i = 0; i < stayMarker.length; i++) {
        stayMarker[i].setMap(null);
      }
      setStayMarker([]);
    }

    function removeGraphics() {
      console.log(poly);
      poly.setMap(null);
      setPoly("");
    }
  }

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    //busInfo()
  }, [map]);

  return (
    <div className="Mobility">
      <SideNav>
        {/* { loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> } */}
        <MIcon />
        <Ul></Ul>

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

          <Text>최근 검색</Text>
          <Line></Line>
          <Text1>즐겨찾기한 버스</Text1>
          <Line1></Line1>
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
