import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MapApi from "../../api/MapApi";
import { SubName } from "../../api/OdsayApi";
import { Subway } from "@mui/icons-material";
import Map from "../../components/Map";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MIcon from "./MIcon";
import Box from "@mui/material/Box";

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
  left: 190px;
  width: 180px;
  height: 40px;
  font-size: 12px;
`;

function SubwayMain() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subName, setSubName] = useState("");
  const [markers, setMarkers] = useState([]);

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
      setSubName(e.target.value);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    onChanged();
  }, [subName]);

  function submit(e) {
    e.preventDefault();
    console.log(subName);
    subInfo(subName);
  }

  async function subInfo(data) {
    removeMarkers();

    let subName = data;
    let stationInfo = await SubName.getSubName(subName).catch((error) =>
      console.log(error)
    );
    // console.log(stationInfo)

    let points = [new kakao.maps.LatLng(stationInfo.y, stationInfo.x)];

    var bounds = new kakao.maps.LatLngBounds();

    var i, marker;
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

          <Btn>시간표</Btn>
          <Btn1>출구정보</Btn1>
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
