import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MapApi from "../../../api/MapApi";
import styled from "styled-components";
import MIcon from "../MIcon";
import Map from "../../../components/Map";

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

function ScooterMain() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);

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

  function ScooterIcon() {
    var positions = [
      { latlng: new kakao.maps.LatLng(37.5561146977415, 126.937382888804) },
      { latlng: new kakao.maps.LatLng(37.5550163763589, 126.939094978874) },
      { latlng: new kakao.maps.LatLng(37.5565588693504, 126.939066561479) },
      { latlng: new kakao.maps.LatLng(37.5574054114823, 126.938305327396) },
      { latlng: new kakao.maps.LatLng(37.5568915849224, 126.941334328122) },
      { latlng: new kakao.maps.LatLng(37.5572093234013, 126.935548521559) },
      { latlng: new kakao.maps.LatLng(37.5558469433118, 126.942380874348) },
      { latlng: new kakao.maps.LatLng(37.5552621346521, 126.93368057964) },
      { latlng: new kakao.maps.LatLng(37.5537013413484, 126.93817257614) },
    ];

    var imageSrc =
      "https://cdn-icons.flaticon.com/png/512/3212/premium/3212700.png?token=exp=1649327267~hmac=137caf2665dee407bcd9e97a2c7b8f2e";

    var imageSize = new kakao.maps.Size(50, 55);

    for (var i = 0; i < positions.length; i++) {
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng,
        clickable: true, // 마커를 표시할 위치
        image: markerImage,
      });

      console.log(positions[i].latlng);

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
      });
    }
    marker.setMap(map);
  }

  useEffect(() => {
    mapLoad();
  }, []);

  useEffect(() => {
    ScooterIcon();
  }, [map]);

  return (
    <div className="Mobility">
      <SideNav>
        <BarContainer>
          <MIcon />
          {/* { loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2> } */}
        </BarContainer>
      </SideNav>
      <Map />
    </div>
  );
}

ScooterMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ScooterMain;
